import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminDashboard() {
  return (
    <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-6">Адмін-панель</h1>
      <p className="mb-4">Вітаємо в системі управління!</p>
      
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
