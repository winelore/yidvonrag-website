import Link from 'next/link'
import { submitNewPostAction } from '../actions'
import { ImageGalleryManager } from '../../wines/[id]/image-upload-input'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { AdminForm } from '../../components/AdminForm'

export default function NewPostPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin/posts" className="text-sm text-gray-900 dark:text-white hover:underline inline-flex items-center gap-2 mb-6">
                    &larr; Назад до списку
                </Link>

                <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Створити новий пост</h1>

                    <AdminForm id="create-post-form" action={submitNewPostAction} className="flex flex-col gap-6">

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="title" className="text-sm font-medium text-gray-900 dark:text-white">Заголовок</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="content" className="text-sm font-medium text-gray-900 dark:text-white">Текст поста</label>
                            <textarea
                                id="content"
                                name="content"
                                required
                                rows={12}
                                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent p-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none resize-y"
                            />
                        </div>

                        <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 flex flex-col gap-4 mt-6">
                            <h2 className="text-sm font-medium text-gray-900 dark:text-white">Галерея зображень</h2>
                            <ImageGalleryManager initialImages={[]} />
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <FormSubmitButton className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-8">
                                    Створити пост
                                </FormSubmitButton>
                                <Link href="/admin/posts" className="w-full sm:w-auto rounded-full border border-solid border-gray-200 dark:border-zinc-800 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm h-12 px-8 text-gray-900 dark:text-white">
                                    Скасувати
                                </Link>
                            </div>
                        </div>
                    </AdminForm>
                </div>
            </div>
        </div>
    )
}