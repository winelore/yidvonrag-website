'use server'

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { put, del } from '@vercel/blob'

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_xqtNsojIRblvwdXW_ltX0i9Q0dYouL83aEKv9gRZGur2yT1';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

async function processAwardsPayload(formData: FormData) {
  const awardsDataStr = formData.get('awardsData') as string | null;
  if (!awardsDataStr || !awardsDataStr.trim()) return [];

  try {
    const parsedAwards = JSON.parse(awardsDataStr) as Array<{
      id: string;
      title: string;
      year?: string;
      description?: string;
      image?: string;
      presetIcon?: string;
      hasNewFile?: boolean;
    }>;

    const awardsToCreate = [];

    for (const award of parsedAwards) {
      let awardImageUrl: string | undefined = undefined;

      if (award.hasNewFile) {
        const file = formData.get(`awardFile_${award.id}`) as File | null;
        if (file && file.size > 0) {
          if (file.size > MAX_FILE_SIZE) {
            console.error(`Файл бейджа ${file.name} занадто великий.`);
            continue;
          }
          const blob = await put(file.name, file, {
            access: 'public',
            token: BLOB_TOKEN,
            addRandomSuffix: true,
          });
          awardImageUrl = blob.url;
        }
      } else if (award.image) {
        awardImageUrl = award.image;
      } else if (award.presetIcon) {
        awardImageUrl = `preset:${award.presetIcon}`;
      }

      awardsToCreate.push({
        title: award.title,
        year: award.year || null,
        description: award.description || null,
        image: awardImageUrl || null,
      });
    }

    return awardsToCreate;
  } catch (e) {
    console.error("Помилка обробки нагород:", e);
    return null;
  }
}

export async function submitNewWineAction(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const color = formData.get('color') as string
    const sweetness = formData.get('sweetness') as string
    const volume = parseFloat(formData.get('volume') as string) || 0.75;
    const alcohol = formData.get('alcohol') as string
    const grapeVariety = formData.get('grapeVariety') as string
    const price = parseFloat(formData.get('price') as string) || 0;
    const inStock = formData.get('inStock') === 'on'

    const orderStr = formData.get('imageOrder') as string;
    const finalImages: string[] = [];

    // Обробка завантажених фотографій під час створення
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
                }
            }
        } catch (e) {
            console.error("Помилка обробки зображень:", e);
        }
    }

    const awardsToCreate = await processAwardsPayload(formData);

    // Створюємо запис у базі тільки тоді, коли є всі дані
    await prisma.wine.create({
        data: {
            name,
            description,
            color,
            sweetness,
            volume,
            alcohol,
            grapeVariety,
            price,
            inStock,
            images: finalImages,
            awards: (awardsToCreate && awardsToCreate.length > 0) ? { create: awardsToCreate } : undefined
        }
    })

    revalidatePath('/')
    revalidatePath('/admin/wines')
    redirect('/admin/wines')
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
  const price = parseFloat(formData.get('price') as string) || 0;
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
            if (file.size > MAX_FILE_SIZE) {
              return { error: `Файл ${file.name} занадто великий. Максимальний розмір — 5 MB.` };
            }
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
    finalImages = oldWine?.images || [];
  }

  const awardsToCreate = await processAwardsPayload(formData);

  if (awardsToCreate !== null) {
    await prisma.award.deleteMany({ where: { wineId: id } });
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
      price,
      inStock,
      images: finalImages,
      awards: (awardsToCreate && awardsToCreate.length > 0) ? { create: awardsToCreate } : undefined
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

  if (file.size > MAX_FILE_SIZE) {
    return { error: `Файл ${file.name} занадто великий. Максимальний розмір — 5 MB.` };
  }

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

export async function deleteWineAction(id: string) {
    const wine = await prisma.wine.findUnique({ where: { id } });

    // Видаляємо всі прив'язані картинки з Vercel Blob
    if (wine && wine.images && wine.images.length > 0) {
        for (const imageUrl of wine.images) {
            try {
                await del(imageUrl, { token: BLOB_TOKEN });
            } catch (e) {
                console.error("Failed to delete blob during wine deletion", imageUrl, e);
            }
        }
    }

    // Видаляємо запис про вино з БД (відгуки видаляться автоматично через onDelete: Cascade)
    await prisma.wine.delete({
        where: { id }
    });

    // Оновлюємо кеш сторінок
    revalidatePath('/admin/wines');
    revalidatePath('/');

    redirect('/admin/wines');
}