'use client';
import { useCart } from "@/lib/CartContext";

export default function CartWidget() {
    const { items, totalPrice } = useCart();

    // Рахуємо загальну кількість товарів
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // Якщо кошик порожній, нічого не показуємо
    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-8 right-8 bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-50 hover:bg-gray-800 transition cursor-pointer border border-gray-700">
            <span className="font-bold text-lg">🛒 {totalItems} шт.</span>
            <span className="opacity-50">|</span>
            <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
        </div>
    );
}