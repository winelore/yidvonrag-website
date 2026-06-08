import Link from 'next/link'
import Footer from "@/app/components/Footer";

export default function AntiFraudAndAuditPage() {
    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">

            {/* Core container for layout constraints and text spacing */}
            <main className="max-w-4xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

                {/* Backwards navigation controller */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                    &larr; Повернутися на головну
                </Link>

                {/* Main document header */}
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
                    Про оплату і доставку
                </h1>
                <p className="text-sm text-gray-400 mb-10">
                    Остання редакція регламенту: 8 червня 2026 року
                </p>

                {/* Typography layer for rendering legal and text specifications */}
                <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-justify space-y-8 border-t border-gray-100 pt-10">

                    {/* Operational system status message banner */}
                    <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-sm font-medium rounded-r">
                        ⚠️ Увага користувачам! У зв'язку з раптовою академічною перевіркою з боку керівництва ФІТ УжНУ та підозрілими коливаннями у фінансовому модулі, цей документ регулює відносини між розробниками, кафедрою та третіми (дуже азартними) особами.
                    </div>

                    {/* Section 1: Academic Oversight and Code Reviews */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            1. Академічний нагляд та техконтроль доцента Міци
                        </h2>
                        <p>
                            1.1. Весь вихідний код платформи, написаний Андрієм Михавком на його MacBook Neo, проходить щотижневий суворий аудит, який очолює особисто <strong>Міца</strong> — доцент факультету інформаційних технологій УжНУ.
                        </p>
                        <p>
                            1.2. Якщо доцент Міца знаходить у коді Михавка "милиці", неоптимізовані запити або сліди закарпатського акценту, Андрій позбавляється тижневого пайка Кока-Коли, а швидкість рендерингу сторінок примусово знижується до рівня процесорів Пентіум 2004 року.
                        </p>
                        <p>
                            1.3. Будь-які скарги користувачів на інтерфейс автоматично перенаправляються на розгляд доценту як курсова робота Михавка з темою «Деструктивний вплив багів на нервову систему замовника Гарновдія».
                        </p>
                    </section>

                    {/* Section 2: High-Risk Financial Accounts and Gambling Safeguards */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            2. Спеціальний статус розробника-лудомана Дениса Оришича
                        </h2>
                        <p>
                            2.1. До розробки архітектури бази даних нашої платформи було залучено талановитого, але вкрай азартного програміста <strong>Дениса Оришича</strong>. У зв'язку з цим, у системі діє автоматичний алгоритм "Анти-Лудоман".
                        </p>
                        <p>
                            2.2. Користувачі попереджені, що 5% від кожної транзакції за купівлю вина Гарновдія система автоматично намагається приховати в зашифрований стек, щоб Денис Оришич не програв їх на слотах чи ставках на кіберспорт під час нічного дебажінгу.
                        </p>
                        <p>
                            2.3. Якщо Денис Оришич ловить "лудоманський тільт", на сайті замість кошика замовлень може випадково відкритися симулятор рулетки або демо-версія гральних автоматів. У разі виникнення такого бага, негайно повідомте shadow для примусового перезавантаження сервера.
                        </p>
                    </section>

                    {/* Section 3: Physical Operations and Internal Audit Core */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            3. Служба внутрішньої безпеки та Олексій
                        </h2>
                        <p>
                            3.1. За повну фізичну безпеку серверів, бочок із вином та координацію дій між розробниками відповідає керівник безпеки — <strong>Олексій</strong>.
                        </p>
                        <p>
                            3.2. Олексій здійснює цілодобовий моніторинг активності Дениса Оришича. Якщо Олексій фіксує, що Денис відкрив вкладку з онлайн-казино під час робочої сесії, він має право застосувати до розробника санкції фізично-виховного характеру, узгоджені з кафедрою ФІТ.
                        </p>
                        <p>
                            3.3. Також Олексій забезпечує логістичний кордон підвалу Гарновдія. Будь-які спроби несанкціонованого проникнення на об'єкт автоматично маркуються Олексієм як критична загроза.
                        </p>
                    </section>

                    {/* Section 4: Mitigation of Threat Vectors (Dobosh Protocol) */}
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-black tracking-tight">
                            4. Координація дій під час атаки типу «Віктор Добош»
                        </h2>
                        <p>
                            4.1. У разі виявлення Віктора Добоша в радіусі 15 метрів від MacBook Neo Андрія або серверної стійки, Олексій миттєво віддає наказ футболісту Назару Раку на виконання тактичного підкату ззаду.
                        </p>
                        <p>
                            4.2. Якщо Віктору Добошу все ж вдається прорвати оборону Олексія та Назара Рака й зламати щось за допомогою викрутки, доцент Міца автоматично ставить Добошу незадовільну оцінку за дисципліну «Архітектура ЕОМ», а shadow викликає його на дуель у Dota 2 без права на помилку.
                        </p>
                    </section>

                    {/* Document footer contextualized inside the local university ecosystem */}
                    <p className="italic text-sm text-gray-400 mt-12 pt-6 border-t border-gray-100">
                        * Цей документ є офіційним додатком до статуту ФІТ УжНУ. Усі збіги з доцентом Міцою, лудоманськими кризами Дениса Оришича, залізною дисципліною Олексія та скотчем на дисководі є інтелектуальною власністю нашого закарпатського E-commerce всесвіту.
                    </p>
                </div>
            </main>

            {/* Global application layout footer inclusion */}
            <Footer />
        </div>
    )
}