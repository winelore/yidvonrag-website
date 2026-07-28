'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import SearchInput from "./SearchInput"; // Import your new search component

export default function Header() {
    const { items } = useCart();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOverHero, setIsOverHero] = useState(true);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY || window.pageYOffset || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
            setIsScrolled(top > 20);

            if (isHome) {
                const heroElement = document.getElementById("hero-section");
                if (heroElement) {
                    const rect = heroElement.getBoundingClientRect();
                    // Header height is ~80px. If rect.bottom > 80px, header is over hero section
                    setIsOverHero(rect.bottom > 80);
                } else {
                    setIsOverHero(top <= 650);
                }
            } else {
                setIsOverHero(false);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        document.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            document.removeEventListener("scroll", handleScroll);
        };
    }, [isHome]);

    const isHeroHeader = isHome && isOverHero;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
                isHeroHeader
                    ? `bg-gradient-to-b from-black/90 via-black/40 to-transparent text-white ${
                        isScrolled ? "py-2 md:py-3" : "py-4 md:py-6"
                      }`
                    : `bg-white text-gray-900 shadow-md ${
                        isScrolled ? "py-2 md:py-3" : "py-4 md:py-6"
                      }`
            }`}
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-8 px-4 md:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
                {/* Left Side: Logo */}
                <Link
                    href="/"
                    style={{ position: 'relative' }}
                    className={`relative transition-all duration-300 hover:opacity-80 block shrink-0 ${
                        isScrolled ? "w-28 md:w-32 h-10 md:h-12" : "w-36 md:w-40 h-16 md:h-20"
                    }`}
                >
                    <Image
                        src="/logo-black.svg"
                        alt="ВМ Штифко"
                        fill
                        priority
                        className={`object-contain object-left transition-all duration-300 ${
                            isHeroHeader ? "brightness-0 invert" : ""
                        }`}
                    />
                </Link>

                {/* Center Side: Live Search Bar */}
                <div className="w-full md:flex-1 md:max-w-md mx-auto">
                    <SearchInput isTransparent={isHeroHeader} />
                </div>

                {/* Right Side: Navigation & Cart */}
                <nav className="flex items-center gap-6 md:gap-8 w-full md:w-auto justify-center md:justify-end font-medium text-base">
                    <Link
                        href="/"
                        className={`transition-colors ${
                            isHeroHeader ? "text-white hover:text-gray-300" : "text-gray-800 hover:text-gray-500"
                        }`}
                    >
                        Головна
                    </Link>
                    <Link
                        href="/wines"
                        className={`transition-colors ${
                            isHeroHeader ? "text-white hover:text-gray-300" : "text-gray-800 hover:text-gray-500"
                        }`}
                    >
                        Каталог
                    </Link>
                    <Link
                        href="/about"
                        className={`transition-colors ${
                            isHeroHeader ? "text-white hover:text-gray-300" : "text-gray-800 hover:text-gray-500"
                        }`}
                    >
                        Про нас
                    </Link>

                    {/* Shopping Cart Link */}
                    <Link
                        href="/cart"
                        className={`relative flex items-center transition-colors ml-2 md:ml-0 ${
                            isHeroHeader ? "text-white hover:text-gray-300" : "text-gray-800 hover:text-gray-500"
                        }`}
                    >
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