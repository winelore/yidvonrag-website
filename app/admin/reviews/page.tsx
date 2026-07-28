import prisma from "@/lib/prisma";
import { approveReviewAction, deleteReviewAction } from "./actions";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    // Дістаємо тільки ті вина, у яких є відгуки
    const winesWithReviews = await prisma.wine.findMany({
        where: {
            reviews: { some: {} } // Фільтр: є хоча б один відгук
        },
        include: {
            reviews: {
                orderBy: [
                    { isApproved: 'asc' }, // Спочатку завжди несхвалені (для модерації)
                    { rating: 'desc' },    // Потім від найкращих (5) до найгірших (1)
                    { createdAt: 'desc' }  // Потім за датою
                ]
            }
        },
        orderBy: { name: 'asc' }
    });

    const totalReviews = winesWithReviews.reduce((sum, wine) => sum + wine.reviews.length, 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Управління відгуками</h1>
                    <div className="text-sm px-4 py-2 bg-gray-200 dark:bg-zinc-800 rounded-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-zinc-700">
                        Всього відгуків: {totalReviews}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {winesWithReviews.map(wine => {
                        const pendingCount = wine.reviews.filter(r => !r.isApproved).length;

                        return (
                            // Нативний HTML-акордеон
                            <details key={wine.id} className="group rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">

                                {/* Шапка акордеона (Вино) */}
                                <summary className="p-6 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 list-none hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        🍷 {wine.name}
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        {pendingCount > 0 && (
                                            <span className="text-xs font-bold px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200 animate-pulse">
                                                Нових: {pendingCount}
                                            </span>
                                        )}
                                        <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-600 dark:text-gray-400">
                                            Відгуків: {wine.reviews.length}
                                        </span>
                                        <span className="text-gray-400 group-open:rotate-180 transition-transform duration-200">
                                            ▼
                                        </span>
                                    </div>
                                </summary>

                                {/* Вміст акордеона (Список відгуків цього вина) */}
                                <div className="p-6 pt-0 border-t border-gray-100 dark:border-zinc-800 flex flex-col gap-4 mt-4">
                                    {wine.reviews.map(review => (
                                        <div
                                            key={review.id}
                                            className={`rounded-xl border p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-6 transition-colors ${
                                                review.isApproved
                                                    ? 'border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-black/50'
                                                    : 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20'
                                            }`}
                                        >
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white flex items-center gap-3">
                                                    {review.authorName}
                                                    <span className="text-yellow-500 text-sm tracking-widest">
                                                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                                    </span>
                                                </h3>
                                                {review.text ? (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                                        &quot;{review.text}&quot;
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-gray-400 italic mt-2">Без текстового коментаря</p>
                                                )}
                                                <p className="text-xs text-gray-400 mt-3">
                                                    {new Date(review.createdAt).toLocaleDateString('uk-UA')}
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
                                </div>
                            </details>
                        );
                    })}

                    {winesWithReviews.length === 0 && (
                        <div className="text-center py-16 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm text-gray-500">
                            Жодного відгуку поки немає.
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
    );
}