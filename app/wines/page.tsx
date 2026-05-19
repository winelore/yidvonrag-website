import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function WinesCatalogPage() {
    const wines = await prisma.wine.findMany({
        where: { inStock: true },
        include: { reviews: { where: { isApproved: true } } },
        orderBy: { name: 'asc' }
    });

    return (
        <main className="max-w-7xl mx-auto px-8 py-16 min-h-screen">
            <h1 className="text-4xl font-bold mb-10">Каталог Вин</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wines.map((wine) => {
                    const avgRating = wine.reviews && wine.reviews.length > 0
                        ? (wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length).toFixed(1)
                        : null;

                    return (
                        <div key={wine.id} className="group border border-black/[0.08] rounded-2xl p-4 transition-all hover:shadow-lg flex flex-col">
                            <Link href={`/wines/${wine.id}`}>
                                <div className="aspect-square relative mb-4 bg-gray-100 rounded-xl overflow-hidden">
                                    {wine.images && wine.images.length > 0 ? (
                                        <Image src={wine.images[0]} alt={wine.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">Немає фото</div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg line-clamp-1">{wine.name}</h3>
                                    {avgRating ? (
                                        <div className="flex items-center gap-1 mt-1 text-sm">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-medium text-gray-700">{avgRating}</span>
                                            <span className="text-gray-400 text-xs">({wine.reviews.length} відгуків)</span>
                                        </div>
                                    ) : (
                                        <div className="mt-1 text-xs text-gray-400">Немає відгуків</div>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">{wine.country} • {wine.color}</p>
                                </div>
                            </Link>
                            <AddToCartButton wine={{ id: wine.id, name: wine.name, price: wine.price }} />
                        </div>
                    );
                })}
            </div>
        </main>
    );
}