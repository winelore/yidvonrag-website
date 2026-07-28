import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";
import InCartBadge from "@/app/components/InCartBadge";
import { BeverageBadgePill } from "@/app/components/BeverageAwards";

export const dynamic = "force-dynamic";

export default async function WinesCatalogPage() {
    const wines = await prisma.wine.findMany({
        where: { inStock: true },
        include: {
            reviews: { where: { isApproved: true } },
            awards: { orderBy: { createdAt: 'asc' } }
        },
        orderBy: { name: 'asc' }
    });

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 sm:pt-48 md:pt-40 pb-16 min-h-screen">
            <h1 className="text-4xl font-bold mb-10 text-gray-900 flex items-center gap-3">
                <span className="w-2 h-9 bg-gradient-to-b from-bordeaux-700 to-bordeaux-900 rounded-full inline-block"></span>
                Каталог Вин
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wines.map((wine) => {
                    const avgRating = wine.reviews && wine.reviews.length > 0
                        ? (wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length).toFixed(1)
                        : null;

                    return (
                        <div key={wine.id} className="group border border-gray-200/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-bordeaux-300/70 hover:shadow-bordeaux-900/5 flex flex-col bg-white relative">
                            <InCartBadge wineId={wine.id} />
                            <Link href={`/wines/${wine.id}`} className="flex flex-col flex-grow">
                                <div className="w-full aspect-square relative bg-gray-100 overflow-hidden">
                                    {wine.images && wine.images.length > 0 ? (
                                        <Image src={wine.images[0]} alt={wine.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">Немає фото</div>
                                    )}
                                </div>
                                <div className="flex-grow px-4 pt-4 pb-2">
                                    {wine.awards && wine.awards.length > 0 && (
                                        <div className="mb-2">
                                            <BeverageBadgePill awards={wine.awards} />
                                        </div>
                                    )}
                                    <h3 className="font-semibold text-lg text-black group-hover:text-bordeaux-800 transition-colors line-clamp-1">{wine.name}</h3>
                                    {avgRating ? (
                                        <div className="flex items-center gap-1 mt-1 text-sm">
                                            <span className="text-yellow-500">★</span>
                                            <span className="font-medium text-gray-700">{avgRating}</span>
                                            <span className="text-gray-400 text-xs">({wine.reviews.length} відгуків)</span>
                                        </div>
                                    ) : (
                                        <div className="mt-1 text-xs text-gray-400">Немає відгуків</div>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">{wine.color} • {wine.sweetness}</p>
                                </div>
                            </Link>
                            <div className="px-4 pb-4 pt-2 flex flex-col justify-between gap-3 border-t border-gray-50">
                                <div className="font-bold text-lg text-gray-900">{wine.price} ₴</div>
                                <AddToCartButton wine={{ id: wine.id, name: wine.name, price: wine.price }} variant="card" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}