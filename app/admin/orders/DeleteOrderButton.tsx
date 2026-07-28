'use client'

import { useTransition } from 'react'
import { deleteOrderAction } from './actions'

export function DeleteOrderButton({ orderId }: { orderId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('Ви впевнені, що хочете видалити це замовлення? Цю дію неможливо скасувати.')) {
            startTransition(async () => {
                await deleteOrderAction(orderId);
            });
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:underline disabled:opacity-50"
        >
            {isPending ? 'Видалення...' : 'Видалити'}
        </button>
    );
}
