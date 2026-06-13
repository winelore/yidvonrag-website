import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";
import Footer from "@/app/components/Footer";


export default async function Home() {
    // Міняємо updatedAt на id, бо updatedAt поки немає в схемі
    const hits = await prisma.wine.findMany({
        where: { inStock: true },
        orderBy: { id: 'desc' },
        take: 4,
        include: {
            reviews: {
                where: { isApproved: true }
            }
        }
    });

    // console.log(hits);

    // 2. Отримуємо пости (спочатку найновіші)
    const posts = await prisma.post.findMany({
        orderBy: { id: 'desc' }
    });

    return (
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-16 sm:py-24 px-8 bg-gradient-to-b from-transparent to-black/[0.02]">
                <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                    Ексклюзивна колекція вин
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Відкрийте для себе найкращі смаки з усього світу. Ми ретельно відбираємо кожну пляшку.
                </p>
                {/* Додав ще одну кнопку під текст для зручності */}
                <div className="mt-8 flex gap-4">
                    <Link href="/about" className="rounded-full border border-black/[0.15] px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
                        Дізнатися більше
                    </Link>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-8 py-16 space-y-24">
                {/* Секція "Список Хітів" */}
                <section>
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Популярні вина</h2>
                            <p className="text-gray-500 mt-2">Вибір наших клієнтів</p>
                        </div>
                        <Link href="/wines" className="text-blue-600 hover:underline text-sm font-medium">
                            Дивитися весь каталог →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hits.map((wine) => {
                            // РАХУЄМО СЕРЕДНІЙ РЕЙТИНГ
                            const avgRating = wine.reviews && wine.reviews.length > 0
                                ? (wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length).toFixed(1)
                                : null;

                            return (
                                <div
                                    key={wine.id}
                                    className="group relative border border-black/[0.08] rounded-2xl overflow-hidden transition-all hover:shadow-lg flex flex-col bg-white"
                                >
                                    {/* ОГОРТКА-ПОСИЛАННЯ ДЛЯ КАРТИНКИ ТА ТЕКСТУ */}
                                    <Link href={`/wines/${wine.id}`} className="flex flex-col flex-grow cursor-pointer">
                                        <div className="w-full aspect-square relative bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {wine.images && wine.images.length > 0 ? (
                                                <Image
                                                    src={wine.images[0]}
                                                    alt={wine.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                                        <div className="flex-grow px-4 pt-4 pb-2">
                                            {/* Додано hover:text-blue-600 для візуального ефекту при наведенні */}
                                            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">{wine.name}</h3>

                                            {/* ВІДОБРАЖЕННЯ ЗІРОЧОК */}
                                            {avgRating ? (
                                                <div className="flex items-center gap-1 mt-1 mb-1 text-sm">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="font-medium text-gray-700">{avgRating}</span>
                                                    <span className="text-gray-400 text-xs">({wine.reviews.length})</span>
                                                </div>
                                            ) : (
                                                <div className="mt-1 mb-1 text-xs text-gray-400">Немає відгуків</div>
                                            )}

                                            <p className="text-sm text-gray-500 mt-1">
                                                {wine.country} • {wine.color} • {wine.sweetness}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2 line-clamp-2 text-justify">
                                                {wine.description}
                                            </p>
                                        </div>
                                    </Link>

                                    {/* КНОПКА ДОДАВАННЯ В КОШИК ЗАЛИШАЄТЬСЯ ЗОВНІ ПОСИЛАННЯ */}
                                    <div className="px-4 pb-4 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="font-bold text-lg text-gray-900">${wine.price}</div>
                                        <AddToCartButton wine={{ id: wine.id, name: wine.name, price: wine.price }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Секція "Пости" */}
                <section className="bg-gray-50 rounded-3xl p-8 sm:p-12">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold">Останні оновлення</h2>
                        <p className="text-gray-500 mt-2">Новини нашого блогу та сервісу</p>
                    </div>

                    <div className="space-y-6 max-w-3xl mx-auto">
                        {posts.length > 0 ? (
                            posts.map((p) => (
                                <div key={p.id} className="bg-white border border-black/[0.05] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    {p.images && p.images.length > 0 && (
                                        <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden">
                                            <Image src={p.images[0]} alt={p.title} fill className="object-cover hover:scale-105 transition-transform duration-300" />
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold mb-2 text-balance">{p.title}</h3>
                                    <p className="text-gray-600 line-clamp-3 text-justify">{p.content}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString('uk-UA')}</div>
                                        <Link href={`/posts/${p.id}`} className="text-blue-600 hover:underline text-sm font-medium">Читати повністю →</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl">
                                <p className="text-gray-400">Новини та статті скоро з&apos;являться.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
                <Footer />
        </div>
    );
}