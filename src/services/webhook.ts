// Webhook service for sending order data to n8n
const WEBHOOK_URL = 'https://n8n.arverse.site/webhook/e-commerce';

interface OrderWebhookData {
  orderId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orderDetails: {
    items: Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      subtotal: number;
    }>;
    subtotal: number;
    shipping: number;
    Total_In_Rs: number;
  };
  paymentMethod: string;
  orderDate: string;
  timestamp: number;
}

/**
 * Send order data to webhook
 * @param orderData - Complete order information
 * @returns Promise<boolean> - Returns true if successful, false otherwise
 */
export const sendOrderToWebhook = async (orderData: OrderWebhookData): Promise<boolean> => {
  try {
    console.log('Sending order to webhook:', orderData);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Webhook response:', result);
    
    return true;
  } catch (error) {
    console.error('Failed to send order to webhook:', error);
    // Don't throw error - we don't want to block order completion if webhook fails
    return false;
  }
};

/**
 * Prepare order data for webhook
 */
export const prepareOrderWebhookData = (
  orderId: string,
  formData: any,
  items: any[],
  total: number,
  shipping: number,
  cartTotal: number
): OrderWebhookData => {
  return {
    orderId,
    customerInfo: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
    },
    shippingAddress: {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    },
    orderDetails: {
      items: items.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      })),
      subtotal: cartTotal,
      shipping: shipping,
      Total_In_Rs: total,
    },
    paymentMethod: formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery',
    orderDate: new Date().toISOString(),
    timestamp: Date.now(),
  };
};
