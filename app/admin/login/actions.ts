'use server'

import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { encrypt } from '@/lib/session'

export type LoginState = {
  error?: string;
  success?: boolean;
} | undefined;

export async function loginAction(prevState: LoginState, formData: FormData) {
  const identifier = formData.get('identifier') as string
  const password = formData.get('password') as string

  if (!identifier || !password) {
    return { error: 'Будь ласка, заповніть всі поля', success: false }
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
      return { error: 'Невірний логін або пароль', success: false }
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { error: 'Невірний логін або пароль', success: false }
    }

    const sessionData = await encrypt({ id: user.id, username: user.username })
    
    // Set cookie
    cookies().set('session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    return { success: true, error: '' }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Login action error:', error.message)
    } else {
      console.error('Login action error:', String(error))
    }
    return { error: 'Сталася помилка при авторизації', success: false }
  }
}
