import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata = {
    title: "Співпраця",
    description: "Умови партнерства, гуртові поставки та співпраця з нами.",
};

export default function CooperationPage() {
    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)] flex flex-col">
            <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 sm:pt-48 md:pt-40 pb-16 sm:pb-24 w-full">

                {/* Заголовок та вступ */}
                <div className="text-center mb-16 border-b border-black/[0.08] pb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight pb-4">Співпраця з нами</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-justify">
                        Ми шукаємо партнерів, які поділяють наше ставлення до справи: чесність, відповідальність та увагу до кожної деталі.
                        Наші вина народжуються на закарпатських схилах із власного винограду і створюються лімітованими партіями під суворим контролем.
                        Ми прагнемо продовжувати багатовікові традиції виноробства нашого краю, поєднуючи їх із сучасними стандартами якості.
                        Саме тому ми запрошуємо до співпраці однодумців, для яких репутація та справжній, живий смак напою стоять на першому місці.
                    </p>
                </div>

                {/* Основний контент: Кому цікаво і Формати */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-16">

                    {/* Цільова аудиторія */}
                    <div className="bg-gray-50 rounded-3xl p-8 sm:p-10 border border-black/[0.04] hover:border-black/[0.1] transition-colors">
                        <h2 className="text-2xl font-bold mb-6">Для кого ми працюємо</h2>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-3xl mt-0.5">🍷</span>
                                <span className="text-justify">Спеціалізовані винні магазини, які шукають ексклюзивні вина для розширення свого асортименту.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-xl mt-0.5">🍽️</span>
                                <span className="text-justify">Ресторани, бари та готелі, які хочуть додати в карту унікальні позиції та дивувати своїх гостей справжнім регіональним продуктом.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-xl mt-0.5">🎫</span>
                                <span className="text-justify">Івент-організатори, які шукають якісне вино для закритих вечорів, турів чи культурних подій.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-3xl p-8 sm:p-10 border border-black/[0.04] hover:border-black/[0.1] transition-colors">
                        <h2 className="text-2xl font-bold mb-6">Формати взаємодії</h2>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2"></span>
                                <span className="text-justify">Стабільні гуртові відвантаження за узгодженим графіком.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2"></span>
                                <span className="text-justify">Спільне проведення дегустацій та тематичних івентів.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2"></span>
                                <span className="text-justify">Професійна допомога у формуванні винних карт для закладів харчування.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2"></span>
                                <span className="text-justify">Виконання індивідуальних замовлень та бронювання лімітованих партій.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0 mt-2"></span>
                                <span className="text-justify">Реалізація нестандартних партнерських спецпроєктів та колаборацій.</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="flex justify-between items-end mb-8 max-w-5xl mx-auto pt-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Почнімо співпрацю</h2>
                        <p className="text-gray-500 mt-2">Зв&apos;яжіться з нами для обговорення умов партнерства зручним способом</p>
                    </div>
                    <Link href="/contact" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap ml-4">
                        Наші контакти →
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}