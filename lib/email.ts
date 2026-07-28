import { Resend } from 'resend';
import prisma from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to get the target admin email
async function getAdminEmail(): Promise<string> {
    if (process.env.ADMIN_NOTIFICATION_EMAIL) {
        return process.env.ADMIN_NOTIFICATION_EMAIL;
    }
    try {
        const settings = await prisma.contactSettings.findUnique({
            where: { id: 'default' }
        });
        if (settings?.email) {
            return settings.email;
        }
    } catch (err) {
        console.error('Failed to fetch admin email from DB, fallback used:', err);
    }
    return 'likespro.official@gmail.com';
}

/**
 * Sends a generic notification email to the administrator.
 */
export async function sendAdminNotification({ subject, html }: { subject: string; html: string }) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('[Email] RESEND_API_KEY is not set. Skipping email dispatch.');
        return;
    }

    try {
        const toEmail = await getAdminEmail();
        // Default sender for Resend on unverified custom domains is onboarding@resend.dev
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Штуфко Виноробня <onboarding@resend.dev>';

        const response = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            subject: subject,
            html: html,
        });

        if (response.error) {
            console.error('[Email] Failed to send email via Resend:', response.error);
        } else {
            console.log('[Email] Admin notification email sent successfully:', response.data?.id);
        }
    } catch (error) {
        console.error('[Email] Error sending admin notification:', error);
    }
}

/**
 * Sends an email notification to admin when a new wine review is submitted.
 */
export async function sendAdminReviewNotification({
    wineName,
    authorName,
    rating,
    text,
}: {
    wineName: string;
    authorName: string;
    rating: number;
    text?: string | null;
}) {
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #4a154b; margin-top: 0;">💬 Новий відгук на сайті</h2>
            <p><strong>Вино:</strong> ${wineName}</p>
            <p><strong>Автор:</strong> ${authorName}</p>
            <p><strong>Оцінка:</strong> <span style="color: #f59e0b; font-size: 18px;">${stars} (${rating}/5)</span></p>
            ${text ? `<p><strong>Текст відгуку:</strong></p><blockquote style="background: #f9f9f9; padding: 12px; border-left: 4px solid #4a154b; margin: 0;">${text}</blockquote>` : '<p><em>Без текстового коментаря</em></p>'}
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">Цей відгук очікує на модерацію в <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/reviews">адмін-панелі</a>.</p>
        </div>
    `;

    await sendAdminNotification({
        subject: `[Штуфко] Новий відгук від ${authorName} на "${wineName}"`,
        html,
    });
}

/**
 * Sends an email notification to admin when a new order is paid or created.
 */
export async function sendAdminOrderNotification({
    orderId,
    amount,
    customerName,
    customerSurname,
    customerPhone,
    customerCity,
    customerBranch,
    items,
    status = 'ОПЛАЧЕНО'
}: {
    orderId: string;
    amount: number;
    customerName?: string | null;
    customerSurname?: string | null;
    customerPhone?: string | null;
    customerCity?: string | null;
    customerBranch?: string | null;
    items: Array<{ name: string; quantity: number; price: number }>;
    status?: string;
}) {
    const fullName = [customerName, customerSurname].filter(Boolean).join(' ') || 'Не вказано';
    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity} шт</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${item.price * item.quantity} грн</td>
        </tr>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #2b6cb0; margin-top: 0;">🛒 Нове замовлення (${status})</h2>
            <p><strong>ID замовлення:</strong> #${orderId}</p>
            <p><strong>Сума:</strong> <strong style="font-size: 18px; color: #2e7d32;">${amount} грн</strong></p>
            
            <h3 style="border-bottom: 2px solid #eee; padding-bottom: 6px;">Клієнт та доставка</h3>
            <p><strong>Покупець:</strong> ${fullName}</p>
            <p><strong>Телефон:</strong> ${customerPhone || 'Не вказано'}</p>
            <p><strong>Місто:</strong> ${customerCity || 'Не вказано'}</p>
            <p><strong>Відділення НП:</strong> ${customerBranch || 'Не вказано'}</p>

            <h3 style="border-bottom: 2px solid #eee; padding-bottom: 6px; margin-top: 20px;">Товари у замовленні</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f7fafc; text-align: left;">
                        <th style="padding: 8px;">Товар</th>
                        <th style="padding: 8px; text-align: center;">К-сть</th>
                        <th style="padding: 8px; text-align: right;">Сума</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">Переглянути замовлення можна в <a href="${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/orders">адмін-панелі</a>.</p>
        </div>
    `;

    await sendAdminNotification({
        subject: `[Штуфко] 🎉 Нове замовлення #${orderId.substring(0, 8)} (${amount} грн)`,
        html,
    });
}
