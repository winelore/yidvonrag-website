import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ReviewForm from "@/app/wines/[id]/ReviewForm";
import AddToCartButton from "@/app/components/AddToCartButton";
import Image from "next/image";

export default async function WineDetailsPage({ params }: { params: { id: string } }) {
    const wine = await prisma.wine.findUnique({
        where: { id: params.id },
        include: {
            reviews: {
                where: { isApproved: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!wine) {
        notFound();
    }

    const avgRating = wine.reviews && wine.reviews.length > 0
        ? (wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length).toFixed(1)
        : null;

    return (
        <main className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-10">

                {/* Header: Name and Status */}
                <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-100 pb-8">
                    <div className="flex-1">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                            {wine.name}
                        </h1>

                        {/* Відображення рейтингу */}
                        {avgRating ? (
                            <div className="flex items-center gap-2 text-lg mb-4">
                                <span className="text-yellow-500">★</span>
                                <span className="font-bold">{avgRating}</span>
                                <span className="text-gray-500 text-sm">({wine.reviews.length} відгуків)</span>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-400 mb-4">Немає відгуків</div>
                        )}

                        <span
                            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase ${
                                wine.inStock
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                        >
                            {wine.inStock ? "В наявності" : "Немає в наявності"}
                        </span>
                    </div>

                    {/* Блок з ціною та кнопкою кошика */}
                    <div className="flex flex-col items-start sm:items-end min-w-[200px] bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="text-sm text-gray-500 mb-1">Ціна за пляшку</div>
                        <div className="text-4xl font-black text-gray-900 mb-4">${wine.price}</div>
                        {wine.inStock && (
                            <AddToCartButton wine={{ id: wine.id, name: wine.name, price: wine.price }} />
                        )}
                    </div>
                </header>
                {wine.images && wine.images.length > 0 && (
                    <section className="relative w-full aspect-[2/1] sm:aspect-[3/1] bg-gray-100 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <Image src={wine.images[0]} alt={wine.name} fill className="object-cover" />
                    </section>
                )}

                {/* Markdown Description */}
                <section className="prose prose-lg prose-gray max-w-none">
                    <ReactMarkdown>{wine.description}</ReactMarkdown>
                </section>

                {/* Characteristics Card */}
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

                <section className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
                        Відгуки
                    </h2>

                    <ReviewForm wineId={wine.id} />

                    {/* Список схвалених відгуків */}
                    <div className="space-y-10 mt-12">
                        {wine.reviews.length === 0 ? (
                            <p className="text-gray-500 text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
                                Ще немає відгуків. Будьте першим!
                            </p>
                        ) : (
                            wine.reviews.map(review => (
                                <div
                                    key={review.id}
                                    className="border-b border-gray-100 pb-10 last:border-0 last:pb-0 transition-all"
                                >
                                    <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-gray-900">
                        {review.authorName}
                    </span>
                                        <span className="text-yellow-500 text-sm tracking-widest">
                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </span>
                                    </div>

                                    {review.text ? (
                                        <p className="text-gray-600 leading-relaxed italic px-2 border-l-2 border-gray-100">
                                            &quot;{review.text}&quot;
                                        </p>
                                    ) : (
                                        <p></p>
                                    )}

                                    <div className="mt-3 text-[10px] text-gray-300 uppercase tracking-widest">
                                        {new Date(review.createdAt).toLocaleDateString('uk-UA')}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}