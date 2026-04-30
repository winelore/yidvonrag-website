'use client'

import { deletePostAction } from '../actions'

export default function DeleteButton({ postId }: { postId: string }) {
    const deleteAction = deletePostAction.bind(null, postId)

    return (
        <button
            formAction={deleteAction}
            formNoValidate
            onClick={(e) => {
                if (!window.confirm('Ви впевнені, що хочете назавжди видалити цей пост?')) {
                    e.preventDefault()
                }
            }}
            className="w-full sm:w-auto rounded-full border border-solid border-red-200 dark:border-red-900/30 transition-colors flex items-center justify-center bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/30 text-sm h-12 px-8 text-red-600 dark:text-red-400 font-medium"
        >
            Видалити пост
        </button>
    )
}