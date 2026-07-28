'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { loginAction } from './actions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const initialState = { error: '', success: false }

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm h-12 px-5 disabled:opacity-70 disabled:cursor-not-allowed font-[family-name:var(--font-geist-sans)]"
        >
            {pending ? 'Завантаження...' : 'Увійти'}
        </button>
    )
}

export default function LoginPage() {
    const [state, formAction] = useFormState(loginAction, initialState)
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            router.push('/admin')
            router.refresh()
        }
    }, [state.success, router])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-12 font-[family-name:var(--font-geist-sans)]">
            <div className="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Вхід</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Увійдіть до панелі адміністратора</p>
                </div>

                <form action={formAction} className="flex flex-col gap-5">
                    {state.error && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-950/50 p-3 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50">
                            {state.error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="identifier" className="text-sm font-medium text-gray-900 dark:text-white">
                            Логін або Email
                        </label>
                        <input
                            id="identifier"
                            name="identifier"
                            type="text"
                            required
                            className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                            placeholder="admin"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-white">
                            Пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="h-12 w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent px-4 text-gray-900 dark:text-white text-sm transition-colors focus:border-black dark:focus:border-white focus:outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="mt-2">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    )
}