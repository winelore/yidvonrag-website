'use client'

import { useState } from 'react'
import { createReviewAction } from './actions'
import { useFormState } from 'react-dom'

export default function ReviewForm({ wineId }: { wineId: string }) {
    const [state, formAction] = useFormState(createReviewAction, null)
    const [rating, setRating] = useState(5)

    if (state?.success) {
        return (
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                <p className="text-green-800 font-medium">{state.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 text-sm text-green-600 underline"
                >
                    Надіслати ще один
                </button>
            </div>
        )
    }

    return (
        <form action={formAction} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
            <input type="hidden" name="wineId" value={wineId} />
            <input type="hidden" name="rating" value={rating} />

            <h3 className="font-semibold text-lg">Залишити відгук</h3>

            <div>
                <label className="block text-sm font-medium mb-1">Ім&apos;я та Прізвище</label>
                <input name="authorName" required className="w-full border rounded-md p-2" />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Ваша оцінка</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-3xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Коментар</label>
                <textarea name="text" rows={3} className="w-full border rounded-md p-2" />
            </div>

            {state?.success === false && (
                <p className="text-red-500 text-sm">{state.message}</p>
            )}

            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:opacity-90"
            >
                Надіслати відгук
            </button>
        </form>
    )
}