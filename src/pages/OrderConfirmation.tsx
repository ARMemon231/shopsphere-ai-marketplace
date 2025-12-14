import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/contexts/CartContext';
import { CheckCircle, Package, Mail, Truck, Calendar, ArrowRight } from 'lucide-react';

interface OrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  shipping: number;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    paymentMethod: string;
  };
  orderDate: string;
}

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const orderData = sessionStorage.getItem('lastOrder');
    if (orderData) {
      setOrder(JSON.parse(orderData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!order) {
    return null;
  }

  const subtotal = order.total - order.shipping;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);
  const deliveryDateStr = estimatedDelivery.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const orderDate = new Date(order.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-success">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {/* Order Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border text-center animate-slide-up stagger-1">
              <Package className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-sm text-muted-foreground mb-1">Order Number</div>
              <div className="font-mono font-bold text-sm">{order.orderId}</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center animate-slide-up stagger-2">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-sm text-muted-foreground mb-1">Order Date</div>
              <div className="font-medium text-sm">{orderDate}</div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border text-center animate-slide-up stagger-3">
              <Truck className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-sm text-muted-foreground mb-1">Estimated Delivery</div>
              <div className="font-medium text-sm">{deliveryDateStr}</div>
            </div>
          </div>

          {/* Email Confirmation Banner */}
          <div className="bg-accent/10 rounded-xl p-6 mb-8 flex items-center gap-4 animate-slide-up stagger-4">
            <Mail className="w-10 h-10 text-accent flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Confirmation Email Sent</h3>
              <p className="text-sm text-muted-foreground">
                We've sent a confirmation email to <strong>{order.formData.email}</strong> with your order details.
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-card rounded-xl border border-border overflow-hidden mb-8 animate-slide-up stagger-5">
            {/* Items */}
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img 
                      src={item.product.mainImage} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {item.product.subcategory || item.product.category.replace('-', ' ')}
                      </p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="p-6 border-b border-border bg-secondary/30">
              <div className="space-y-2 max-w-xs ml-auto">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={order.shipping === 0 ? 'text-success' : ''}>
                    {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-display text-xl font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping & Payment Info */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent" />
                  Shipping Address
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{order.formData.firstName} {order.formData.lastName}</p>
                  <p>{order.formData.address}</p>
                  <p>{order.formData.city}, {order.formData.state} {order.formData.zipCode}</p>
                  <p>{order.formData.country}</p>
                  <p>{order.formData.phone}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {order.formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-5">
            <Button asChild size="lg" variant="outline">
              <Link to="/products">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="accent">
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
