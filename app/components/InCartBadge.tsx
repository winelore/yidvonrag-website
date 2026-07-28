'use client';

import { useCart } from "@/lib/CartContext";

export default function InCartBadge({ wineId }: { wineId: string }) {
    const { getItemQuantity, isLoaded } = useCart();
    
    if (!isLoaded) return null;

    const count = getItemQuantity(wineId);
    if (count <= 0) return null;

    return (
        <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white/20 animate-in fade-in duration-200">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>В кошику: {count}</span>
        </div>
    );
}
