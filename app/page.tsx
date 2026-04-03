import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function Home() {
    // Звертаємося до бази даних і беремо перші 4 вина, які є в наявності
    const hits = await prisma.wine.findMany({
        where: {
            inStock: true,
        },
        take: 4,
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

            {/* Секція "Список Хітів" */}
            <main className="max-w-7xl mx-auto px-8 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Популярні вина</h2>
                        <p className="text-gray-500 mt-2">Вибір наших клієнтів</p>
                    </div>
                    <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                        Дивитися весь каталог →
                    </a>
                </div>

                {/* Сітка товарів */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {hits.map((wine) => (
                        <div
                            key={wine.id}
                            className="group relative border border-black/[0.08] rounded-2xl p-4 transition-all hover:shadow-lg hover:border-transparent flex flex-col"
                        >
                            {/* Заглушка для фотографії */}
                            <div className="aspect-square relative mb-4 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                                <Image
                                    src="https://nextjs.org/icons/file.svg" // Тимчасова іконка
                                    alt={wine.name}
                                    width={60}
                                    height={60}
                                    className="opacity-20 group-hover:scale-110 transition-transform"
                                />
                            </div>

                            <div className="flex-grow">
                                <h3 className="font-semibold text-lg line-clamp-1">{wine.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {wine.country} • {wine.color} • {wine.sweetness}
                                </p>
                                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                                    {wine.description}
                                </p>
                            </div>

                            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-85">
                                Додати в кошик
                            </button>
                        </div>
                    ))}

                    {/* Якщо база пуста, показуємо повідомлення */}
                    {hits.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center py-10">
                            Наразі вина відсутні в базі даних.
                        </p>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-black/[0.08] py-10 text-center text-sm text-gray-500">
                <p>© 2026 yidvonrag-website. Всі права захищені.</p>
            </footer>
        </div>
    );
}