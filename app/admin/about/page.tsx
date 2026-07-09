import prisma from '@/lib/prisma'
import Link from 'next/link'
import { updateAboutAction } from './actions'

export default async function AdminAboutPage() {
    // Дістаємо текст з бази (якщо він там є)
    const about = await prisma.about.findFirst();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin" className="text-sm text-gray-900 dark:text-white hover:underline inline-flex items-center gap-2 mb-6">
                    &larr; Назад до панелі
                </Link>

                <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Сторінка &quot;Про нас&quot;</h1>
                    <form action={updateAboutAction} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="content" className="text-sm font-medium text-gray-900 dark:text-white">Текст про виноробню</label>
                            <textarea
                                id="content"
                                name="content"
                                // Підставляємо існуючий текст або залишаємо порожнім
                                defaultValue={about?.content || ''}
                                required
                                rows={15}
                                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent p-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none resize-y"
                                placeholder="Напишіть тут текст, який буде розміщено на сторінці про нас..."
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-zinc-800">
                            <button type="submit" className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-8">
                                Зберегти текст
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}