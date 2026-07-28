import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
    return (
        // Додано min-h-screen та явні кольори фону для всієї сторінки
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-5xl mx-auto">
                {/* Жорстко задані кольори тексту замість text-foreground */}
                <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Адмін-панель</h1>
                <p className="mb-8 text-gray-500 dark:text-gray-400">Вітаємо в системі управління!</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Кнопка для вин */}
                    <Link
                        href="/admin/wines"
                        className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Управління винами</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Створення, редагування та перегляд списку вин у каталозі.</p>
                    </Link>

                    {/* Кнопка для замовлень */}
                    <Link
                        href="/admin/orders"
                        className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Управління замовленнями</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Перегляд списку замовлень клієнтів та зміна їх статусів.</p>
                    </Link>

                    {/* Кнопка для постів */}
                    <Link
                        href="/admin/posts"
                        className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Управління постами</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Створення, редагування та публікація записів у блозі.</p>
                    </Link>

                    {/* Кнопка для відгуків */}
                    <Link
                        href="/admin/reviews"
                        className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Управління відгуками</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Перевірка, схвалення та видалення відгуків користувачів.</p>
                    </Link>

                    {/* Кнопка для контактів */}
                    <Link
                        href="/admin/contact"
                        className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Налаштування контактів</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Зміна контактних даних, телефону, адреси та соцмереж.</p>
                    </Link>

                    {/* Кнопка для сторінки Про нас */}
                    <Link
                        href="/admin/about"
                        className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-md transition-all flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Про нас</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Редагування головного тексту про історію виноробні.</p>
                    </Link>
                </div>

                <form action={async () => {
                    'use server'
                    cookies().delete('session')
                    redirect('/admin/login')
                }}>
                    <button type="submit" className="rounded-full bg-black dark:bg-white text-white dark:text-black font-medium transition-colors flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-10 px-6">
                        Вийти
                    </button>
                </form>
            </div>
        </div>
    )
}