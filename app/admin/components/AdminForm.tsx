'use client'

import toast from 'react-hot-toast'

export function AdminForm({ 
  action, 
  children, 
  id, 
  className 
}: { 
  action: (formData: FormData) => Promise<any>, 
  children: React.ReactNode,
  id?: string,
  className?: string
}) {
  const handleAction = async (formData: FormData) => {
    try {
      const result = await action(formData)
      if (result && result.error) {
        toast.error(result.error)
      }
    } catch (e: any) {
      // Якщо це помилка редіректу від Next.js - просто прокидаємо її далі
      if (e.message === 'NEXT_REDIRECT') {
        throw e
      }
      console.error('Action error:', e)
      toast.error('Сталася помилка при збереженні')
    }
  }

  return (
    <form id={id} action={handleAction} className={className}>
      {children}
    </form>
  )
}
