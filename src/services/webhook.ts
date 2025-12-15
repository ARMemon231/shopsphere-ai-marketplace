// Webhook service for sending order data to n8n

// Hardcoded webhook URL as backup
const WEBHOOK_URL = 'https://n8n.arverse.site/webhook/e-commerce';

// Log the URL being used
console.log('🔧 Webhook Configuration:');
console.log('   VITE_ORDER_WEBHOOK_URL:', import.meta.env.VITE_ORDER_WEBHOOK_URL);
console.log('   Final WEBHOOK_URL:', WEBHOOK_URL);

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
    console.log('🚀 ============================================');
    console.log('🚀 Attempting to send order to webhook...');
    console.log('📍 Webhook URL:', WEBHOOK_URL);
    console.log('📍 Environment Variable:', import.meta.env.VITE_ORDER_WEBHOOK_URL);
    console.log('📦 Order Data:', JSON.stringify(orderData, null, 2));
    console.log('🚀 ============================================');
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderData),
      mode: 'cors', // Explicitly set CORS mode
    });

    console.log('📡 ============================================');
    console.log('📡 Response received!');
    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    console.log('📡 Response statusText:', response.statusText);
    console.log('📡 ============================================');

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Webhook request failed:', errorText);
      throw new Error(`Webhook request failed with status: ${response.status} - ${errorText}`);
    }

    let result;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }
    
    console.log('✅ ============================================');
    console.log('✅ Webhook SUCCESS!');
    console.log('✅ Webhook response:', result);
    console.log('✅ ============================================');
    
    return true;
  } catch (error) {
    console.error('❌ ============================================');
    console.error('❌ Failed to send order to webhook');
    console.error('❌ Error:', error);
    console.error('❌ Error type:', error instanceof TypeError ? 'TypeError (Network/CORS)' : 'Other Error');
    
    // Log more details about the error
    if (error instanceof TypeError) {
      console.error('🌐 Network error - Possible causes:');
      console.error('   1. CORS is not enabled on the webhook');
      console.error('   2. Webhook URL is not accessible');
      console.error('   3. Network/firewall blocking the request');
    } else if (error instanceof Error) {
      console.error('⚠️ Error message:', error.message);
      console.error('⚠️ Error stack:', error.stack);
    }
    console.error('❌ ============================================');
    
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
  const webhookData = {
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
  
  console.log('📋 Prepared webhook data:', webhookData);
  
  return webhookData;
};
