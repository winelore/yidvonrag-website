'use client';
import { useCart } from "@/lib/CartContext";

export default function AddToCartButton({ wine }: { wine: { id: string, name: string, price: number } }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(wine)}
            className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-85"
        >
            Додати в кошик (${wine.price})
        </button>
    );
}