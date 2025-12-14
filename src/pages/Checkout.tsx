import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ChevronRight, CreditCard, Truck, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { sendOrderToWebhook, prepareOrderWebhookData } from '@/services/webhook';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'card' | 'cod';
}

type Currency = 'USD' | 'PKR' | 'BDT' | 'LKR' | 'NPR';

const CURRENCY_CONFIG: Record<string, { code: Currency; symbol: string; rate: number }> = {
  'United States': { code: 'USD', symbol: '$', rate: 1 },
  'Canada': { code: 'USD', symbol: '$', rate: 1 },
  'United Kingdom': { code: 'USD', symbol: '£', rate: 0.79 },
  'Australia': { code: 'USD', symbol: 'A$', rate: 1.55 },
  'Pakistan': { code: 'PKR', symbol: '₨', rate: 280 },
  'Bangladesh': { code: 'BDT', symbol: '৳', rate: 105 },
  'Sri Lanka': { code: 'LKR', symbol: 'Rs', rate: 330 },
  'Nepal': { code: 'NPR', symbol: 'Rs', rate: 132 },
};

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const cartTotal = getCartTotal();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'card',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const currencyConfig = CURRENCY_CONFIG[formData.country] || CURRENCY_CONFIG['United States'];

  const formatPrice = (priceInUSD: number): string => {
    const convertedPrice = priceInUSD * currencyConfig.rate;
    return `${currencyConfig.symbol}${convertedPrice.toFixed(2)}`;
  };

  const shippingUSD = cartTotal >= 50 ? 0 : 9.99;
  const shippingConverted = shippingUSD * currencyConfig.rate;
  const totalUSD = cartTotal + shippingUSD;
  const total = totalUSD * currencyConfig.rate;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order ID
      const orderId = `ShopSphere-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Prepare webhook data
      const webhookData = prepareOrderWebhookData(
        orderId,
        formData,
        items,
        total,
        shippingUSD,
        cartTotal
      );

      // Send to webhook (non-blocking)
      sendOrderToWebhook(webhookData).then((success) => {
        if (success) {
          console.log('Order data successfully sent to webhook');
        } else {
          console.warn('Failed to send order data to webhook, but order was still processed');
        }
      });
      
      // Store order info for confirmation page
      const orderData = {
        orderId,
        items: [...items],
        total,
        shipping: shippingUSD,
        formData,
        orderDate: new Date().toISOString(),
        currency: currencyConfig.code,
      };
      
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart
      clearCart();
      
      // Navigate to confirmation
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Order processing error:', error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/cart" className="text-muted-foreground hover:text-foreground">Cart</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="section-title mb-8">Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="font-display text-xl font-semibold mb-6">Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-styled"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-styled"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-styled"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-styled"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-accent" />
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input-styled"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input-styled"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="input-styled"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="input-styled"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="input-styled"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Nepal">Nepal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent" />
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card' ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-accent"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                      </div>
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                    </label>

                    <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-border hover:border-muted-foreground'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-accent"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when your order arrives</div>
                      </div>
                      <Truck className="w-6 h-6 text-muted-foreground" />
                    </label>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-6 p-4 bg-secondary/50 rounded-lg text-center text-sm text-muted-foreground">
                      <Lock className="w-5 h-5 mx-auto mb-2" />
                      Card payment simulation - no actual payment will be processed
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                  <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
                  
                  {/* Items */}
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <img 
                          src={item.product.mainImage} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.product.name}</p>
                          <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                          <p className="font-medium text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shippingConverted === 0 ? 'text-success' : ''}>
                        {shippingConverted === 0 ? 'FREE' : formatPrice(shippingUSD)}
                      </span>
                    </div>
                    <div className="flex justify-between font-display text-lg font-semibold pt-3 border-t border-border">
                      <span>Total ({currencyConfig.code})</span>
                      <span>{formatPrice(totalUSD)}</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full" 
                    variant="accent"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-pulse">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
