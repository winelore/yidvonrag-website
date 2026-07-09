'use client'

import { useState, useEffect } from 'react'

export default function AgeGate() {
    // Стан, який керує тим, чи показувати попап
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        const isVerified = document.cookie.split('; ').find(row => row.startsWith('ageVerified='));
        if (!isVerified) {
            setShowPopup(true);
        }
    }, []);

    // Якщо користувач вже підтвердив вік, нічого не рендеримо (попап зникає)
    if (!showPopup) return null;

    const handleYes = () => {
        const expires = new Date()
        expires.setDate(expires.getDate() + 1) // зникне через 1 день
        document.cookie = `ageVerified=true; expires=${expires.toUTCString()}; path=/; SameSite=Strict`
        setShowPopup(false)
    }

    const handleNo = () => {
        window.location.href = 'https://google.com'
    }

    return (
        // Обертка на весь екран з напівпрозорим чорним фоном і розмиттям (z-50 щоб бути поверх усього)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

            {/* Саме віконце */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-black/[0.08]">
                <h2 className="text-2xl font-bold mb-4 text-black">Вам вже виповнилося 18 років?</h2>

                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                    Цей сайт містить інформацію про алкогольні напої. Щоб продовжити, ви повинні підтвердити свій вік.
                </p>

                {/* Кнопки: змінено flex-col sm:flex-row на flex-col із фіксованою шириною */}
                <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <button
                        onClick={handleYes}
                        className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base whitespace-nowrap"
                    >
                        Так, мені виповнилося 18 років
                    </button>

                    <button
                        onClick={handleNo}
                        className="w-full bg-gray-100 text-black py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors border border-black/[0.05] text-sm sm:text-base whitespace-nowrap"
                    >
                        Ні, мені не виповнилося 18 років
                    </button>
                </div>
            </div>
        </div>
    )
}