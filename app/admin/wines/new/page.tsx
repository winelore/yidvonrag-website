import Link from 'next/link'
import { submitNewWineAction } from '../actions'
import { ImageGalleryManager } from '../[id]/image-upload-input'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { AdminForm } from '../../components/AdminForm'

export default function NewWinePage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin/wines" className="text-sm text-gray-900 dark:text-white hover:underline inline-flex items-center gap-2 mb-6">
                    &larr; Назад до списку
                </Link>

                <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Додати нове вино</h1>

                    <AdminForm id="create-wine-form" action={submitNewWineAction} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">Назва</label>
                            <input
                                type="text" id="name" name="name" required
                                className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="description" className="text-sm font-medium text-gray-900 dark:text-white">Опис</label>
                            <textarea
                                id="description" name="description" required rows={4}
                                className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent p-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none resize-y"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="color" className="text-sm font-medium text-gray-900 dark:text-white">Колір</label>
                                <input type="text" id="color" name="color" className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none" />
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="sweetness" className="text-sm font-medium text-gray-900 dark:text-white">Солодкість</label>
                                <input type="text" id="sweetness" name="sweetness" className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="volume" className="text-sm font-medium text-gray-900 dark:text-white">{"Об'єм (л)"}</label>
                                <input type="number" step="0.01" id="volume" name="volume" defaultValue={0.75} required className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none" />
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="alcohol" className="text-sm font-medium text-gray-900 dark:text-white">Алкоголь</label>
                                <input type="text" id="alcohol" name="alcohol" className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="grapeVariety" className="text-sm font-medium text-gray-900 dark:text-white">Сорт винограду</label>
                                <input type="text" id="grapeVariety" name="grapeVariety" className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none" />
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="price" className="text-sm font-medium text-gray-900 dark:text-white">Ціна (грн)</label>
                                <input type="number" step="0.01" id="price" name="price" required className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <input type="checkbox" id="inStock" name="inStock" defaultChecked={true} className="h-5 w-5 rounded border-gray-300 dark:border-zinc-700 accent-black dark:accent-white" />
                            <label htmlFor="inStock" className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer">В наявності</label>
                        </div>

                        <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 flex flex-col gap-4 mt-6">
                            <h2 className="text-sm font-medium text-gray-900 dark:text-white">Галерея зображень</h2>
                            <ImageGalleryManager initialImages={[]} />
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row justify-between pt-6 border-t border-gray-200 dark:border-zinc-800">
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <FormSubmitButton className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-8">
                                    Створити вино
                                </FormSubmitButton>
                                <Link href="/admin/wines" className="w-full sm:w-auto rounded-full border border-solid border-gray-200 dark:border-zinc-800 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm h-12 px-8 text-gray-900 dark:text-white">
                                    Скасувати
                                </Link>
                            </div>
                        </div>
                    </AdminForm>
                </div>
            </div>
        </div>
    )
}