'use client'

import Link from 'next/link'
import { useCart } from './CartContext'

export default function Header() {
    const { items } = useCart()
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-8 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tighter">
                YIDVONRAG
            </Link>
            <nav className="flex gap-6 items-center">
                <Link href="/wines" className="text-sm font-medium hover:text-blue-600 transition-colors">
                    Всі вина
                </Link>
                <Link href="/cart" className="relative flex items-center justify-center p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition">
                    <span className="text-xl">🛒</span>
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}