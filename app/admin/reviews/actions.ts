'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function approveReviewAction(id: string, wineId: string) {
    await prisma.review.update({
        where: { id },
        data: { isApproved: true }
    })

    revalidatePath('/admin/reviews')
    revalidatePath(`/wines/${wineId}`)
}

export async function deleteReviewAction(id: string, wineId: string) {
    await prisma.review.delete({
        where: { id }
    })

    revalidatePath('/admin/reviews')
    revalidatePath(`/wines/${wineId}`)
}