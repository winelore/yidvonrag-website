import prisma from '@/lib/prisma'
import Link from 'next/link'
import { createWineAction } from './actions'

export const dynamic = 'force-dynamic'

export default async function WinesPage() {
  const wines = await prisma.wine.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-foreground">Список вин</h1>
        <form action={createWineAction}>
          <button type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-12 px-6">
            Додати нове вино
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {wines.map(wine => (
          <div key={wine.id} className="rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-black/[.15] dark:hover:border-white/[.25]">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-foreground">{wine.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {wine.color || 'Колір не вказано'} | {wine.country || 'Країна не вказана'} | {wine.volume} л
              </p>
            </div>
            <Link 
              href={`/admin/wines/${wine.id}`}
              className="rounded-full border border-solid border-black/[.15] dark:border-white/[.15] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-10 px-6 text-foreground shrink-0"
            >
              Редагувати
            </Link>
          </div>
        ))}
        {wines.length === 0 && (
          <div className="text-center py-16 rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black p-8 shadow-sm text-gray-500">
            Вин поки немає. Додайте перше вино!
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <Link href="/admin" className="text-sm text-foreground hover:underline inline-flex items-center gap-2">
          &larr; Назад до адмін-панелі
        </Link>
      </div>
    </div>
  )
}
