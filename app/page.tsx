import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";


export default async function Home() {
    // 1. Отримуємо вина (хіти)
    const hits = await prisma.wine.findMany({
        where: { inStock: true },
        take: 4,
    });

    // 2. Отримуємо пости (спочатку найновіші)
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-8 bg-gradient-to-b from-transparent to-black/[0.02]">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                    Ексклюзивна колекція вин
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                    Відкрийте для себе найкращі смаки з усього світу. Ми ретельно відбираємо кожну пляшку.
                </p>
            </section>

            <main className="max-w-7xl mx-auto px-8 py-16 space-y-24">

                {/* Секція "Список Хітів" */}
                <section>
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Популярні вина</h2>
                            <p className="text-gray-500 mt-2">Вибір наших клієнтів</p>
                        </div>
                        <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                            Дивитися весь каталог →
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {hits.map((w) => (
                            <div key={w.id} className="group relative border border-black/[0.08] rounded-2xl p-4 transition-all hover:shadow-lg flex flex-col">
                                <div className="aspect-square relative mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                                    <Image src="https://nextjs.org/icons/file.svg" alt={w.name} width={60} height={60} className="opacity-20" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg">{w.name}</h3>
                                    <p className="text-sm text-gray-500">{w.country} • {w.color}</p>
                                </div>
                                <button className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm font-medium">Купити</button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Секція "Пости / Новини" */}
                <section className="bg-gray-50 rounded-3xl p-8 sm:p-12">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold">Останні оновлення</h2>
                        <p className="text-gray-500 mt-2">Новини нашого блогу та сервісу</p>
                    </div>

                    <div className="space-y-6 max-w-3xl mx-auto">
                        {posts.length > 0 ? (
                            posts.map((p) => (
                                <div key={p.id} className="bg-white border border-black/[0.05] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    {/* Додали заголовок */}
                                    <h3 className="text-xl font-bold mb-2">{p.title}</h3>

                                    {/* Обрізаємо текст до 3 рядків */}
                                    <p className="text-gray-600 line-clamp-3">
                                        {p.content}
                                    </p>

                                    <div className="mt-4 flex justify-between items-center">
                                        <div className="text-xs text-gray-400">
                                            {new Date(p.createdAt).toLocaleDateString('uk-UA')}
                                        </div>
                                        {/* Кнопка переходу на окрему сторінку */}
                                        <Link href={`/posts/${p.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                                            Читати повністю →
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl">
                                <p className="text-gray-400">Тут поки порожньо. Скоро з'являться перші пости!</p>
                            </div>
                        )}
                    </div>
                </section>

            </main>

            <footer className="border-t border-black/[0.08] py-10 text-center text-sm text-gray-500">
                <p>© 2026 yidvonrag-website. Всі права захищені.</p>
            </footer>
        </div>
    );
}