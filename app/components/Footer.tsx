import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-black/[0.08] py-12 mt-20 text-center text-sm text-gray-500 bg-white text-black w-full">
            <div className="flex justify-center gap-8 mb-6">
                <Link href="/" className="hover:text-black transition-colors font-medium">Головна</Link>
                <Link href="/about" className="hover:text-black transition-colors font-medium">Про нас</Link>
            </div>

            <div className="mb-6 space-y-2 text-gray-600">
                <p>📍 вул. Виноградна, 1, Ужгород, Закарпатська обл.</p>
                <p>📞 +38 (099) 123-45-67</p>
                <p>✉️ hello@yidvonrag.com</p>
            </div>

            <p>© 2026 yidvonrag-website. Всі права захищені.</p>
        </footer>
    );
}