import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updatePostAction } from '../actions'
import DeleteButton from './DeleteButton'
import { ImageGalleryManager } from '../../wines/[id]/image-upload-input'

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const post = await prisma.post.findUnique({
        where: { id: params.id }
    })

    if (!post) {
        notFound()
    }

    const updatePostWithId = updatePostAction.bind(null, post.id)

    return (
        <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-3xl mx-auto">
            <Link href="/admin/posts" className="text-sm text-foreground hover:underline inline-flex items-center gap-2 mb-6">
                &larr; Назад до списку
            </Link>

            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6 text-foreground">Редагувати пост</h1>

                <form id="update-post-form" action={updatePostWithId} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="title" className="text-sm font-medium text-foreground">Заголовок</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={post.title}
                            required
                            className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="content" className="text-sm font-medium text-foreground">Текст поста</label>
                        <textarea
                            id="content"
                            name="content"
                            defaultValue={post.content}
                            required
                            rows={12}
                            className="w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent p-4 text-sm transition-colors focus:border-foreground focus:outline-none resize-y"
                        />
                    </div>

                    <div className="border-t border-black/[.08] dark:border-white/[.145] pt-6 flex flex-col gap-4 mt-6">
                        <h2 className="text-sm font-medium text-foreground">Галерея зображень</h2>
                        <ImageGalleryManager initialImages={post.images || []} />
                    </div>

                </form>

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-black/[.08] dark:border-white/[.145]">

                    {/* Ліва група: Зберегти і Скасувати */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button type="submit" form="update-post-form" className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-12 px-8">
                            Зберегти зміни
                        </button>
                        <Link href="/admin/posts" className="w-full sm:w-auto rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-12 px-8 text-foreground">
                            Скасувати
                        </Link>
                    </div>

                    {/* Права група: Видалення поста */}
                    <div className="w-full sm:w-auto">
                        <DeleteButton postId={post.id} />
                    </div>

                </div>
            </div>
        </div>
    )
}