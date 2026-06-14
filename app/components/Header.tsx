'use client';

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import SearchInput from "./SearchInput"; // Import your new search component

export default function Header() {
    const { items } = useCart();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        // Changed layout classes to handle the search bar responsiveness nicely
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 py-6 px-8 max-w-7xl mx-auto w-full border-b border-gray-100">
            {/* Left Side: Logo */}
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase whitespace-nowrap">
                ВМ Штифко
            </Link>

            {/* Center Side: Live Search Bar */}
            <div className="w-full md:flex-1 md:max-w-md mx-auto">
                <SearchInput />
            </div>

            {/* Right Side: Navigation & Cart */}
            <nav className="flex items-center gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-end">
                <Link href="/" className="text-sm font-medium hover:text-gray-500 transition-colors">Головна</Link>
                <Link href="/wines" className="text-sm font-medium hover:text-gray-500 transition-colors">Каталог</Link>
                <Link href="/about" className="text-sm font-medium hover:text-gray-500 transition-colors">Про нас</Link>

                {/* Shopping Cart Link */}
                <Link href="/cart" className="relative flex items-center hover:text-gray-500 transition-colors ml-2 md:ml-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>

                    {/* Red badge showing item count */}
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in fade-in zoom-in duration-200">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    );
}