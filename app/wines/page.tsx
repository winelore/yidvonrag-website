import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = 'force-dynamic'; // Щоб нові вина одразу з'являлися в каталозі

export default async function AllWinesPage() {
    // Отримуємо абсолютно всі вина з бази, сортуємо за алфавітом
    const wines = await prisma.wine.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <main className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)] py-12 px-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Весь каталог вин</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wines.map((w) => (
                    <Link href={`/wines/${w.id}`} key={w.id} className="group relative border border-black/[0.08] rounded-2xl p-4 transition-all hover:shadow-lg flex flex-col">
                        <div className="aspect-square relative mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                            <Image src="https://nextjs.org/icons/file.svg" alt={w.name} width={60} height={60} className="opacity-20" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg">{w.name}</h3>
                            <p className="text-sm text-gray-500">{w.country} • {w.color}</p>
                            <p className="font-bold mt-2 text-blue-600">{w.price} ₴</p>
                        </div>
                        <div className="mt-auto">
                            <AddToCartButton wine={w} />
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}