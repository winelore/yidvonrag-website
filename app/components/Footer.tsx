import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 py-12 mt-16 bg-white text-black w-full">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

                {/* Бренд / Інфо */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-xl tracking-tight mb-1">ВМ Штифко</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Ексклюзивні вина власної крафтової виноробні. Традиції, висока якість та унікальний смак у кожній пляшці.
                    </p>
                </div>

                {/* Навігація */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-lg mb-1">Навігація</h3>
                    <Link href="/" className="hover:text-gray-500 transition-colors">Головна</Link>
                    <Link href="/wines" className="hover:text-gray-500 transition-colors">Каталог вин</Link>
                    <Link href="/posts" className="hover:text-gray-500 transition-colors">Останні оновлення (Блог)</Link>
                    <Link href="/about" className="hover:text-gray-500 transition-colors">Про нас</Link>
                </div>

                {/* Для клієнтів */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-lg mb-1">Клієнтам</h3>
                    <Link href="/cart" className="hover:text-gray-500 transition-colors">Кошик</Link>
                    <Link href="/contact" className="hover:text-gray-500 transition-colors">Контактна інформація</Link>
                    <Link href="/cooperation" className="hover:text-gray-500 transition-colors">Співпраця</Link>
                    <Link href="/privacy-policy" className="hover:text-gray-500 transition-colors">Політика конфіденційності</Link>
                    <Link href="/public-offer" className="hover:text-gray-500 transition-colors">Публічна оферта</Link>
                    <Link href="/payment-and-delivery" className="hover:text-gray-500 transition-colors">Оплата і доставка</Link>
                </div>

                {/* Контакти (Текст) */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-semibold text-lg mb-1">Наші контакти</h3>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="hover:text-gray-500 transition-colors">
                        📍 С.Ключарки, вул. Миру, 45
                    </a>
                    <a href="tel:+380503179452" className="hover:text-gray-500 transition-colors">
                        📞 050-317-9452
                    </a>
                    <a href="mailto:vine.shtufko@gmail.com" className="hover:text-gray-500 transition-colors">
                        ✉️ vine.shtufko@gmail.com
                    </a>
                    <div className="flex items-center gap-4 mt-2">
                        <a
                            href="https://www.facebook.com/Shtifko"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1877F2] transition-colors"
                            aria-label="Facebook"
                        >
                            <svg className="w-6 h-6 fill-current text-gray-700 hover:text-[#1877F2]" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/shtufko/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#E1306C] transition-colors"
                            aria-label="Instagram"
                        >
                            <svg className="w-6 h-6 fill-current text-gray-700 hover:text-[#E1306C]" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Копірайт */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} Олександр Гарновдій. Всі права захищені.</p>
            </div>
        </footer>
    );
}