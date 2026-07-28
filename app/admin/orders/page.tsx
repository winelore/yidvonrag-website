import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { OrderStatusSelect } from './OrderStatusSelect'
import { DeleteOrderButton } from './DeleteOrderButton'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            items: {
                include: {
                    wine: true
                }
            }
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black px-4 sm:px-8 pt-56 sm:pt-48 md:pt-40 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Замовлення ({orders.length})</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Управління замовленнями клієнтів та зміна їх статусів</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {orders.map(order => {
                        const dateFormatted = new Date(order.createdAt).toLocaleString('uk-UA', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });

                        return (
                            <div key={order.id} className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col gap-6">
                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">ID замовлення: {order.id}</span>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Дата: {dateFormatted}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                                        <DeleteOrderButton orderId={order.id} />
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl text-sm">
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Клієнт</span>
                                        <span className="font-medium text-gray-900 dark:text-white block">
                                            {order.customerName || order.customerSurname ? `${order.customerName || ''} ${order.customerSurname || ''}`.trim() : 'Ім\'я не вказано'}
                                        </span>
                                        <a href={`tel:${order.customerPhone}`} className="text-blue-600 dark:text-blue-400 hover:underline block mt-0.5">
                                            {order.customerPhone || 'Телефон не вказано'}
                                        </a>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Доставка (Нова Пошта)</span>
                                        <span className="text-gray-900 dark:text-white block">
                                            {order.customerCity ? `м. ${order.customerCity}` : 'Місто не вказано'}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 block text-xs mt-0.5">
                                            {order.customerBranch ? `Відділення: ${order.customerBranch}` : 'Відділення не вказано'}
                                        </span>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="flex flex-col gap-3">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Товари в замовленні:</span>
                                    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                                        {order.items.map(item => (
                                            <div key={item.id} className="py-2.5 flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    {item.wine?.images && item.wine.images.length > 0 ? (
                                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 shrink-0">
                                                            <Image src={item.wine.images[0]} alt={item.wine.name} fill className="object-cover" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 shrink-0" />
                                                    )}
                                                    <div>
                                                        <span className="font-medium text-sm text-gray-900 dark:text-white block">{item.wine?.name || 'Вино видалено'}</span>
                                                        <span className="text-xs text-gray-500">{item.price} ₴ x {item.quantity} шт.</span>
                                                    </div>
                                                </div>
                                                <span className="font-semibold text-sm text-gray-900 dark:text-white">{item.price * item.quantity} ₴</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="border-t border-gray-100 dark:border-zinc-800 pt-3 flex justify-between items-center">
                                    <span className="font-semibold text-base text-gray-900 dark:text-white">Загальна сума:</span>
                                    <span className="font-bold text-xl text-gray-900 dark:text-white">{order.amount} ₴</span>
                                </div>
                            </div>
                        );
                    })}

                    {orders.length === 0 && (
                        <div className="text-center py-16 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm text-gray-500">
                            Замовлень поки немає.
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <Link href="/admin" className="text-sm text-gray-900 dark:text-white hover:underline inline-flex items-center gap-2">
                        &larr; Назад до адмін-панелі
                    </Link>
                </div>
            </div>
        </div>
    );
}
