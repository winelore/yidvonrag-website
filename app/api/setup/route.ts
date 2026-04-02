import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const userCount = await prisma.user.count()
    if (userCount > 0) {
      return NextResponse.json({ error: 'Users already exist. Setup is disabled.' }, { status: 403 })
    }

    const hashedPassword = await bcrypt.hash('admin123', 10)

    const user = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
      }
    })

    return NextResponse.json({ message: 'Admin user created successfully', user: { id: user.id, username: user.username } })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Error during setup' }, { status: 500 })
  }
}
