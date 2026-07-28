import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendAdminOrderNotification } from '@/lib/email';

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
            const updatedOrder = await prisma.order.update({
                where: { id: orderId },
                data: { status: 'SUCCESS' },
                include: {
                    items: {
                        include: {
                            wine: true
                        }
                    }
                }
            });

            // Dispatch admin notification email (non-blocking)
            sendAdminOrderNotification({
                orderId: updatedOrder.id,
                amount: updatedOrder.amount,
                customerName: updatedOrder.customerName,
                customerSurname: updatedOrder.customerSurname,
                customerPhone: updatedOrder.customerPhone,
                customerCity: updatedOrder.customerCity,
                customerBranch: updatedOrder.customerBranch,
                items: updatedOrder.items.map(item => ({
                    name: item.wine.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                status: 'ОПЛАЧЕНО'
            }).catch(err => console.error('[Order Email] Error:', err));
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