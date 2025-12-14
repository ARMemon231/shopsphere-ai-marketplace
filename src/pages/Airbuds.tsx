import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';

const Airbuds = () => {
  const products = getProductsByCategory('airbuds');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="section-title mb-4 animate-slide-up">Airbuds Collection</h1>
          <p className="section-subtitle animate-slide-up stagger-1">
            Experience premium sound quality with our wireless earbuds. Crystal clear audio meets unmatched comfort.
          </p>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-8 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="font-display text-2xl font-bold text-accent">40hr</div>
              <div className="text-sm text-muted-foreground">Battery Life</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-accent">IPX5</div>
              <div className="text-sm text-muted-foreground">Water Resistant</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-accent">ANC</div>
              <div className="text-sm text-muted-foreground">Noise Cancellation</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-accent">Bluetooth 5.3</div>
              <div className="text-sm text-muted-foreground">Connectivity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">All Airbuds</h2>
            <span className="text-muted-foreground">{products.length} products</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Airbuds;
