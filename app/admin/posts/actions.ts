'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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

    // Оновлюємо дані в базі
    await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
        }
    })

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