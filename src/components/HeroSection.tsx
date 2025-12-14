import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] bg-gradient-hero overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-16">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-accent" />
              Premium Quality Products
            </div>
            
            <h1 className="section-title leading-tight">
              Elevate Your Style With
              <span className="block text-gradient-gold">Premium Accessories</span>
            </h1>
            
            <p className="section-subtitle">
              Discover our curated collection of luxury watches, premium airbuds, 
              and designer phone cases. Quality meets elegance in every piece.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero">
                <Link to="/products">
                  Shop Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline">
                <Link to="/watches">
                  Explore Watches
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <div className="font-display text-3xl font-bold text-foreground">50K+</div>
                <div className="text-muted-foreground text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-foreground">200+</div>
                <div className="text-muted-foreground text-sm">Premium Products</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-foreground">4.9</div>
                <div className="text-muted-foreground text-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  Rating
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in stagger-2">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop" 
                alt="Premium Watch"
                className="rounded-3xl shadow-2xl animate-float"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -left-4 top-1/4 bg-card p-4 rounded-xl shadow-lg animate-fade-in stagger-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent fill-accent" />
                </div>
                <div>
                  <div className="font-semibold">Premium Quality</div>
                  <div className="text-sm text-muted-foreground">Certified Products</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-4 bottom-1/4 bg-card p-4 rounded-xl shadow-lg animate-fade-in stagger-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">On orders $50+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
