import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Адмін-панель</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Вітаємо в системі управління!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link 
          href="/admin/wines" 
          className="rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black p-6 shadow-sm hover:border-black/[.15] dark:hover:border-white/[.25] transition-colors flex flex-col gap-2"
        >
          <h2 className="text-xl font-semibold text-foreground">Управління винами</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Створення, редагування та перегляд списку вин у каталозі.</p>
        </Link>
      </div>
      
      <form action={async () => {
        'use server'
        cookies().delete('session')
        redirect('/admin/login')
      }}>
        <button type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-6">
          Вийти
        </button>
      </form>
    </div>
  )
}
