import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateWineAction } from '../actions'

export default async function EditWinePage({ params }: { params: { id: string } }) {
  const wine = await prisma.wine.findUnique({
    where: { id: params.id }
  })

  if (!wine) {
    notFound()
  }

  const updateWineWithId = updateWineAction.bind(null, wine.id)

  return (
    <div className="p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-3xl mx-auto">
      <Link href="/admin/wines" className="text-sm text-foreground hover:underline inline-flex items-center gap-2 mb-6">
        &larr; Назад до списку
      </Link>

      <div className="rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-white dark:bg-black p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Редагувати вино</h1>

        <form action={updateWineWithId} className="flex flex-col gap-6">

          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Назва</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={wine.name}
              required
              className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-foreground">Опис</label>
            <textarea
              id="description"
              name="description"
              defaultValue={wine.description}
              required
              rows={4}
              className="w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent p-4 text-sm transition-colors focus:border-foreground focus:outline-none resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="color" className="text-sm font-medium text-foreground">Колір</label>
              <input
                type="text"
                id="color"
                name="color"
                defaultValue={wine.color}
                className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="sweetness" className="text-sm font-medium text-foreground">Солодкість</label>
              <input
                type="text"
                id="sweetness"
                name="sweetness"
                defaultValue={wine.sweetness}
                className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="volume" className="text-sm font-medium text-foreground">{"Об'єм (л)"}</label>
              <input
                type="number"
                step="0.01"
                id="volume"
                name="volume"
                defaultValue={wine.volume}
                required
                className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="alcohol" className="text-sm font-medium text-foreground">Алкоголь</label>
              <input
                type="text"
                id="alcohol"
                name="alcohol"
                defaultValue={wine.alcohol}
                className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="grapeVariety" className="text-sm font-medium text-foreground">Сорт винограду</label>
              <input
                type="text"
                id="grapeVariety"
                name="grapeVariety"
                defaultValue={wine.grapeVariety}
                className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="country" className="text-sm font-medium text-foreground">Країна</label>
              <input
                type="text"
                id="country"
                name="country"
                defaultValue={wine.country}
                className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              defaultChecked={wine.inStock}
              className="h-5 w-5 rounded border-black/[.15] dark:border-white/[.15] accent-foreground"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-foreground cursor-pointer">В наявності</label>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 pt-4 border-t border-black/[.08] dark:border-white/[.145]">
            <button type="submit" className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-12 px-8">
              Зберегти зміни
            </button>
            <Link href="/admin/wines" className="w-full sm:w-auto rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-12 px-8 text-foreground">
              Скасувати
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
