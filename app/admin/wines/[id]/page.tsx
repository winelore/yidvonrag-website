import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { updateWineAction, uploadImageAction, deleteImageAction } from '../actions'
import { ImageUploadInput } from './image-upload-input'

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

        <form id="update-wine-form" action={updateWineWithId} className="flex flex-col gap-6">

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

          <div className="border-t border-black/[.08] dark:border-white/[.145] pt-6 flex flex-col gap-6 mt-6">
             <h2 className="text-sm font-medium text-foreground">Завантажити фото</h2>
             {(!wine.images || wine.images.length === 0) ? (
                <ImageUploadInput /> 
             ) : (
                <p className="text-sm text-[#666] dark:text-[#999]">Ви можете додати нове фото лише після видалення існуючого.</p>
             )}
          </div>
        </form>

        {/* Existing Images Gallery */}
        {wine.images && wine.images.length > 0 && (
          <div className="mt-8 flex flex-col gap-6">
            <h2 className="text-sm font-medium text-foreground">Збережене зображення</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {wine.images.map((url: string) => (
                  <div key={url} className="relative group rounded-xl overflow-hidden shadow-sm border border-black/[.08] dark:border-white/[.145] aspect-[3/4] max-w-xs">
                     <Image src={url} alt={wine.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                     <form action={deleteImageAction.bind(null, wine.id, url)}>
                        <button 
                          type="submit" 
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                          title="Видалити зображення"
                        >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                     </form>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-black/[.08] dark:border-white/[.145]">
          <button type="submit" form="update-wine-form" className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-12 px-8">
            Зберегти зміни
          </button>
          <Link href="/admin/wines" className="w-full sm:w-auto rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-12 px-8 text-foreground">
            Скасувати
          </Link>
        </div>
      </div>
    </div>
  )
}
