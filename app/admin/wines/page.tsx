import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function WinesPage() {
    const wines = await prisma.wine.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-5xl mx-auto">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Список вин</h1>
                    <Link href="/admin/wines/new" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-6">
                        Додати нове вино
                    </Link>
                </div>

                <div className="flex flex-col gap-4">
                    {wines.map(wine => (
                        <div key={wine.id} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md">
                            <div className="flex items-center gap-4">
                                {wine.images && wine.images.length > 0 ? (
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 shrink-0">
                                        <Image src={wine.images[0]} alt={wine.name} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-gray-200 dark:border-zinc-800">
                                        <span className="text-gray-400 text-[10px]">Немає фото</span>
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{wine.name}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {wine.color || 'Колір не вказано'} | {wine.volume} л | <span className="font-medium text-gray-900 dark:text-white">{wine.price} грн</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                                <Link
                                    href={`/admin/wines/${wine.id}`}
                                    className="rounded-full border border-solid border-gray-200 dark:border-zinc-700 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm h-10 px-6 text-gray-900 dark:text-white shrink-0"
                                >
                                    Редагувати
                                </Link>
                            </div>
                        </div>
                    ))}

                    {wines.length === 0 && (
                        <div className="text-center py-16 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm text-gray-500">
                            Вин поки немає. Додайте перше вино!
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