'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createWineAction() {
  const newWine = await prisma.wine.create({
    data: {
      name: "Нове вино",
      description: "",
      color: "",
      sweetness: "",
      volume: 0.75,
      alcohol: "",
      grapeVariety: "",
      country: "",
      inStock: true
    }
  })

  redirect(`/admin/wines/${newWine.id}`)
}

export async function updateWineAction(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const color = formData.get('color') as string
  const sweetness = formData.get('sweetness') as string
  const volumeStr = formData.get('volume') as string
  const volume = parseFloat(volumeStr) || 0;
  const alcohol = formData.get('alcohol') as string
  const grapeVariety = formData.get('grapeVariety') as string
  const country = formData.get('country') as string
  const inStock = formData.get('inStock') === 'on'

  await prisma.wine.update({
    where: { id },
    data: {
      name,
      description,
      color,
      sweetness,
      volume,
      alcohol,
      grapeVariety,
      country,
      inStock
    }
  })

  revalidatePath('/admin/wines')
  revalidatePath(`/admin/wines/${id}`)
  redirect('/admin/wines')
}
