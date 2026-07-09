import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Контакти",
    description: "Контактна інформація та реквізити",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)] flex flex-col">
            <main className="flex-grow max-w-5xl mx-auto px-8 py-16 sm:py-24 w-full">
                <h1 className="text-4xl font-bold mb-12">Контактна інформація</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Контактні дані */}
                    <div className="space-y-8">

                        {/* Зв&apos;язок */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">Зв&apos;язок з нами</h2>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">📞</span>
                                <a href="tel:+380503179452" className="text-lg hover:text-blue-600 transition-colors">
                                    050-317-9452
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">✉️</span>
                                <a href="mailto:vine.shtufko@gmail.com" className="text-lg hover:text-blue-600 transition-colors">
                                    vine.shtufko@gmail.com
                                </a>
                            </div>

                            {/* Соцмережі */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                {/* Кнопка Facebook */}
                                <a
                                    href="https://www.facebook.com/Shtifko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 border border-black/[0.08] hover:border-[#1877F2] hover:bg-[#1877F2]/[0.03] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto"
                                >
                                    <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                                    </svg>
                                    <span>Ми на Facebook</span>
                                </a>

                                {/* Кнопка Instagram */}
                                <a
                                    href="https://www.instagram.com/shtufko/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 border border-black/[0.08] hover:border-[#E1306C] hover:bg-[#E1306C]/[0.03] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto"
                                >
                                    <svg className="w-5 h-5 fill-[#E1306C]" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                    </svg>
                                    <span>Ми в Instagram</span>
                                </a>
                            </div>
                        </div>

                        {/* Адреса та Графік */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">Адреса та графік</h2>

                            <div>
                                <span className="block text-sm text-gray-500 mb-1">Адреса</span>
                                <span className="text-lg">С.Ключарки, вул. Миру, 45</span>
                            </div>

                            <div>
                                <span className="block text-sm text-gray-500 mb-1">Графік роботи</span>
                                <span className="text-lg">Пн-Пт: 09:00 - 18:00</span>
                            </div>
                        </div>

                    </div>

                    <div className="h-full min-h-[400px] bg-gray-50 rounded-2xl border border-black/[0.08] overflow-hidden flex flex-col relative">
                        <iframe
                            src="https://maps.google.com/maps?q=Ключарки,+вул.+Миру,+45&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                        ></iframe>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}