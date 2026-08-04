import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendAdminOrderNotification } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Отримуємо orderId з payload, який ми передали при створенні
        const orderId = body.payload?.orderId;
        const status = body.status; // напр: 'paid', 'failed', 'cancel'

        if (!orderId) {
            return NextResponse.json({ error: 'Відсутній ідентифікатор замовлення' }, { status: 400 });
        }

        // Записуємо успішний статус
        // А-Банк повертає 'paid' та resultCode 100 для успішних транзакцій
        if (status === 'paid' && String(body.resultCode) === '100') {
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
        else if (status === 'failed' || status === 'cancel') {
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'FAILED' }
            });
        }

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: 'Помилка вебхуку' }, { status: 500 });
    }
}