'use client'

import { useCart } from './CartContext'

export default function AddToCartButton({ wine }: { wine: { id: string, name: string, price: number, inStock: boolean } }) {
    const { addToCart } = useCart()

    if (!wine.inStock) {
        return (
            <button disabled className="mt-4 w-full bg-gray-200 text-gray-500 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                Немає в наявності
            </button>
        )
    }

    return (
        <button
            onClick={(e) => {
                e.preventDefault() // Зупиняє перехід по лінку, якщо він прямо тут
                e.stopPropagation() // Зупиняє "спливання" кліку до батьківської картки <Link>
                addToCart(wine)
            }}
            className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
            Додати в корзину
        </button>
    )
}