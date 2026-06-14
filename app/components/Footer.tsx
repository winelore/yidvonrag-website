import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-black/[0.08] py-16 mt-20 bg-white text-black w-full">
            <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm">

                {/* Навігація */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-base mb-2">Навігація</h3>
                    <Link href="/" className="text-gray-500 hover:text-black transition-colors">Головна</Link>
                    <Link href="/wines" className="text-gray-500 hover:text-black transition-colors">Каталог вин</Link>
                    <Link href="/posts" className="text-gray-500 hover:text-black transition-colors">Останні оновлення (Блог)</Link>
                    <Link href="/about" className="text-gray-500 hover:text-black transition-colors">Про нас</Link>
                </div>

                {/* Для клієнтів */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-base mb-2">Клієнтам</h3>
                    <Link href="/cart" className="text-gray-500 hover:text-black transition-colors">Кошик</Link>
                    <Link href="/contact" className="text-gray-500 hover:text-black transition-colors">Контактна інформація</Link>
                    <Link href="/privacy-policy" className="hover:text-black transition-colors font-medium">Політика конфіденційності</Link>
                <Link href="/public-offer" className="hover:text-black transition-colors font-medium">Публічна оферта</Link>
                <Link href="/payment-and-delivery" className="hover:text-black transition-colors font-medium">Оплата і доставка</Link>
                </div>

                {/* Контакти (Текст) */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-base mb-2">Наші контакти</h3>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black transition-colors">
                        📍 вул. Виноградна, 1, Ужгород
                    </a>
                    <a href="tel:+380991234567" className="text-gray-500 hover:text-black transition-colors">
                        📞 +38 (099) 123-45-67
                    </a>
                    <a href="mailto:hello@Garnovdi.com" className="text-gray-500 hover:text-black transition-colors">
                        ✉️ hello@Garnovdi.com
                    </a>
                </div>
            </div>

            {/* Копірайт */}
            <div className="max-w-5xl mx-auto px-8 mt-16 pt-8 border-t border-black/[0.04] text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} Олександр Гарновдій. Всі права захищені.</p>
            </div>
        </footer>
    );
}