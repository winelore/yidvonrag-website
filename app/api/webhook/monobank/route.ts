import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // reference - це наш order.id, який ми передали при створенні інвойсу
        const orderId = body.reference;
        const status = body.status; // напр: 'success', 'failure', 'processing'

        if (!orderId) {
            return NextResponse.json({ error: 'Відсутній reference замовлення' }, { status: 400 });
        }

        // Записуємо успішний статус
        if (status === 'success') {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'SUCCESS' }
            });
        }
        // Записуємо статус помилки або відмови
        else if (status === 'failure') {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'FAILED' }
            });
        }

        // Монобанк вимагає, щоб ми просто відповіли 200 OK
        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Помилка вебхуку' }, { status: 500 });
    }
}