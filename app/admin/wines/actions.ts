'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { put, del } from '@vercel/blob'

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

  const file = formData.get('file') as File | null;
  if (file && file.size > 0 && file.name !== 'undefined') {
    await uploadImageAction(id, formData);
  }

  revalidatePath('/admin/wines')
  revalidatePath(`/admin/wines/${id}`)
  redirect('/admin/wines')
}

export async function uploadImageAction(wineId: string, formData: FormData) {
  const file = formData.get('file') as File;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // ТИМЧАСОВИЙ ЛОГ ДЛЯ ПЕРЕВІРКИ (подивись у термінал після натискання кнопки)
  console.log('--- DEBUG ---');
  console.log('Token exists:', !!token);
  if (token) console.log('Token prefix:', token.substring(0, 15));
  console.log('-------------');

  if (!file) throw new Error('Файл не знайдено');
  if (!token) throw new Error('Токен BLOB_READ_WRITE_TOKEN не знайдено у файлі .env');

  if (!file.type.startsWith('image/')) {
    throw new Error('Дозволено завантажувати лише зображення');
  }

  const blob = await put(file.name, file, {
    access: 'public',
    token: token,
    addRandomSuffix: true,
  });

  await prisma.wine.update({
    where: { id: wineId },
    data: {
      images: {
        push: blob.url
      }
    }
  });

  revalidatePath(`/admin/wines/${wineId}`);
  revalidatePath('/admin/wines');
}

export async function deleteImageAction(wineId: string, imageUrl: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  await del(imageUrl, {
    token: token,
  });

  const wine = await prisma.wine.findUnique({
    where: { id: wineId }
  });

  if (wine) {
    await prisma.wine.update({
      where: { id: wineId },
      data: {
        images: wine.images.filter((url: string) => url !== imageUrl)
      }
    });
  }

  revalidatePath(`/admin/wines/${wineId}`);
  revalidatePath('/admin/wines');
}