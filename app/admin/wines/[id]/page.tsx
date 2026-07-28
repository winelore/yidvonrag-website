import prisma from '@/lib/prisma'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import {updateWineAction} from '../actions'
import {ImageGalleryManager} from './image-upload-input'
import {FormSubmitButton} from '../../components/FormSubmitButton'
import {AdminForm} from '../../components/AdminForm'
import DeleteWineButton from '../DeleteWineButton'

export default async function EditWinePage({params}: { params: { id: string } }) {
    const wine = await prisma.wine.findUnique({
        where: {id: params.id}
    })

    if (!wine) {
        notFound()
    }

    const updateWineWithId = updateWineAction.bind(null, wine.id)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin/wines"
                      className="text-sm text-gray-900 dark:text-white hover:underline inline-flex items-center gap-2 mb-6">
                    &larr; Назад до списку
                </Link>

                <div
                    className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Редагувати вино</h1>

                    <AdminForm id="update-wine-form" action={updateWineWithId} className="flex flex-col gap-6">

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">Назва</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={wine.name}
                                required
                                className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="description" className="text-sm font-medium text-gray-900 dark:text-white">Опис</label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={wine.description}
                                required
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent p-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none resize-y"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="color" className="text-sm font-medium text-gray-900 dark:text-white">Колір</label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    defaultValue={wine.color}
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="sweetness"
                                       className="text-sm font-medium text-gray-900 dark:text-white">Солодкість</label>
                                <input
                                    type="text"
                                    id="sweetness"
                                    name="sweetness"
                                    defaultValue={wine.sweetness}
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="volume"
                                       className="text-sm font-medium text-gray-900 dark:text-white">{"Об'єм (л)"}</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="volume"
                                    name="volume"
                                    defaultValue={wine.volume}
                                    required
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="alcohol" className="text-sm font-medium text-gray-900 dark:text-white">Алкоголь</label>
                                <input
                                    type="text"
                                    id="alcohol"
                                    name="alcohol"
                                    defaultValue={wine.alcohol}
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="grapeVariety" className="text-sm font-medium text-gray-900 dark:text-white">Сорт
                                    винограду</label>
                                <input
                                    type="text"
                                    id="grapeVariety"
                                    name="grapeVariety"
                                    defaultValue={wine.grapeVariety}
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="price" className="text-sm font-medium text-gray-900 dark:text-white">Ціна (грн)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="price"
                                    name="price"
                                    defaultValue={wine.price}
                                    required
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <input
                                type="checkbox"
                                id="inStock"
                                name="inStock"
                                defaultChecked={wine.inStock}
                                className="h-5 w-5 rounded border-gray-300 dark:border-zinc-700 accent-black dark:accent-white"
                            />
                            <label htmlFor="inStock" className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">В
                                наявності</label>
                        </div>

                        <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 flex flex-col gap-4 mt-6">
                            <h2 className="text-sm font-medium text-gray-900 dark:text-white">Галерея зображень</h2>
                            <ImageGalleryManager initialImages={wine.images || []}/>
                        </div>

                        {/* Submit Actions */}
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <FormSubmitButton className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-8">
                                    Зберегти зміни
                                </FormSubmitButton>
                                <Link href="/admin/wines" className="w-full sm:w-auto rounded-full border border-solid border-gray-200 dark:border-zinc-800 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm h-12 px-8 text-gray-900 dark:text-white">
                                    Скасувати
                                </Link>
                            </div>

                            <div className="w-full sm:w-auto">
                                <DeleteWineButton id={wine.id} />
                            </div>
                        </div>
                    </AdminForm>
                </div>
            </div>
        </div>
    )
}