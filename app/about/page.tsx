import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function AboutPage() {
    // Дістаємо наш текст з бази даних
    const about = await prisma.about.findFirst();

    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">

            {/* Основний контент */}
            <main className="max-w-4xl mx-auto px-8 py-20">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                    &larr; Повернутися на головну
                </Link>

                <h1 className="text-4xl sm:text-5xl font-bold mb-10 tracking-tight">
                    Про нашу виноробню
                </h1>

                {/* Текст з бази даних */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {about?.content ? (
                        about.content
                    ) : (
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center">
                            <p className="italic text-gray-500">Тут пусто!</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="border-t border-black/[0.08] py-12 mt-20 text-center text-sm text-gray-500">
                <p>© 2026 yidvonrag-website. Всі права захищені.</p>
            </footer>

        </div>
    )
}