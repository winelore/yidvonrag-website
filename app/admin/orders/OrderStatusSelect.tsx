'use client'

import { useTransition } from 'react'
import { updateOrderStatusAction } from './actions'

const STATUS_OPTIONS = [
    { value: 'PENDING', label: 'В очікуванні (PENDING)', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { value: 'PAID', label: 'Оплачено (PAID)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    { value: 'PROCESSING', label: 'В обробці (PROCESSING)', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    { value: 'SHIPPED', label: 'Відправлено (SHIPPED)', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    { value: 'COMPLETED', label: 'Виконано (COMPLETED)', color: 'bg-green-100 text-green-800 border-green-300' },
    { value: 'CANCELLED', label: 'Скасовано (CANCELLED)', color: 'bg-red-100 text-red-800 border-red-300' },
]

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
    const [isPending, startTransition] = useTransition();

    const currentOption = STATUS_OPTIONS.find(opt => opt.value === currentStatus) || {
        value: currentStatus,
        label: currentStatus,
        color: 'bg-gray-100 text-gray-800 border-gray-300'
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        startTransition(async () => {
            await updateOrderStatusAction(orderId, newStatus);
        });
    };

    return (
        <div className="relative inline-block">
            <select
                value={currentStatus}
                onChange={handleChange}
                disabled={isPending}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border cursor-pointer focus:outline-none transition-opacity ${currentOption.color} ${isPending ? 'opacity-50' : 'opacity-100'}`}
            >
                {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-white text-gray-900 font-normal">
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
