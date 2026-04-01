'use server'

import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { encrypt } from '@/lib/session'

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = formData.get('identifier') as string
  const password = formData.get('password') as string

  if (!identifier || !password) {
    return { error: 'Будь ласка, заповніть всі поля' }
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier },
        ]
      }
    })

    if (!user) {
      return { error: 'Невірний логін або пароль' }
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { error: 'Невірний логін або пароль' }
    }

    const sessionData = await encrypt({ id: user.id, username: user.username })
    
    // Set cookie
    cookies().set('session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.error('Login action error:', error)
    return { error: 'Сталася помилка при авторизації' }
  }
}
