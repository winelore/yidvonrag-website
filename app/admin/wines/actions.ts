'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { put, del } from '@vercel/blob'

const BLOB_TOKEN = 'vercel_blob_rw_xqtNsojIRblvwdXW_ltX0i9Q0dYouL83aEKv9gRZGur2yT1';

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

  const orderStr = formData.get('imageOrder') as string;
  let finalImages: string[] = [];

  // Отримуємо поточний стан вина, щоб мати бекап картинок
  const oldWine = await prisma.wine.findUnique({ where: { id } });

  if (orderStr && orderStr.trim() !== "") {
    try {
      const orderArray = JSON.parse(orderStr) as string[];

      for (const itemId of orderArray) {
        if (itemId.startsWith('newFile_')) {
          const file = formData.get(itemId) as File | null;
          if (file && file.size > 0) {
            const blob = await put(file.name, file, {
              access: 'public',
              token: BLOB_TOKEN,
              addRandomSuffix: true,
            });
            finalImages.push(blob.url);
          }
        } else {
          finalImages.push(itemId);
        }
      }
    } catch (e) {
      console.error("Помилка обробки зображень, залишаємо старі:", e);
      finalImages = oldWine?.images || [];
    }
  } else {
    // Якщо прийшов порожній список, і ми впевнені, що це не видалення всього — 
    // краще залишити старі картинки, щоб вино не «голіло».
    finalImages = oldWine?.images || [];
  }

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

  // Видаляємо з Blob тільки ті файли, які реально видалили з галереї
  if (oldWine && oldWine.images) {
    const deletedImages = oldWine.images.filter((url: string) => !finalImages.includes(url));
    for (const delUrl of deletedImages) {
      try {
        await del(delUrl, { token: BLOB_TOKEN });
      } catch (e) {
        console.error("Failed to delete blob", delUrl, e);
      }
    }
  }

  // Оновлюємо всі потрібні шляхи
  revalidatePath('/')
  revalidatePath('/admin/wines')
  revalidatePath(`/admin/wines/${id}`)

  redirect('/admin/wines')
}

export async function uploadImageAction(wineId: string, formData: FormData) {
  const file = formData.get('file') as File;
  if (!file || !file.type.startsWith('image/')) return;

  const blob = await put(file.name, file, {
    access: 'public',
    token: BLOB_TOKEN,
    addRandomSuffix: true,
  });

  await prisma.wine.update({
    where: { id: wineId },
    data: { images: { push: blob.url } }
  });

  revalidatePath(`/admin/wines/${wineId}`);
  revalidatePath('/');
}

export async function deleteImageAction(wineId: string, imageUrl: string) {
  await del(imageUrl, { token: BLOB_TOKEN });
  const wine = await prisma.wine.findUnique({ where: { id: wineId } });

  if (wine) {
    await prisma.wine.update({
      where: { id: wineId },
      data: { images: wine.images.filter((url: string) => url !== imageUrl) }
    });
  }

  revalidatePath(`/admin/wines/${wineId}`);
  revalidatePath('/');
}