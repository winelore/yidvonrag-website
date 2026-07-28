'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatusAction(orderId: string, status: string) {
    await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });

    revalidatePath('/admin/orders');
}

export async function deleteOrderAction(orderId: string) {
    await prisma.order.delete({
        where: { id: orderId }
    });

    revalidatePath('/admin/orders');
}
