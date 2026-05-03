import prisma from "@/lib/prisma";
import { approveReviewAction, deleteReviewAction } from "./actions";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    // Отримуємо відгуки разом з назвою вина
    const reviews = await prisma.review.findMany({
        include: {
            wine: { select: { name: true } }
        },
        orderBy: [
            { isApproved: 'asc' }, // Спочатку неперевірені (false)
            { createdAt: 'desc' }  // Потім найновіші
        ]
    });

    return (
        <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-foreground">Управління відгуками</h1>
                <div className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                    Всього відгуків: {reviews.length}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {reviews.map(review => (
                    <div
                        key={review.id}
                        className={`rounded-2xl border p-5 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-6 transition-colors ${
                            review.isApproved
                                ? 'border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black hover:border-black/[.15] dark:hover:border-white/[.25]'
                                : 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700/50'
                        }`}
                    >
                        <div className="flex-grow">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                До вина: <span className="font-semibold text-foreground">{review.wine.name}</span>
                            </p>
                            <h2 className="text-xl font-semibold mb-1 text-foreground flex items-center gap-3">
                                {review.authorName}
                                <span className="text-yellow-500 text-sm tracking-widest">
                                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                </span>
                            </h2>
                            {review.text ? (
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                                    "{review.text}"
                                </p>
                            ) : (
                                <p className="text-sm text-gray-400 italic mt-2">Без текстового коментаря</p>
                            )}
                            <p className="text-xs text-gray-400 mt-3">
                                Створено: {new Date(review.createdAt).toLocaleDateString('uk-UA')}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                            {!review.isApproved && (
                                <form action={approveReviewAction.bind(null, review.id, review.wineId)}>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto rounded-full border border-solid border-green-600 bg-green-50 text-green-700 transition-colors hover:bg-green-100 text-sm h-10 px-6 font-medium dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                                    >
                                        Схвалити
                                    </button>
                                </form>
                            )}
                            <form action={deleteReviewAction.bind(null, review.id, review.wineId)}>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto rounded-full border border-solid border-red-600 bg-red-50 text-red-700 transition-colors hover:bg-red-100 text-sm h-10 px-6 font-medium dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                                >
                                    Видалити
                                </button>
                            </form>
                        </div>
                    </div>
                ))}

                {reviews.length === 0 && (
                    <div className="text-center py-16 rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black p-8 shadow-sm text-gray-500">
                        Відгуків поки немає.
                    </div>
                )}
            </div>

            <div className="mt-8">
                <Link href="/admin" className="text-sm text-foreground hover:underline inline-flex items-center gap-2">
                    &larr; Назад до адмін-панелі
                </Link>
            </div>
        </div>
    );
}