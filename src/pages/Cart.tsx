import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();
  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const shippingThreshold = 50;
  const freeShipping = cartTotal >= shippingThreshold;
  const shipping = freeShipping ? 0 : 9.99;
  const total = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg">
              <Link to="/products">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="bg-secondary/30 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="section-title mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{cartCount} items in your cart</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-card rounded-xl p-4 md:p-6 border border-border flex flex-col sm:flex-row gap-4 animate-fade-in"
                >
                  {/* Product Image */}
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img 
                      src={item.product.mainImage} 
                      alt={item.product.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link 
                        to={`/product/${item.product.id}`}
                        className="font-display text-lg font-semibold hover:text-accent transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-muted-foreground text-sm mt-1">{item.product.description}</p>
                      <span className="badge-category mt-2 capitalize">
                        {item.product.subcategory || item.product.category.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg w-fit">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="price-tag">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={`font-medium ${freeShipping ? 'text-success' : ''}`}>
                      {freeShipping ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {!freeShipping && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(shippingThreshold - cartTotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-display text-lg font-semibold">Total</span>
                    <span className="font-display text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full" variant="accent">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>

                <div className="mt-6 text-center">
                  <Link to="/products" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
