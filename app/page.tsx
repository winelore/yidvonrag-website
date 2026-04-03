import Image from "next/image";
import { hits } from "../lib/data";


export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-black font-[family-name:var(--font-geist-sans)]">

            {/* Hero Section (Головний банер) */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-8 bg-gradient-to-b from-transparent to-black/[0.02] dark:to-white/[0.02]">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                    Ласкаво просимо до нашого проєкту
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                    Тут ви знайдете найкращі пропозиції та найсвіжіші новинки. Ми працюємо, щоб ви отримували якість.
                </p>
            </section>

            {/* Секція "Список Хітів" */}
            <main className="max-w-7xl mx-auto px-8 py-16">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Наші Хіти</h2>
                        <p className="text-gray-500 mt-2">Найпопулярніші позиції сезону</p>
                    </div>
                    <a href="#" className="text-blue-600 hover:underline text-sm font-medium">
                        Дивитися всі →
                    </a>
                </div>

                {/* Сітка товарів */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {hits.map((hit) => (
                        <div
                            key={hit.id}
                            className="group relative border border-black/[0.08] dark:border-white/[0.1] rounded-2xl p-4 transition-all hover:shadow-lg hover:border-transparent"
                        >
                            <div className="aspect-square relative mb-4 bg-gray-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center overflow-hidden">
                                <Image
                                    src={hit.image}
                                    alt={hit.title}
                                    width={60}
                                    height={60}
                                    className="opacity-50 group-hover:scale-110 transition-transform dark:invert"
                                />
                            </div>
                            <h3 className="font-semibold text-lg">{hit.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">{hit.price}</p>
                            <button className="mt-4 w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-85">
                                Купити
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-black/[0.08] dark:border-white/[0.1] py-10 text-center text-sm text-gray-500">
                <p>© 2026 yidvonrag-website. Всі права захищені.</p>
            </footer>
        </div>
    );
}