'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createReviewAction(prevState: any, formData: FormData) {
    const wineId = formData.get('wineId') as string
    const authorName = formData.get('authorName') as string
    const rating = parseInt(formData.get('rating') as string, 10)
    const text = formData.get('text') as string | null

    try {
        await prisma.review.create({
            data: {
                wineId,
                authorName,
                rating,
                text: text ? text.trim() : null,
            }
        })

        revalidatePath(`/wines/${wineId}`)
        return { success: true, message: "Відгук надіслано на модерацію. Дякуємо!" }
    } catch (e) {
        return { success: false, message: "Помилка при відправці. Спробуйте ще раз." }
    }
}