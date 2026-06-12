'use client';

import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { useState } from 'react';

export default function CartPage() {
    const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')

    if (items.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-8 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Ваш кошик порожній 🛒</h1>
                <p className="text-gray-500 mb-8">Час обрати своє улюблене вино!</p>
                <Link href="/wines" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                    Перейти до каталогу
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-8 py-16 min-h-screen">
            <h1 className="text-4xl font-bold mb-10">Кошик</h1>

            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-10">
                {/* Список товарів */}
                <div className="space-y-6">
                    {items.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">

                            <div className="flex-grow">
                                <Link href={`/wines/${item.id}`} className="text-lg font-semibold hover:underline">
                                    {item.name}
                                </Link>
                                <div className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} за шт.</div>
                            </div>

                            <div className="flex items-center gap-6">
                                {/* Кнопки Плюс / Мінус */}
                                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-black font-bold px-2">-</button>
                                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-black font-bold px-2">+</button>
                                </div>

                                <div className="font-bold text-lg w-20 text-right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                {/* Кнопка Видалити */}
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Підсумок */}
                <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Разом до оплати</p>
                        <p className="text-4xl font-black">${totalPrice.toFixed(2)}</p>
                    </div>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault()
                                if (items.length === 0) return alert('Кошик порожній')
                                if (!customerName.trim()) return alert('Вкажіть ім\'я покупця')
                                try {
                                    setLoading(true)
                                    const res = await fetch('/api/checkout', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ customerName: customerName.trim(), customerEmail: customerEmail?.trim(), items })
                                    })
                                    const json = await res.json()
                                    if (res.ok) {
                                        // clear cart using context
                                        // clearCart is provided by useCart
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        clearCart()
                                        alert('Замовлення успішно створено. Номер: ' + json.orderId)
                                    } else {
                                        alert('Помилка: ' + (json.error || 'Невідома помилка'))
                                    }
                                } catch (e) {
                                    // eslint-disable-next-line no-console
                                    console.error(e)
                                    alert('Помилка мережі')
                                } finally {
                                    setLoading(false)
                                }
                            }}
                            className="w-full mt-6"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                <input
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="border border-gray-200 rounded-xl px-4 py-3"
                                    placeholder="Ім'я покупця"
                                    required
                                />
                                <input
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    className="border border-gray-200 rounded-xl px-4 py-3"
                                    placeholder="Email (опційно)"
                                    type="email"
                                />
                            </div>
                            <div className="flex gap-3 items-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-black text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg"
                                >
                                    {loading ? 'Обробка...' : 'Оформити замовлення'}
                                </button>
                                <div className="text-sm text-gray-600 ml-3">Разом: <strong>${totalPrice.toFixed(2)}</strong></div>
                            </div>
                        </form>
                </div>
            </div>
        </main>
    );
}