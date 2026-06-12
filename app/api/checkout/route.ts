import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import renderOrderNotification from '@/lib/emailTemplates/orderNotification'

type Item = { id?: string; name: string; price: number; quantity: number }

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, customerEmail, items } = body as { customerName: string; customerEmail?: string; items: Item[] }

    if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const total = items.reduce((s, it) => s + it.price * it.quantity, 0)

    const created = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        total,
        items: {
          create: items.map((it) => ({ wineId: it.id ?? null, name: it.name, price: it.price, quantity: it.quantity }))
        }
      },
      include: { items: true }
    })

    // prepare html
    const html = renderOrderNotification({
      id: created.id,
      customerName: created.customerName,
      customerEmail: created.customerEmail ?? undefined,
      total: created.total,
      items: created.items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
      createdAt: created.createdAt.toISOString()
    })

    // send via Resend API if API key available
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    // Use addresses allowed for Resend free/onboarding accounts
    const FROM = 'onboarding@resend.dev'
    const TO = 'ssfdssfd0@gmail.com'

    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: FROM,
            to: [TO],
            subject: `Нове замовлення #${created.id}`,
            html
          })
        })
      } catch (e) {
        // log but don't fail the order
        // eslint-disable-next-line no-console
        console.error('Failed to send notification email', e)
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn('RESEND_API_KEY not set — skipping email send. To enable, set RESEND_API_KEY in env.')
    }

    return NextResponse.json({ ok: true, orderId: created.id })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Checkout error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Use default Node.js runtime for this route so Prisma/pg work correctly.
