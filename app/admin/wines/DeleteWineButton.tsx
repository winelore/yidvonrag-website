'use client';

import { useState, useTransition } from 'react';
import { deleteWineAction } from './actions';

export default function DeleteWineButton({ id }: { id: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        startTransition(() => {
            deleteWineAction(id);
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full sm:w-auto rounded-full border border-solid border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 transition-colors flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/30 text-sm h-12 px-8 shrink-0"
            >
                Видалити вино
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-white dark:bg-zinc-900 border border-black/[.08] dark:border-white/[.145] rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-6 transform transition-all">

                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">Видалення вина</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Ви впевнені, що хочете назавжди видалити це вино з каталогу? Цю дію неможливо буде скасувати.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3 w-full pt-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                disabled={isPending}
                                className="rounded-full border border-solid border-black/[.15] dark:border-white/[.15] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm h-11 px-6 text-foreground disabled:opacity-50"
                            >
                                Скасувати
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isPending}
                                className="rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center text-sm font-medium h-11 px-6 shadow-sm disabled:opacity-50"
                            >
                                {isPending ? 'Видаляємо...' : 'Так, видалити'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}