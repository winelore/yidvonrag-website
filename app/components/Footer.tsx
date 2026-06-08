import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-black/[0.08] py-12 mt-20 text-center text-sm text-gray-500 bg-white text-black w-full">
            <div className="flex justify-center gap-8 mb-6">
                <Link href="/" className="hover:text-black transition-colors font-medium">Головна</Link>
                <Link href="/about" className="hover:text-black transition-colors font-medium">Про нас</Link>
                <Link href="/privacy-policy" className="hover:text-black transition-colors font-medium">Політика конфіденційності</Link>
                <Link href="/public-offer" className="hover:text-black transition-colors font-medium">Публічна оферта</Link>
                <Link href="/payment-and-delivery" className="hover:text-black transition-colors font-medium">Оплата і доставка</Link>
                <Link href="/returns" className="hover:text-black transition-colors font-medium">Повернення</Link>
            </div>

            <div className="mb-6 space-y-2 text-gray-600">
                <p>📍 вул. Виноградна, 1, Ужгород, Закарпатська обл.</p>
                <p>📞 +38 (099) 123-45-67</p>
                <p>✉️ hello@Garnovdi.com</p>
            </div>

            <p>© 2026 Олександр Гарновдій. Всі права захищені.</p>
        </footer>
    );
}