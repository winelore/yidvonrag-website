'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/lib/CartContext';

function NotificationInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { clearCart } = useCart();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const orderId = searchParams.get('orderId');

        if (orderId) {
            // Запитуємо бекенд: чи дійсно це замовлення оплачено?
            fetch(`/api/order-status?id=${orderId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'SUCCESS') {
                        // Тільки якщо статус SUCCESS, показуємо плашку і чистимо кошик
                        setShow(true);
                        clearCart();

                        // Прибираємо orderId з URL
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete('orderId');
                        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
                        router.replace(newUrl, { scroll: false });

                        // Ховаємо автоматично через 8 секунд
                        setTimeout(() => setShow(false), 8000);
                    } else {
                        // Якщо юзер повернувся, але не оплатив (PENDING або FAILED)
                        // Просто чистимо URL, нічого не очищаючи з кошика
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete('orderId');
                        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
                        router.replace(newUrl, { scroll: false });
                    }
                })
                .catch(console.error);
        }
    }, [searchParams, router, pathname, clearCart]);

    if (!show) return null;

    return (
        // Замінили animate-bounce на просту плавну появу
        <div className="fixed bottom-10 right-4 sm:right-10 z-[100] animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="bg-green-600 text-white px-6 py-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-green-500">
                <span className="text-3xl">🍷</span>
                <div>
                    <h3 className="font-bold text-lg">Оплата успішна!</h3>
                    <p className="text-green-100 text-sm">Дякуємо за ваше замовлення.</p>
                </div>
                <button
                    onClick={() => setShow(false)}
                    className="ml-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Закрити"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function PaymentNotification() {
    return (
        <Suspense fallback={null}>
            <NotificationInner />
        </Suspense>
    );
}