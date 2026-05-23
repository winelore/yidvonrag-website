'use client';
import { useCart } from "@/lib/CartContext";
import { useState } from "react";

export default function AddToCartButton({ wine }: { wine: { id: string, name: string, price: number } }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(wine);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full sm:w-auto text-white py-2 px-6 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                isAdded 
                    ? "bg-green-600 opacity-100" 
                    : "bg-black hover:opacity-85 active:scale-95"
            }`}
        >
            {isAdded ? (
                <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Додано
                </>
            ) : (
                "Додати в кошик"
            )}
        </button>
    );
}