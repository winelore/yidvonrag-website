import prisma from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Список постів</h1>

                    <Link href="/admin/posts/new" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-6">
                        Додати новий пост
                    </Link>
                </div>

                <div className="flex flex-col gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md">
                            <div>
                                <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{post.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Створено: {new Date(post.createdAt).toLocaleDateString('uk-UA')}
                                </p>
                            </div>
                            <Link
                                href={`/admin/posts/${post.id}`}
                                className="rounded-full border border-solid border-gray-200 dark:border-zinc-700 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm h-10 px-6 text-gray-900 dark:text-white shrink-0"
                            >
                                Редагувати
                            </Link>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center py-16 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm text-gray-500">
                            Постів поки немає. Створіть перший запис!
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <Link href="/admin" className="text-sm text-gray-900 dark:text-white hover:underline inline-flex items-center gap-2">
                        &larr; Назад до адмін-панелі
                    </Link>
                </div>
            </div>
        </div>
    )
}