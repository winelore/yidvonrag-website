import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Контакти",
    description: "Контактна інформація та реквізити",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)] flex flex-col">
            <main className="flex-grow max-w-5xl mx-auto px-8 py-16 sm:py-24 w-full">
                <h1 className="text-4xl font-bold mb-12 text-center">Контактна інформація</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Контактні дані */}
                    <div className="space-y-8">

                        {/* Зв'язок */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">Зв&apos;язок з нами</h2>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">📞</span>
                                <a href="tel:+380501234567" className="text-lg hover:text-blue-600 transition-colors">
                                    050 123-45-67
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-400">✉️</span>
                                <a href="mailto:info@winestore-example.com" className="text-lg hover:text-blue-600 transition-colors">
                                    info@winestore-example.com
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-purple-500 font-bold">V</span>
                                <a href="viber://chat?number=%2B380501234567" className="text-lg hover:text-purple-600 transition-colors">
                                    050 123-45-67
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-blue-400 font-bold">T</span>
                                <a href="https://t.me/+380501234567" className="text-lg hover:text-blue-500 transition-colors" target="_blank" rel="noopener noreferrer">
                                    050 123-45-67
                                </a>
                            </div>
                        </div>

                        {/* Адреса та Графік */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold border-b border-gray-100 pb-2">Адреса та графік</h2>

                            <div>
                                <span className="block text-sm text-gray-500 mb-1">Адреса</span>
                                <span className="text-lg">м. Львів, вул. Виноградна, 15</span>
                            </div>

                            <div>
                                <span className="block text-sm text-gray-500 mb-1">Графік роботи</span>
                                <span className="text-lg">Пн-Нд: 09:00 - 20:00</span>
                            </div>
                        </div>

                    </div>

{/*                     Карта Google Maps
                    <div className="h-full min-h-[400px] bg-gray-50 rounded-2xl border border-black/[0.08] overflow-hidden flex flex-col relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-100/50">
                            <span className="text-4xl mb-4">🗺️</span>
                            <h3 className="text-lg font-medium text-gray-600">Тут буде Google Maps</h3>
                            <p className="text-sm text-gray-400 mt-2">
                                Вставте код iframe з Google Maps замість цього блоку.
                            </p>
                        </div>
                    </div>*/}

                </div>
            </main>
            <Footer />
        </div>
    );
}