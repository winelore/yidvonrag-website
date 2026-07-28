import Link from 'next/link'
import { getContactSettings, updateContactSettingsAction } from './actions'
import { FormSubmitButton } from '../components/FormSubmitButton'
import { AdminForm } from '../components/AdminForm'

export const dynamic = 'force-dynamic'

export default async function AdminContactPage() {
    const settings = await getContactSettings();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin" className="text-sm text-gray-900 dark:text-white hover:underline inline-flex items-center gap-2 mb-6">
                    &larr; Назад до адмін-панелі
                </Link>

                <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Редагування контактів</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Оновіть контактні дані, які відображаються на сторінці контактів та у підвалі сайту.</p>

                    <AdminForm id="update-contact-form" action={updateContactSettingsAction} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-white">Номер телефону</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                defaultValue={settings.phone}
                                required
                                className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">Email адреса</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={settings.email}
                                required
                                className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="address" className="text-sm font-medium text-gray-900 dark:text-white">Адреса виноробні</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                defaultValue={settings.address}
                                required
                                className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="workingHours" className="text-sm font-medium text-gray-900 dark:text-white">Графік роботи</label>
                            <input
                                type="text"
                                id="workingHours"
                                name="workingHours"
                                defaultValue={settings.workingHours}
                                required
                                className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 border-t border-gray-200 dark:border-zinc-800 pt-6">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="facebookUrl" className="text-sm font-medium text-gray-900 dark:text-white">Посилання Facebook</label>
                                <input
                                    type="url"
                                    id="facebookUrl"
                                    name="facebookUrl"
                                    defaultValue={settings.facebookUrl}
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 flex-1">
                                <label htmlFor="instagramUrl" className="text-sm font-medium text-gray-900 dark:text-white">Посилання Instagram</label>
                                <input
                                    type="url"
                                    id="instagramUrl"
                                    name="instagramUrl"
                                    defaultValue={settings.instagramUrl}
                                    className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm focus:border-black dark:focus:border-white focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-zinc-800">
                            <FormSubmitButton className="w-full sm:w-auto rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-8">
                                Зберегти контакти
                            </FormSubmitButton>
                            <Link href="/admin" className="w-full sm:w-auto rounded-full border border-solid border-gray-200 dark:border-zinc-800 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm h-12 px-8 text-gray-900 dark:text-white">
                                Скасувати
                            </Link>
                        </div>
                    </AdminForm>
                </div>
            </div>
        </div>
    );
}
