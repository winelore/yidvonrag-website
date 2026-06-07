import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Описуємо тип для елемента кошика
type CartItemInput = {
    id: string;
    quantity: number;
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // 1. Тепер дістаємо і кошик, і дані клієнта з запиту
        const { cartItems, customerInfo } = body;

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ error: 'Немає товарів для оплати' }, { status: 400 });
        }

        const wineIds = cartItems.map((item: CartItemInput) => item.id);
        const dbWines = await prisma.wine.findMany({
            where: { id: { in: wineIds } }
        });

        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of cartItems) {
            const dbWine = dbWines.find(w => w.id === item.id);
            if (dbWine) {
                totalAmount += dbWine.price * item.quantity;
                orderItemsData.push({
                    wineId: dbWine.id,
                    quantity: item.quantity,
                    price: dbWine.price
                });
            }
        }

        if (totalAmount === 0) {
            return NextResponse.json({ error: 'Помилка розрахунку суми' }, { status: 400 });
        }

        // 2. Зберігаємо замовлення РАЗОМ із даними клієнта
        const order = await prisma.order.create({
            data: {
                amount: totalAmount,
                status: 'PENDING',
                customerName: customerInfo?.name || null,
                customerSurname: customerInfo?.surname || null,
                customerPhone: customerInfo?.phone || null,
                customerCity: customerInfo?.city || null,
                customerBranch: customerInfo?.branch || null,
                items: {
                    create: orderItemsData
                }
            }
        });

        const amountInKopecks = Math.round(totalAmount * 100);

        const monoResponse = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
            method: 'POST',
            headers: {
                'X-Token': process.env.MONOBANK_TOKEN!,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amountInKopecks,
                ccy: 980,
                reference: order.id,
                redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/?orderId=${order.id}`,
                webHookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/monobank`
            })
        });

        const data = await monoResponse.json();

        if (!monoResponse.ok || !data.pageUrl) {
            throw new Error(data.errText || 'Помилка генерації інвойсу в Monobank');
        }

        await prisma.order.update({
            where: { id: order.id },
            data: { invoiceId: data.invoiceId }
        });

        return NextResponse.json({ pageUrl: data.pageUrl });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Невідома помилка';
        console.error('Checkout Error:', errorMessage);
        return NextResponse.json({ error: 'Помилка обробки платежу' }, { status: 500 });
    }
}