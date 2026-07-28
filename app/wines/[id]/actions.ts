'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { sendAdminReviewNotification } from '@/lib/email'

export async function createReviewAction(prevState: unknown, formData: FormData) {
    const wineId = formData.get('wineId') as string
    const authorName = formData.get('authorName') as string
    const rating = parseInt(formData.get('rating') as string, 10)
    const text = formData.get('text') as string | null

    try {
        const review = await prisma.review.create({
            data: {
                wineId,
                authorName,
                rating,
                text: text ? text.trim() : null,
            },
            include: {
                wine: true
            }
        })

        revalidatePath(`/wines/${wineId}`)

        // Trigger async notification email to admin (non-blocking)
        sendAdminReviewNotification({
            wineName: review.wine.name,
            authorName,
            rating,
            text: text ? text.trim() : null,
        }).catch(err => console.error('[Review Email] Error:', err));

        return { success: true, message: "Відгук надіслано на модерацію. Дякуємо!" }
    } catch (error) {
        console.error(error);
        return { success: false, message: "Помилка при відправці. Спробуйте ще раз." }
    }
}