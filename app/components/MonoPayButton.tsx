"use client";

import { useState } from "react";

interface MonoPayButtonProps {
    wineId: string;
    price: number;
}

export default function MonoPayButton({ wineId, price }: MonoPayButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            // ОНОВЛЕНО: Відправляємо товар як масив cartItems
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartItems: [{ id: wineId, quantity: 1 }]
                })
            });

            const data = await res.json();

            if (data.pageUrl) {
                // Переходимо на сторінку оплати
                window.location.href = data.pageUrl;
            } else {
                alert(data.error || "Помилка створення платежу");
            }
        } catch (error) {
            console.error(error);
            alert("Виникла помилка під час з'єднання із сервером");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading || price <= 0}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2
        ${loading || price <= 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]'
            }`}
        >
            {loading ? (
                <span className="animate-pulse">Підготовка...</span>
            ) : (
                <>
                    <span className="text-xl leading-none">💳</span>
                    Купити за {price} ₴
                </>
            )}
        </button>
    );
}