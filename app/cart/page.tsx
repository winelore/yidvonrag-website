'use client'

import { useCart } from "@/components/CartContext"
import Link from "next/link"

export default function CartPage() {
    const { items, removeFromCart, totalPrice, clearCart } = useCart()

    return (
        <div className="min-h-screen bg-white text-black py-16 px-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-10">Ваша корзина</h1>

            {items.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-gray-300 rounded-2xl">
                    <p className="text-xl text-gray-500 mb-4">Корзина порожня 😔</p>
                    {/* ТЕПЕР МИ ВИКОРИСТОВУЄМО LINK */}
                    <Link href="/wines" className="text-blue-600 hover:underline font-medium">
                        Перейти до каталогу вин
                    </Link>
                </div>
            ) : (
                <div className="bg-gray-50 p-8 rounded-3xl">
                    <ul className="divide-y divide-gray-200">
                        {items.map(item => (
                            <li key={item.id} className="py-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">Кількість: {item.quantity}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-bold text-lg">{item.price * item.quantity} ₴</span>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Видалити</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-2xl font-bold">Разом:</span>
                        <span className="text-3xl font-extrabold text-blue-600">{totalPrice} ₴</span>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <button onClick={clearCart} className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-medium">Очистити</button>
                        <button className="flex-1 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">Оформити замовлення</button>
                    </div>
                </div>
            )}
        </div>
    )
}