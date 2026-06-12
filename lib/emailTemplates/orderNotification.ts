type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type OrderData = {
  id: string;
  customerName: string;
  customerEmail?: string | null;
  total: number;
  items: OrderItem[];
  createdAt?: string;
};

export function renderOrderNotification(order: OrderData) {
  const itemsRows = order.items
    .map(
      (it) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(it.name)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${it.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${it.price.toFixed(2)}</td>
        </tr>`
    )
    .join('');

  return `
  <html>
    <body style="font-family:Arial,Helvetica,sans-serif;color:#111">
      <div style="max-width:680px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:6px">Нове замовлення — #${escapeHtml(order.id)}</h2>
        <p style="color:#555;margin-top:0">Клієнт: <strong>${escapeHtml(order.customerName)}</strong>${
          order.customerEmail ? ` — <a href="mailto:${escapeHtml(order.customerEmail)}">${escapeHtml(order.customerEmail)}</a>` : ''
        }</p>
        <table style="width:100%;border-collapse:collapse;margin-top:18px">
          <thead>
            <tr>
              <th style="text-align:left;padding:8px;border-bottom:2px solid #ddd">Товар</th>
              <th style="text-align:center;padding:8px;border-bottom:2px solid #ddd">К-сть</th>
              <th style="text-align:right;padding:8px;border-bottom:2px solid #ddd">Ціна</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:12px;border-top:2px solid #ddd;text-align:right"><strong>Разом:</strong></td>
              <td style="padding:12px;border-top:2px solid #ddd;text-align:right"><strong>$${order.total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>

        <p style="color:#666;margin-top:18px;font-size:13px">Замовлення створено: ${order.createdAt ?? new Date().toISOString()}</p>

        <hr style="border:none;border-top:1px solid #f0f0f0;margin:22px 0" />
        <p style="font-size:13px;color:#888">Це автоматичне повідомлення — відповідь на нього не читається.</p>
      </div>
    </body>
  </html>
  `;
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default renderOrderNotification;
