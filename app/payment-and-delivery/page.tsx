import Link from 'next/link'
import Footer from "@/app/components/Footer";

export default function PaymentAndDeliveryPage() {
    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">

            {/* Main container optimized for clean and compliant legal content */}
            <main className="max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

                {/* Navigation back path */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                    &larr; Повернутися на головну
                </Link>

                {/* Primary document title */}
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                    Оплата та доставка
                </h1>
                <p className="text-sm text-gray-400 mb-10">
                    Умови продажу, оплати та транспортування продукції. Чинна редакція від 8 червня 2026 року.
                </p>

                {/* Layout container for semantic legal text block */}
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-justify space-y-8 border-t border-gray-100 pt-10">

                    {/* Compliant age verification banner */}
                    <div className="p-4 bg-stone-50 border-l-4 border-stone-500 text-stone-900 text-sm font-medium rounded-r">
                        🔞 Згідно із законодавством України, ми не здійснюємо продаж алкогольних напоїв особам, які не досягли 18 років. Оформлюючи замовлення на сайті, ви підтверджуєте свое повноліття.
                    </div>

                    {/* Section 1: Statutory Framework */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            1. Загальні положення
                        </h2>
                        <p>
                            1.1. Цей документ визначає умови та порядок придбання, оплати та доставки товарів у нашому інтернет-магазині.
                        </p>
                        <p>
                            1.2. Всі правовідносини між Продавцем та Покупцем регулюються нормами чинного законодавства України, зокрема Законом України &quot;Про електронну комерцію&quot; та правилами роздрібної торгівлі алкогольними напоями.
                        </p>
                    </section>

                    {/* Section 2: Clear Payment Structures */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            2. Способи оплати
                        </h2>
                        <p>
                            2.1. Розрахунки за замовлення здійснюються виключно в національній валюті України — гривні (UAH).
                        </p>
                        <p>
                            2.2. Розрахунок за замовлення здійснюється у формі 100% передоплати:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Онлайн-оплата на сайті:</strong> Безготівковий розрахунок за допомогою платіжних карток Visa або Mastercard через інтегрований безпечний платіжний шлюз. Відправка замовлення здійснюється після підтвердження транзакції банком-еквайром.
                            </li>
                        </ul>
                        <p>
                            2.3. Разом із товаром покупець отримує фіскальний чек, що підтверджує факт купівлі, відповідно до Закону України &quot;Про застосування РРО&quot;.
                        </p>
                    </section>

                    {/* Section 3: Professional Logistics & ID Check */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            3. Умови доставки та віковий контроль
                        </h2>
                        <p>
                            3.1. Доставка продукції здійснюється по всій території України оператором логістичних послуг &quot;Нова Пошта&quot; (у відділення, поштомати або за вказаною адресою кур&apos;єром), за винятком тимчасово окупованих територій.
                        </p>
                        <p>
                            3.2. <strong>Перевірка документів:</strong> Оскільки товар належить до категорії алкогольних напоїв, представник компанії-перевізника під час видачі посилки має право вимагати документ, що посвідчує особу та підтверджує досягнення 18-річного віку (паспорт, закордонний паспорт або цифровий документ у додатку &quot;Дія&quot;).
                        </p>
                        <p>
                            3.3. Якщо отримувач не може підтвердити свій вік, товар не видається, замовлення анулюється, а кошти (у разі передоплати) повертаються покупцеві за вирахуванням витрат на транспортування.
                        </p>
                    </section>

                    {/* Section 4: Safe Handling and Physical Inspection */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            4. Приймання товару та ризики
                        </h2>
                        <p>
                            4.1. Всі замовлення перед відправкою ретельно пакуються у спеціальні захисні короби для скляної тари та страхуються компанією-перевізником на повну вартість.
                        </p>
                        <p>
                            4.2. Покупець зобов&apos;язаний перевірити цілісність пляшок та відповідність замовлення безпосередньо у відділенні або в присутності кур&apos;єра.
                        </p>
                        <p>
                            4.3. У разі виявлення пошкодження тари чи розливу продукції під час транспортування, покупець має скласть Акт про пошкодження вантажу разом із представником &quot;Нової Пошти&quot;, відмовитися від отримання посилки та повідомити про це нашу службу підтримки для оперативного надсилання заміни.
                        </p>
                    </section>

                    {/* Section 5: Legal Return Framework */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            5. Повернення товару
                        </h2>
                        <p>
                            5.1. Відповідно до Постанови Кабінету Міністрів України № 172 від 19 березня 1994 року (Додаток № 3), продовольчі товари та алкогольні напої належної якості <b>обміну та поверненню не підлягають</b>.
                        </p>

                    </section>

                    {/* Formal document authentication bottom text */}
                    <p className="italic text-sm text-gray-400 mt-12 pt-6 border-t border-gray-100">
                        * Ця сторінка є офіційним інформаційним ресурсом компанії. Оновлення умов публікуються одразу після набрання ними чинності.
                    </p>
                </div>
            </main>

            {/* Injected layout global application footer node */}
            <Footer />
        </div>
    )
}