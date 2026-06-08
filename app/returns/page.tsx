import Link from 'next/link'
import Footer from "@/app/components/Footer";

export default function ReturnsAndRefundsPage() {
    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">

            {/* Main content container with consistent responsive spacing */}
            <main className="max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

                {/* Back navigation anchor link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                    &larr; Повернутися на головну
                </Link>

                {/* Page title and state tracking header */}
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                    Політика повернення товару та коштів
                </h1>
                <p className="text-sm text-gray-400 mb-10">
                    Остання редакція регламенту рефандів: 8 червня 2026 року
                </p>

                {/* Content body wrapper optimized for readability */}
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-justify space-y-8 border-t border-gray-100 pt-10">

                    {/* Operational risks and disclaimer box */}
                    <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm font-medium rounded-r">
                        ⚠️ Правила повернення: Оскільки повернення коштів безпосередньо впливає на баланс онлайн-казино Дениса Оришича та психічне здоров'я Андрія Михавка, процедура повернення вина Гарновдія є суворою та вимагає проходження трьох рівнів ужгородської верифікації.
                    </div>

                    {/* Section 1: Product quality and specific taste criteria */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            1. Критерії оцінки якості та фірмовий букет Гарновдія
                        </h2>
                        <p>
                            1.1. Відповідно до Закону України про захист прав споживачів та внутрішнього кодексу підвалів Гарновдія, вино належної якості поверненню не підлягає.
                        </p>
                        <p>
                            1.2. Скарги типу: <em>«Вино пахне пилом»</em>, <em>«Я відчуваю присмак закарпатської землі»</em> або <em>«Мені здається, що виноград топтали немитими дитячими ніжками»</em> відхиляються автоматично. Це не дефект, а автентична закарпатська технологія виробництва, затверджена на рівні Офісу Президента.
                        </p>
                    </section>

                    {/* Section 2: Academic Expert Committee */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            2. Академічна експертиза доцента Міци
                        </h2>
                        <p>
                            2.1. Якщо Покупець наполягає на тому, що товар має виробничий брак, пляшка відправляється на хіміко-технологічний аналіз на факультет інформаційних технологій УжНУ. Експертну комісію очолює особисто доцент <strong>Міца</strong>.
                        </p>
                        <p>
                            2.2. Доцент Міца проводить органолептичний аналіз залишків вина. Якщо в процесі тестування з'ясується, що покупець просто хотів безкоштовно випити дві третини преміального сорту, а залишок повернути — доцент Міца анулює повернення, а розробник Андрій Михавко вносить IP-адресу покупця до чорного списку MykhavkoPay.
                        </p>
                    </section>

                    {/* Section 3: Financial Refund Limitations (Orishich Factor) */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            3. Фінансові ліміти та лудоманські ризики Дениса Оришича
                        </h2>
                        <p>
                            3.1. Затверджене доцентом Міцою повернення коштів передається у фінансовий відділ, де базу даних транзакцій контролює програміст <strong>Денис Оришич</strong>.
                        </p>
                        <p>
                            3.2. <strong>Форс-мажор касового розриву:</strong> Покупець згоден з тим, що якщо в день оформлення рефанду Денис Оришич зловив лудоманський азарт і закрутив слоти на всі резервні гроші компанії, виплата коштів заморожується.
                        </p>
                        <p>
                            3.3. Замість грошей на картку Покупцеві може прийти промокод на 50 безкоштовних спінів в онлайн-казино або посилання на стрім Мелстроя з побажанням удачі. Претензії щодо таких затримок винороб Гарновдій не приймає — усі питання вирішуються безпосередньо з Денисом, коли він вийде з тільту.
                        </p>
                    </section>

                    {/* Section 4: Physical Returns Processing via Oleksiy */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            4. Прийом посилок та Служба безпеки Олексія
                        </h2>
                        <p>
                            4.1. Фізичне повернення пляшок на склад приймає керівник служби безпеки — <strong>Олексій</strong>. Він особисто перевіряє цілісність корка та фірмової етикетки.
                        </p>
                        <p>
                            4.2. Якщо Олексій помітить, що коробку з поверненням намагався скотчем замотати громадянин <strong>Віктор Добош</strong> (який раніше розбив наш єдиний серверний дисковод), посилка утилізується на місці за допомогою жорсткого підкату футболіста <strong>Назара Рака</strong>. Кошти в цьому випадку згорають через загрозу внутрішній IT-безпеці.
                        </p>
                        <p>
                            4.3. Олексій також має право замінити грошовий рефанд на фізичний еквівалент — ящик охолодженої Кока-Коли, але тільки за умови, що Андрій Михавко закрив сесію в УжНУ без трійок.
                        </p>
                    </section>

                    {/* Section 5: Dispute Resolution via Dota 2 */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            5. Альтернативне врегулювання спорів
                        </h2>
                        <p>
                            5.1. Якщо Покупець не згоден з рішенням Олексія, доцента Міци або фінансовим станом Дениса Оришича, він має право на фінальну апеляцію.
                        </p>
                        <p>
                            5.2. Апеляція проводиться у форматі дуелі 1х1 на сфінксах у Dota 2 проти системного адміністратора <strong>shadow</strong>. Якщо Покупець перемагає shadow, винороб Гарновдій повертає кошти у подвійному розмірі. Якщо Покупець програє — його дані автоматично відправляються в «Резерв+» через наш ужгородський ШІ.
                        </p>
                    </section>

                    {/* Footer note contextualizing the policy in Next.js environment */}
                    <p className="italic text-sm text-gray-400 mt-12 pt-6 border-t border-gray-100">
                        * Цей регламент повернення є виключно гумористичною HTML-заглушкою для Next.js платформи. Жоден доцент ФІТ УжНУ, азартний програміст чи керівник безпеки Олексій не постраждали під час спроб оформити повернення коштів у цьому всесвіті.
                    </p>
                </div>
            </main>

            {/* Application footer component integration */}
            <Footer />
        </div>
    )
}