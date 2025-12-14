import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getProductsByCategory } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const Watches = () => {
  const allWatches = getProductsByCategory('watches');
  const menWatches = allWatches.filter(w => w.subcategory === 'men');
  const womenWatches = allWatches.filter(w => w.subcategory === 'women');
  const kidsWatches = allWatches.filter(w => w.subcategory === 'kids');

  const subcategories = [
    { 
      title: "Men's Watches", 
      description: 'Bold designs for the modern gentleman',
      link: '/watches/men',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop'
    },
    { 
      title: "Women's Watches", 
      description: 'Elegant timepieces with feminine grace',
      link: '/watches/women',
      image: 'https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?w=400&h=300&fit=crop'
    },
    { 
      title: "Kids' Watches", 
      description: 'Fun, durable watches for little ones',
      link: '/watches/kids',
      image: 'https://images.unsplash.com/photo-1434056886845-deb1e2e23aef?w=400&h=300&fit=crop'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="section-title mb-4 animate-slide-up">Watches Collection</h1>
          <p className="section-subtitle animate-slide-up stagger-1">
            Discover timepieces that blend precision engineering with timeless style
          </p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">Shop by Style</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subcategories.map((cat, index) => (
              <Link 
                key={cat.title}
                to={cat.link}
                className={`group relative overflow-hidden rounded-xl aspect-[4/3] block animate-slide-up stagger-${index + 1}`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm mb-3">{cat.description}</p>
                  <span className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Watches */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">All Watches</h2>
            <span className="text-muted-foreground">{allWatches.length} products</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allWatches.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Watches;
