import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type CartItemInput = {
    id: string;
    quantity: number;
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
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

        // 3. Авторизація
        const authResponse = await fetch(`${process.env.ABANK_BASE_URL}/api/v1/internet-acquiring/auth/get-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: process.env.ABANK_LOGIN!,
                secret_key: process.env.ABANK_SECRET_KEY!
            })
        });
        const authData = await authResponse.json();

        if (!authResponse.ok || authData.result !== 'ok') {
            throw new Error('Помилка авторизації: ' + JSON.stringify(authData));
        }

        // 4. Створюємо інвойс в А-Банк
        const payload = {
            order_id: order.id,
            orderId: order.id,
            currency: "UAH",
            amount: totalAmount,
            description: `Замовлення #${order.id}`,
            callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?orderId=${order.id}`,
            callback_system: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook/abank`,
            items: orderItemsData.map(item => ({
                message: `Товар ID: ${item.wineId}`,
                amount: item.price,
                count: item.quantity
            })),
            payload: {
                orderId: order.id
            }
        };

        const abankResponse = await fetch(`${process.env.ABANK_BASE_URL}/api/v1/internet-acquiring/make-invoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authData.access_token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await abankResponse.json();


        // Якщо виникла помилка в банку або url містить undefined, викидаємо помилку з текстом відповіді банку
        if (data.result === 'error' || !data.invoice_url || data.invoice_url.includes('undefined')) {
            throw new Error(`Деталі від банку: ${JSON.stringify(data)}`);
        }

        await prisma.order.update({
            where: { id: order.id },
            data: { invoiceId: String(data.invoice_id || data.invoiceId || data.id) }
        });

        return NextResponse.json({ pageUrl: data.invoice_url });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Невідома помилка';
        console.error('Checkout Error:', errorMessage);
        // Повертаємо справжню помилку на фронтенд, щоб ви її побачили у alert()
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}