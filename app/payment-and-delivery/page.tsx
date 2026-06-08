import Link from 'next/link'
import Footer from "@/app/components/Footer";

export default function PaymentAndDeliveryPage() {
    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">

            {/* Main container for the content with responsive padding */}
            <main className="max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

                {/* Back navigation link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                    &larr; Повернутися на головну
                </Link>

                {/* Page header and revision date */}
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                    Оплата та доставка
                </h1>
                <p className="text-sm text-gray-400 mb-10">
                    Остання редакція логістичного регламенту: 8 червня 2026 року
                </p>

                {/* Typography wrapper for structured content parsing */}
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-justify space-y-8 border-t border-gray-100 pt-10">

                    {/* Infrastructure warning notice banner */}
                    <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm font-medium rounded-r">
                        ⚠️ Увага! Оскільки безконтактний термінал оплати знову погризли пацюки в підвалі Гарновдія, а єдиний платіжний шлюз налаштовував другокурсник Андрій під час пари з дискретної математики, уважно прочитайте правила еквайрингу та доставки нижче.
                    </div>

                    {/* Section 1: Payment Gateways and Infrastructure */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            1. Способи оплати та MykhavkoPay v2.0-beta
                        </h2>
                        <p>
                            1.1. <strong>Оплата онлайн (кредитні картки):</strong> Усі транзакції проходять через платіжний шлюз <em>MykhavkoPay</em>, який крутиться безпосередньо на новенькому MacBook Neo Андрія Михавка. Стабільність транзакцій гарантується особисто Андрієм, поки в його системі циркулює ліцензійна холодна Кока-Кола.
                        </p>
                        <p>
                            1.2. <strong>Форс-мажор &quot;Дотерський зрив&quot;:</strong> Якщо в момент вашої транзакції брат Андрія — <strong>shadow</strong> — програє мід у Dota 2 на сфінксах, база даних платежів може тимчасово заблокуватися. У цьому випадку замість чека на екрані з&apos;явиться велика плашка з жартами про Мелстроя. Продавець Гарновдій просить вибачення за емоційну нестабільність серверної адміністрації.
                        </p>
                        <p>
                            1.3. <strong>Альтернативна валюта:</strong> За попередньою домовленістю з виноробом Гарновдієм, оплата приймається літражем оригінальної Кока-Коли за курсом: 1 літр напою = 10 рядків стабільного коду без багів. Оплата дієтичною колаю (Zero) суворо заборонена, бо від неї у програміста починає сіпатися око і код компілюється із закарпатським акцентом.
                        </p>
                    </section>

                    {/* Section 2: Local Pickup Regulations */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            2. Самовивіз під час матчів Назара Рака
                        </h2>
                        <p>
                            2.1. Найбільш надійний та швидкий спосіб отримати замовлене vino Гарновдія — це забрати його безпосередньо на футбольному полі, де грає однокурсник розробника, закарпатський Мессі — <strong>Назар Рак</strong>.
                        </p>
                        <p>
                            2.2. Пляшки видаються Назаром особисто під час перерви між таймами прямо біля кутового прапорця.
                        </p>
                        <p>
                            2.3. <strong>Умови претензій:</strong> Будь-які скарги щодо наявності осаду у вині чи чистоти ніг дітей, які брудними стопами ретельно пресували цей виноград у глибокому підвалі Гарновдія, під час футбольного матчу не приймаються. Якщо ви спробуєте качати права під стадіоном — Назар Рак має повне право виконати у вас жорсткий підкат для захисту репутації виноробства.
                        </p>
                    </section>

                    {/* Section 3: National Delivery Logistics and Government Integration */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            3. Доставка Новою Поштою та ТЦК-інтеграція
                        </h2>
                        <p>
                            3.1. Ми відправляємо крафтову продукцію по всій Україні Новою Поштою (окрім кабінету Віктора Добоша).
                        </p>
                        <p>
                            3.2. <strong>Особливий автоматичний контроль ТЦК та СП:</strong> Наш інноваційний агро-тех комплекс працює під егідою цифровізації, схваленої особисто Володимиром Зеленським. Якщо ви намагаєтеся замовити вино Гарновдія в Ужгород, приховуючи своє реальне місцеперебування через VPN у Нідерландах чи Монако, штучний інтелект сайту розцінює це як спробу ухилення.
                        </p>
                        <p>
                            3.3. У такому випадку shadow передає вашу реальну IP-адресу та координати у базу даних «Резерв+» зі швидкістю, яка Віктору Добошу і не снилася, коли він ламав наш дисковод. Ваша посилка буде автоматично перенаправлена до найближчого відділення ТЦК та СП.
                        </p>
                    </section>

                    {/* Section 4: Physical Security and Access Control Policy */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            4. Логістична безпека та заборона доступу
                        </h2>
                        <p>
                            4.1. Громадянину <strong>Віктору Добошу</strong> суворо та довічно заборонено наближатися до сформованих замовлень, пакувального скотчу та коробок із вином. Навіть на відстань десяти метрів.
                        </p>
                        <p>
                            4.2. Зважаючи на те, що минулого разу Віктор примудрився вщент розтрощити єдиний серверний <strong>дисковод</strong>, який Андрію довелося реанімувати канцелярським скотчем, ми не ризикуємо цілісністю скляної тари преміального сегменту.
                        </p>
                        <p>
                            4.3. Якщо при отриманні посилки ви помітили на коробці сліди клею або підозрілу фігуру Віктора Добоша з викруткою — негайно телефонуйте shadow або пишіть у наш чат підтримки.
                        </p>
                    </section>

                    {/* Legal disclaimer and component footer note */}
                    <p className="italic text-sm text-gray-400 mt-12 pt-6 border-t border-gray-100">
                        * Цей регламент є частиною канонічного лору УжНУ та E-commerce рішень Next.js. Усі збіги з реальною Кока-Колою, футбольною технікою Назара Рака, розбитим дисководом Віктора Добоша та ТЦК-аналітикою є абсолютно легітимними жартами нашої локальної команди розробки.
                    </p>
                </div>
            </main>

            {/* Global application footer layout */}
            <Footer />
        </div>
    )
}