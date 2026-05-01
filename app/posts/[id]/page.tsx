import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

// Next.js автоматично передає параметри з URL (наш [id]) сюди
export default async function PostPage({ params }: { params: { id: string } }) {
    // Шукаємо пост за його ID
    const post = await prisma.post.findUnique({
        where: {
            id: params.id,
        },
    });

    // Якщо раптом такого поста немає - покажемо сторінку 404
    if (!post) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">
            <main className="max-w-3xl mx-auto px-8 py-16">

                <Link href="/" className="text-blue-600 hover:underline text-sm font-medium mb-8 inline-block">
                    ← Повернутися на головну
                </Link>

                <article>
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <div className="text-sm text-gray-500 mb-10 pb-10 border-b border-black/[0.08]">
                        Опубліковано: {new Date(post.createdAt).toLocaleDateString('uk-UA')}
                    </div>

                    {post.images && post.images.length > 0 && (
                        <div className="mb-10 space-y-4">
                            {post.images.map((img, i) => (
                                <div key={i} className="relative w-full h-80 rounded-2xl overflow-hidden">
                                    <Image src={img} alt={`${post.title} - фото ${i + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </div>
                </article>

            </main>
        </div>
    );
}