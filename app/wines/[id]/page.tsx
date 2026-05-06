import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function WineDetailsPage({ params }: { params: { id: string } }) {
    // 1. Отримуємо конкретне вино ТА підтягуємо його схвалені відгуки
    const wine = await prisma.wine.findUnique({
        where: { id: params.id },
        include: {
            reviews: {
                where: { isApproved: true } // Беремо лише схвалені
            }
        }
    });

    // 2. Якщо вина немає в базі - 404
    if (!wine) {
        notFound();
    }

    // 3. Рахуємо середній рейтинг (тепер TypeScript знає, що wine.reviews існує)
    const avgRating = wine.reviews && wine.reviews.length > 0
        ? (wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length).toFixed(1)
        : null;

    return (
        <main className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-10">

                {/* Шапка: Назва, Рейтинг та Статус */}
                <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-100 pb-8">

                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                            {wine.name}
                        </h1>

                        {/* Рейтинг перенесено сюди — БІЛЯ НАЗВИ */}
                        {avgRating ? (
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-yellow-500 text-xl leading-none">★</span>
                                <span className="font-bold text-gray-800 text-lg">{avgRating}</span>
                                <span className="text-gray-500 text-sm font-medium">
                                    ({wine.reviews.length} {wine.reviews.length === 1 ? 'відгук' : 'відгуків'})
                                </span>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-400 mt-2 font-medium">Немає відгуків</div>
                        )}
                    </div>

                    <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mt-2 sm:mt-0 h-max ${
                            wine.inStock
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                    >
                        {wine.inStock ? "В наявності" : "Немає в наявності"}
                    </span>
                </header>

                {/* Markdown Опис */}
                <section className="prose prose-lg prose-gray max-w-none">
                    <ReactMarkdown>{wine.description}</ReactMarkdown>
                </section>

                {/* Картка Характеристик */}
                <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
                        Характеристики
                    </h2>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col border-b border-gray-200 pb-3 sm:border-0 sm:pb-0">
                            <dt className="text-sm font-medium text-gray-500">Колір</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">{wine.color}</dd>
                        </div>
                        <div className="flex flex-col border-b border-gray-200 pb-3 sm:border-0 sm:pb-0">
                            <dt className="text-sm font-medium text-gray-500">Вміст цукру</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">{wine.sweetness}</dd>
                        </div>
                        <div className="flex flex-col border-b border-gray-200 pb-3 sm:border-0 sm:pb-0">
                            <dt className="text-sm font-medium text-gray-500">Об&apos;єм</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">{wine.volume} л</dd>
                        </div>
                        <div className="flex flex-col border-b border-gray-200 pb-3 sm:border-0 sm:pb-0">
                            <dt className="text-sm font-medium text-gray-500">Міцність</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">{wine.alcohol}</dd>
                        </div>
                        <div className="flex flex-col border-b border-gray-200 pb-3 sm:border-0 sm:pb-0">
                            <dt className="text-sm font-medium text-gray-500">Сорт винограду</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">{wine.grapeVariety}</dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="text-sm font-medium text-gray-500">Країна</dt>
                            <dd className="mt-1 text-base font-semibold text-gray-900">{wine.country}</dd>
                        </div>
                    </dl>
                </section>

            </div>
        </main>
    );
}