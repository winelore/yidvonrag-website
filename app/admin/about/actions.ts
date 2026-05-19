'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateAboutAction(formData: FormData) {
    const content = formData.get('content') as string;

    if (!content) return;

    // Шукаємо, чи є вже запис "Про нас" у базі
    const existingAbout = await prisma.about.findFirst();

    if (existingAbout) {
        // Якщо є — оновлюємо його
        await prisma.about.update({
            where: { id: existingAbout.id },
            data: { content },
        });
    } else {
        // Якщо немає — створюємо перший запис
        await prisma.about.create({
            data: { content },
        });
    }

    // Очищаємо кеш, щоб зміни миттєво з'явилися на сайті
    revalidatePath('/admin/about')
    revalidatePath('/about')
}