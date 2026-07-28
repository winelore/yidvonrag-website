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
        // Обертка на весь екран з напівпрозорим бордовим фоном і розмиттям (z-50 щоб бути поверх усього)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bordeaux-990/85 backdrop-blur-md px-4">

            {/* Саме віконце */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-bordeaux-100 relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-bordeaux-50 border border-bordeaux-200 text-bordeaux-900 flex items-center justify-center mx-auto mb-4 text-xl shadow-inner">
                    🍷
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-4 text-bordeaux-950">Вам вже виповнилося 18 років?</h2>

                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                    Цей сайт містить інформацію про алкогольні напої. Щоб продовжити, ви повинні підтвердити свій вік.
                </p>

                {/* Кнопки */}
                <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <button
                        onClick={handleYes}
                        className="w-full bg-gradient-to-r from-bordeaux-900 via-bordeaux-800 to-bordeaux-900 text-white py-3.5 px-6 rounded-full font-semibold hover:from-bordeaux-800 hover:to-bordeaux-700 transition-all duration-300 shadow-md shadow-bordeaux-900/20 text-sm sm:text-base whitespace-nowrap active:scale-[0.98]"
                    >
                        Так, мені виповнилося 18 років
                    </button>

                    <button
                        onClick={handleNo}
                        className="w-full bg-gray-100 text-gray-800 py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors border border-gray-200/80 text-sm sm:text-base whitespace-nowrap"
                    >
                        Ні, мені не виповнилося 18 років
                    </button>
                </div>
            </div>
        </div>
    )
}