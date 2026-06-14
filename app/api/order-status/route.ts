import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'No ID provided' }, { status: 400 });

    try {
        const order = await prisma.order.findUnique({
            where: { id }
        });

        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

        return NextResponse.json({ status: order.status });

    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}