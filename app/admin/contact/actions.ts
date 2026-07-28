'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const DEFAULT_CONTACTS = {
    id: 'default',
    phone: '050-317-9452',
    email: 'vine.shtufko@gmail.com',
    address: 'С.Ключарки, вул. Миру, 45',
    workingHours: 'Пн-Пт: 09:00 - 18:00',
    facebookUrl: 'https://www.facebook.com/Shtifko',
    instagramUrl: 'https://www.instagram.com/shtufko/',
    updatedAt: new Date()
};

export async function getContactSettings() {
    try {
        const settings = await prisma.contactSettings.upsert({
            where: { id: 'default' },
            update: {},
            create: DEFAULT_CONTACTS
        });

        return settings;
    } catch (e) {
        console.warn("Failed to fetch contact settings from DB, using fallback:", e);
        return DEFAULT_CONTACTS;
    }
}

export async function updateContactSettingsAction(formData: FormData) {
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const workingHours = formData.get('workingHours') as string;
    const facebookUrl = formData.get('facebookUrl') as string;
    const instagramUrl = formData.get('instagramUrl') as string;

    await prisma.contactSettings.upsert({
        where: { id: 'default' },
        update: {
            phone,
            email,
            address,
            workingHours,
            facebookUrl,
            instagramUrl
        },
        create: {
            id: 'default',
            phone,
            email,
            address,
            workingHours,
            facebookUrl,
            instagramUrl
        }
    });

    revalidatePath('/contact');
    revalidatePath('/');
    revalidatePath('/admin/contact');

    redirect('/admin');
}
