'use client'

import { useState, useEffect } from 'react'

export default function AgeGate() {
    // Стан, який керує тим, чи показувати попап
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        // При завантаженні сторінки перевіряємо, чи є запис у localStorage
        const isVerified = localStorage.getItem('ageVerified')

        // Якщо запису немає (користувач зайшов вперше), показуємо попап
        if (!isVerified) {
            setShowPopup(true)
        }
    }, [])

    // Якщо користувач вже підтвердив вік, нічого не рендеримо (попап зникає)
    if (!showPopup) return null;

    const handleYes = () => {
        // Записуємо в браузер, що клієнту є 18
        localStorage.setItem('ageVerified', 'true')
        // Ховаємо попап
        setShowPopup(false)
    }

    const handleNo = () => {
        // Якщо немає 18, просто перекидаємо його на Google (або куди завгодно)
        window.location.href = 'https://google.com'
    }

    return (
        // Обертка на весь екран з напівпрозорим чорним фоном і розмиттям (z-50 щоб бути поверх усього)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

            {/* Саме віконце */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-black/[0.08]">
                <h2 className="text-3xl font-bold mb-4 text-black">Вам вже є 18 років?</h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Цей сайт містить інформацію про алкогольні напої. Для доступу до каталогу ви повинні підтвердити свій вік.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleYes}
                        className="w-full sm:w-1/2 bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Так, мені є 18
                    </button>

                    <button
                        onClick={handleNo}
                        className="w-full sm:w-1/2 bg-gray-100 text-black py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors border border-black/[0.05]"
                    >
                        Ні, мені менше
                    </button>
                </div>
            </div>
        </div>
    )
}