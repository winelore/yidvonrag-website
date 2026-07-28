import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";
import InCartBadge from "@/app/components/InCartBadge";
import Footer from "@/app/components/Footer";
import { BeverageBadgePill } from "@/app/components/BeverageAwards";

export default async function Home() {
    // Міняємо updatedAt на id, бо updatedAt поки немає в схемі
    const hits = await prisma.wine.findMany({
        where: { inStock: true },
        orderBy: { id: 'desc' },
        take: 4,
        include: {
            reviews: {
                where: { isApproved: true }
            },
            awards: {
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    // 2. Отримуємо пости (спочатку найновіші)
    const posts = await prisma.post.findMany({
        orderBy: { id: 'desc' },
        take: 3
    });

    return (
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col bg-white text-gray-900">
            {/* Hero Section */}
            <section id="hero-section" className="relative w-full min-h-[80vh] min-h-[650px] sm:min-h-[750px] lg:min-h-[850px] flex items-center justify-center overflow-hidden bg-black text-white">
                {/* Background Image with Dark Overlay Gradient */}
                <Image
                    src="/hero-bg.jpg"
                    alt="Виноробня ВМ Штифко"
                    fill
                    priority
                    quality={90}
                    className="object-cover object-center opacity-65 scale-105 transition-transform duration-1000"
                />
                {/* Gradient Overlays for smooth readability & transition */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 md:pt-48 pb-24 sm:pb-32 flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white mb-6 shadow-inner">
                        🍷 Крафтова виноробня ВМ Штифко
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 max-w-5xl drop-shadow-md leading-tight">
                        Ексклюзивна колекція вин
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed drop-shadow">
                        Відкрийте для себе найкращі смаки з усього світу. Ми ретельно відбираємо та створюємо кожну пляшку з любов&apos;ю та традиціями.
                    </p>
                    <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/wines"
                            className="inline-flex items-center gap-2.5 rounded-full bg-white text-gray-900 px-8 sm:px-10 py-3.5 sm:py-4 text-base font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
                        >
                            <svg className="w-5 h-5 text-gray-900 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 21h8m-4-4v4m-5-16h10a1 1 0 011 1v3a6 6 0 01-6 6 6 6 0 01-6-6V6a1 1 0 011-1z" />
                            </svg>
                            <span>Переглянути каталог</span>
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 text-base font-semibold hover:bg-white/20 transition-all duration-200 hover:scale-105 group"
                        >
                            <svg className="w-5 h-5 text-white transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Дізнатися більше</span>
                        </Link>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 w-full flex-grow">
                {/* Секція "Список Хітів" */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Популярні вина</h2>
                            <p className="text-gray-500 mt-1">Вибір наших клієнтів</p>
                        </div>
                        <Link href="/wines" className="text-blue-600 hover:text-blue-800 text-sm font-semibold inline-flex items-center gap-1 transition-colors">
                            Дивитися весь каталог &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {hits.map((wine) => {
                            const avgRating = wine.reviews && wine.reviews.length > 0
                                ? (wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length).toFixed(1)
                                : null;

                            return (
                                <div
                                    key={wine.id}
                                    className="group relative border border-gray-200/80 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-gray-300 flex flex-col bg-white"
                                >
                                    <InCartBadge wineId={wine.id} />
                                    <Link href={`/wines/${wine.id}`} className="flex flex-col flex-grow cursor-pointer">
                                        <div className="w-full aspect-square relative bg-gray-50 flex items-center justify-center overflow-hidden">
                                            {wine.images && wine.images.length > 0 ? (
                                                <Image
                                                    src={wine.images[0]}
                                                    alt={wine.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <Image
                                                    src="https://nextjs.org/icons/file.svg"
                                                    alt={wine.name}
                                                    width={60}
                                                    height={60}
                                                    className="opacity-20 group-hover:scale-110 transition-transform"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-grow px-5 pt-5 pb-3">
                                            {wine.awards && wine.awards.length > 0 && (
                                                <div className="mb-2">
                                                    <BeverageBadgePill awards={wine.awards} />
                                                </div>
                                            )}
                                            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">{wine.name}</h3>

                                            {avgRating ? (
                                                <div className="flex items-center gap-1.5 mt-1.5 mb-1 text-sm">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="font-medium text-gray-700">{avgRating}</span>
                                                    <span className="text-gray-400 text-xs">({wine.reviews.length})</span>
                                                </div>
                                            ) : (
                                                <div className="mt-1.5 mb-1 text-xs text-gray-400">Немає відгуків</div>
                                            )}

                                            <p className="text-sm text-gray-500 mt-1">
                                                {wine.color} • {wine.sweetness}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                                                {wine.description}
                                            </p>
                                        </div>
                                    </Link>

                                    <div className="px-5 pb-5 pt-2 flex flex-col justify-between gap-3 border-t border-gray-50">
                                        <div className="font-bold text-lg text-gray-900">{wine.price} ₴</div>
                                        <AddToCartButton wine={{ id: wine.id, name: wine.name, price: wine.price }} variant="card" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Секція "Останні оновлення" (Блог/Пости) */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Останні оновлення</h2>
                            <p className="text-gray-500 mt-1">Новини нашого блогу та сервісу</p>
                        </div>
                        <Link href="/posts" className="text-blue-600 hover:text-blue-800 text-sm font-semibold inline-flex items-center gap-1 transition-colors">
                            Всі новини &rarr;
                        </Link>
                    </div>

                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {posts.map((p) => (
                                <div key={p.id} className="bg-white border border-gray-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between group">
                                    <div>
                                        {p.images && p.images.length > 0 && (
                                            <div className="relative w-full aspect-video mb-5 rounded-xl overflow-hidden bg-gray-100">
                                                <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{p.content}</p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                                        <span>{new Date(p.createdAt).toLocaleDateString('uk-UA')}</span>
                                        <Link href={`/posts/${p.id}`} className="text-blue-600 hover:underline font-medium text-sm">
                                            Читати &rarr;
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
                            <p className="text-gray-400">Новини та статті скоро з&apos;являться.</p>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}