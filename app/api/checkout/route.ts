/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import renderOrderNotification from '@/lib/emailTemplates/orderNotification';

type SimpleItem = { id?: string; name: string; price: number; quantity: number };
type CartItemInput = { id: string; quantity: number };

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Full checkout (Monobank) flow
    if (body?.cartItems && Array.isArray(body.cartItems)) {
      const cartItems: CartItemInput[] = body.cartItems;
      const customerInfo = body.customerInfo || {};

      if (cartItems.length === 0) return NextResponse.json({ error: 'Немає товарів для оплати' }, { status: 400 });

      const wineIds = cartItems.map((i) => i.id);
      const dbWines = await prisma.wine.findMany({ where: { id: { in: wineIds } } });

      let totalAmount = 0;
      const orderItemsData: Array<any> = [];
      for (const it of cartItems) {
        const w = dbWines.find(w => w.id === it.id);
        if (w) {
          totalAmount += w.price * it.quantity;
          orderItemsData.push({ wineId: w.id, quantity: it.quantity, price: w.price, name: w.name });
        }
      }

      if (totalAmount === 0) return NextResponse.json({ error: 'Помилка розрахунку суми' }, { status: 400 });

      const created = await prisma.order.create({
        data: {
          amount: totalAmount,
          total: totalAmount,
          status: 'PENDING',
          customerName: customerInfo?.name || customerInfo?.fullName || null,
          customerSurname: customerInfo?.surname || null,
          customerPhone: customerInfo?.phone || null,
          customerCity: customerInfo?.city || null,
          customerBranch: customerInfo?.branch || null,
          items: { create: orderItemsData }
        }
      });

      trySendResendEmail(created, orderItemsData as any[]);

      const amountInKopecks = Math.round(totalAmount * 100);
      const monoResp = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
        method: 'POST',
        headers: { 'X-Token': process.env.MONOBANK_TOKEN || '', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInKopecks,
          ccy: 980,
          reference: created.id,
          redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/?orderId=${created.id}`,
          webHookUrl: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/webhook/monobank`
        })
      });

      const monoData = await monoResp.json();
      if (!monoResp.ok || !monoData.pageUrl) {
        console.error('Monobank invoice error', monoData);
        return NextResponse.json({ error: 'Помилка генерації інвойсу в Monobank' }, { status: 500 });
      }

      await prisma.order.update({ where: { id: created.id }, data: { invoiceId: monoData.invoiceId } });
      return NextResponse.json({ pageUrl: monoData.pageUrl });
    }

    // Simple create + email flow
    const { customerName, items } = body as { customerName?: string; items?: SimpleItem[] };
    if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
    const created = await prisma.order.create({
      data: {
        customerName,
        total,
        amount: total,
        items: { create: items.map((it) => ({ wineId: it.id ?? null, name: it.name, price: it.price, quantity: it.quantity })) }
      },
      include: { items: true }
    });

    trySendResendEmail(created, created.items as any[]);
    return NextResponse.json({ ok: true, orderId: created.id });
  } catch (err) {
    console.error('Checkout error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

async function trySendResendEmail(created: any, items: any[]) {
  try {
    const html = renderOrderNotification({
      id: created.id,
      customerName: created.customerName || 'Клієнт',
      total: (created.total ?? created.amount) || 0,
      items: items.map((i: any) => ({ name: i.name || '<item>', price: i.price, quantity: i.quantity })),
      createdAt: (created.createdAt || new Date()).toISOString()
    });

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM = 'onboarding@resend.dev';
    const TO = 'ssfdssfd0@gmail.com';

    if (RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({ from: FROM, to: [TO], subject: `Нове замовлення #${created.id}`, html })
      });
    } else {
      console.warn('RESEND_API_KEY not set — skipping email send.');
    }
  } catch (e) {
    console.error('Failed to send notification email', e);
  }
}