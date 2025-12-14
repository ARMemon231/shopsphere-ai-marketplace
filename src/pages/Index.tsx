import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { ArrowRight, Truck, Shield, Headphones, RefreshCw } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-slide-up">
            <h2 className="section-title mb-4">Shop by Category</h2>
            <p className="section-subtitle mx-auto">
              Explore our premium collection of accessories designed for the modern lifestyle
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <CategoryCard 
              title="Watches"
              description="Timeless elegance for every occasion. From classic to contemporary designs."
              image="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop"
              link="/watches"
              className="animate-slide-up stagger-1"
            />
            <CategoryCard 
              title="Airbuds"
              description="Premium sound quality meets wireless freedom. Experience audio perfection."
              image="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=800&fit=crop"
              link="/airbuds"
              className="animate-slide-up stagger-2"
            />
            <CategoryCard 
              title="Phone Cases"
              description="Protection meets style. Designer cases for every personality."
              image="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=800&fit=crop"
              link="/phone-cases"
              className="animate-slide-up stagger-3"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="section-title mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked favorites from our collection</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
                className={`animate-slide-up stagger-${(index % 4) + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
            ].map((feature, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-lg transition-all duration-300 animate-slide-up stagger-${index + 1}`}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Join the ShopSphere Family
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order plus exclusive access to new arrivals and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
            />
            <Button variant="gold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
