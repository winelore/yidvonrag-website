'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import SearchInput from "./SearchInput"; // Import your new search component

export default function Header() {
    const { items } = useCart();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${
                isScrolled ? "py-2 md:py-3 shadow-md" : "py-4 md:py-6"
            }`}
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-8 px-4 md:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
                {/* Left Side: Logo */}
                <Link
                    href="/"
                    className={`relative transition-all duration-300 hover:opacity-80 block shrink-0 ${
                        isScrolled ? "w-28 md:w-32 h-10 md:h-12" : "w-36 md:w-40 h-16 md:h-20"
                    }`}
                >
                    <Image
                        src="/logo-black.svg"
                        alt="ВМ Штифко"
                        fill
                        priority
                        className="object-contain object-left transition-all duration-300"
                    />
                </Link>

                {/* Center Side: Live Search Bar */}
                <div className="w-full md:flex-1 md:max-w-md mx-auto">
                    <SearchInput />
                </div>

                {/* Right Side: Navigation & Cart */}
                <nav className="flex items-center gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-end">
                    <Link href="/" className="text-base font-medium hover:text-gray-500 transition-colors">Головна</Link>
                    <Link href="/wines" className="text-base font-medium hover:text-gray-500 transition-colors">Каталог</Link>
                    <Link href="/about" className="text-base font-medium hover:text-gray-500 transition-colors">Про нас</Link>

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
            </div>
        </header>
    );
}