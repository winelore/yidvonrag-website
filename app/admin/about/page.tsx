import prisma from '@/lib/prisma'
import Link from 'next/link'
import { updateAboutAction } from './actions'

export default async function AdminAboutPage() {
    // Дістаємо текст з бази (якщо він там є)
    const about = await prisma.about.findFirst();

    return (
        <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-3xl mx-auto">
            <Link href="/admin" className="text-sm text-foreground hover:underline inline-flex items-center gap-2 mb-6">
                &larr; Назад до панелі
            </Link>

            <div className="rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6 text-foreground">Сторінка &quot;Про нас&quot;</h1>
                <form action={updateAboutAction} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="content" className="text-sm font-medium text-foreground">Текст про виноробню</label>
                        <textarea
                            id="content"
                            name="content"
                            // Підставляємо існуючий текст або залишаємо порожнім
                            defaultValue={about?.content || ''}
                            required
                            rows={15}
                            className="w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent p-4 text-sm transition-colors focus:border-foreground focus:outline-none resize-y"
                            placeholder="Напишіть історію вашої виноробні тут..."
                        />
                    </div>

                    <div className="pt-4 border-t border-black/[.08] dark:border-white/[.145]">
                        <button type="submit" className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-12 px-8">
                            Зберегти текст
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}