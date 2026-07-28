import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Новини та статті",
    description: "Останні оновлення нашого блогу",
};

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { id: 'desc' }
    });

    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)] flex flex-col">
            <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 w-full">
                <div className="mb-12 border-b border-black/[0.08] pb-8">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Новини та статті</h1>
                    <p className="text-lg text-gray-500">
                        Дізнавайтесь про останні новини, оновлення, нові надходження та життя нашої виноробні.
                    </p>
                </div>

                <div className="space-y-10">
                    {posts.length > 0 ? (
                        posts.map((p) => (
                            <article key={p.id} className="group">
                                {p.images && p.images.length > 0 && (
                                    <div className="relative w-full h-[400px] mb-6 rounded-2xl overflow-hidden bg-gray-50 border border-black/[0.04]">
                                        <Image
                                            src={p.images[0]}
                                            alt={p.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 768px"
                                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                    <time dateTime={p.createdAt.toISOString()}>
                                        {new Date(p.createdAt).toLocaleDateString('uk-UA', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 text-balance group-hover:text-blue-600 transition-colors">
                                    <Link href={`/posts/${p.id}`}>
                                        {p.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 line-clamp-3 text-justify leading-relaxed">
                                    {p.content}
                                </p>
                                <div className="mt-4">
                                    <Link href={`/posts/${p.id}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                                        Читати повністю <span className="ml-1">→</span>
                                    </Link>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-black/[0.05]">
                            <p className="text-gray-500 text-lg">Наразі немає опублікованих новин.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}