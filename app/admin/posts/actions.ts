'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { put, del } from '@vercel/blob'

export async function createPostAction() {
    // Створюємо шаблонний пост
    const newPost = await prisma.post.create({
        data: {
            title: "Новий пост",
            content: "",
        }
    })

    // Перекидаємо на сторінку редагування цього ж поста
    redirect(`/admin/posts/${newPost.id}`)
}

export async function updatePostAction(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    const token = 'vercel_blob_rw_xqtNsojIRblvwdXW_ltX0i9Q0dYouL83aEKv9gRZGur2yT1';

    const orderStr = formData.get('imageOrder') as string;
    const finalImages: string[] = [];

    if (orderStr) {
        const orderArray = JSON.parse(orderStr) as string[];

        for (const itemId of orderArray) {
            if (itemId.startsWith('newFile_')) {
                const file = formData.get(itemId) as File | null;
                if (file && file.size > 0) {
                    const blob = await put(file.name, file, {
                        access: 'public',
                        token: token,
                        addRandomSuffix: true,
                    });
                    finalImages.push(blob.url);
                }
            } else {
                finalImages.push(itemId);
            }
        }
    }

    const oldPost = await prisma.post.findUnique({ where: { id } });

    // Оновлюємо дані в базі
    await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            images: finalImages
        }
    })

    if (oldPost && oldPost.images) {
        const deletedImages = oldPost.images.filter((url: string) => !finalImages.includes(url));
        for (const delUrl of deletedImages) {
            try {
                await del(delUrl, { token });
            } catch (e) {
                console.error("Failed to delete blob", delUrl, e);
            }
        }
    }

    // Очищаємо кеш, щоб зміни відобразилися миттєво
    revalidatePath('/admin/posts')
    revalidatePath(`/admin/posts/${id}`)
    revalidatePath('/') // Оновлюємо головну сторінку, бо там виводяться пости
    redirect('/admin/posts')
}


export async function deletePostAction(id: string) {
    // 1. Видаляємо пост із бази за його ID
    await prisma.post.delete({
        where: { id },
    })

    // 2. Очищаємо кеш, щоб пост миттєво зник зі списків
    revalidatePath('/admin/posts')
    revalidatePath('/')

    // 3. Перекидаємо користувача назад до списку постів
    redirect('/admin/posts')
}