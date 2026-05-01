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

  const token = 'vercel_blob_rw_xqtNsojIRblvwdXW_ltX0i9Q0dYouL83aEKv9gRZGur2yT1';

  const orderStr = formData.get('imageOrder') as string;
  const finalImages: string[] = [];
  
  if (orderStr) {
     const orderArray = JSON.parse(orderStr) as string[];
     
     for (const itemId of orderArray) {
        if (itemId.startsWith('newFile_')) {
           const file = formData.get(itemId) as File | null;
           if (file && file.size > 0) {
              const blob = await put(file.name, file, {
                 access: 'public',
                 token: token,
                 addRandomSuffix: true,
              });
              finalImages.push(blob.url);
           }
        } else {
           finalImages.push(itemId);
        }
     }
  }

  const oldWine = await prisma.wine.findUnique({ where: { id } });

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
      inStock,
      images: finalImages
    }
  })

  if (oldWine && oldWine.images) {
     const deletedImages = oldWine.images.filter((url: string) => !finalImages.includes(url));
     for (const delUrl of deletedImages) {
        try {
           await del(delUrl, { token });
        } catch (e) {
           console.error("Failed to delete blob", delUrl, e);
        }
     }
  }

  revalidatePath('/admin/wines')
  revalidatePath(`/admin/wines/${id}`)
  redirect('/admin/wines')
}

export async function uploadImageAction(wineId: string, formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) throw new Error('Файл не знайдено');

  if (!file.type.startsWith('image/')) {
    throw new Error('Дозволено завантажувати лише зображення');
  }

  const blob = await put(file.name, file, {
    access: 'public',
    token: 'vercel_blob_rw_xqtNsojIRblvwdXW_ltX0i9Q0dYouL83aEKv9gRZGur2yT1',
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
  await del(imageUrl, {
    token: 'vercel_blob_rw_xqtNsojIRblvwdXW_ltX0i9Q0dYouL83aEKv9gRZGur2yT1'
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