'use client';

import { useCart } from "@/lib/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
    wine: { id: string; name: string; price: number };
    showQuantitySelector?: boolean;
    variant?: 'default' | 'card' | 'detail';
}

export default function AddToCartButton({
    wine,
    showQuantitySelector = true,
    variant = 'default'
}: AddToCartButtonProps) {
    const { addToCart, getItemQuantity, isLoaded } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [justAddedCount, setJustAddedCount] = useState<number | null>(null);

    const inCartCount = isLoaded ? getItemQuantity(wine.id) : 0;

    const handleAddToCart = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const countToAdd = Math.max(1, quantity);
        addToCart(wine, countToAdd);
        setJustAddedCount(countToAdd);
        setQuantity(1);

        setTimeout(() => {
            setJustAddedCount(null);
        }, 2000);
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setQuantity(prev => Math.min(99, prev + 1));
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) {
            setQuantity(1);
        } else {
            setQuantity(Math.min(99, val));
        }
    };

    const isAdded = justAddedCount !== null;

    if (variant === 'detail') {
        return (
            <div className="w-full space-y-3">
                {/* Indication of items already in cart */}
                {inCartCount > 0 && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-2.5 rounded-xl shadow-sm">
                        <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>У кошику вже {inCartCount} {inCartCount === 1 ? 'пляшка' : (inCartCount >= 2 && inCartCount <= 4 ? 'пляшки' : 'пляшок')}</span>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    {/* Quantity Selector */}
                    {showQuantitySelector && (
                        <div className="flex items-center justify-between border border-gray-200 bg-white rounded-xl p-1 shadow-sm h-12 w-full sm:w-36 flex-shrink-0">
                            <button
                                type="button"
                                onClick={handleDecrement}
                                disabled={quantity <= 1}
                                className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg text-lg font-bold transition disabled:opacity-30 disabled:hover:bg-transparent"
                                title="Зменшити кількість"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                min="1"
                                max="99"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-12 text-center text-gray-900 font-bold focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                                type="button"
                                onClick={handleIncrement}
                                className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg text-lg font-bold transition"
                                title="Збільшити кількість"
                            >
                                +
                            </button>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`flex-grow h-12 text-white py-3 px-6 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                            isAdded
                                ? "bg-emerald-600 opacity-100 shadow-emerald-200"
                                : "bg-gradient-to-r from-bordeaux-900 to-bordeaux-800 hover:from-bordeaux-800 hover:to-bordeaux-700 active:scale-[0.98]"
                        }`}
                    >
                        {isAdded ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Додано (+{justAddedCount})</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                                <span>Додати в кошик {quantity > 1 ? `(${quantity})` : ''}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    // Default / Card view
    return (
        <div className="w-full flex flex-col gap-2">
            {/* Cart Status Indicator */}
            {inCartCount > 0 && (
                <div className="text-[11px] font-semibold text-emerald-700 flex items-center justify-between px-1">
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        В кошику:
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md font-bold">
                        {inCartCount} шт.
                    </span>
                </div>
            )}

            <div className="flex items-center gap-2 w-full">
                {showQuantitySelector && (
                    <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg p-0.5 h-9 w-24 flex-shrink-0">
                        <button
                            type="button"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            className="w-7 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-white rounded text-xs font-bold transition disabled:opacity-30 disabled:hover:bg-transparent"
                            title="Зменшити"
                        >
                            −
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-800 select-none">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={handleIncrement}
                            className="w-7 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-white rounded text-xs font-bold transition"
                            title="Збільшити"
                        >
                            +
                        </button>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-grow h-9 text-white px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isAdded
                            ? "bg-emerald-600"
                            : "bg-bordeaux-900 hover:bg-bordeaux-800 active:scale-95"
                    }`}
                >
                    {isAdded ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>+{justAddedCount}</span>
                        </>
                    ) : (
                        <span>Додати {quantity > 1 ? `(${quantity})` : ''}</span>
                    )}
                </button>
            </div>
        </div>
    );
}