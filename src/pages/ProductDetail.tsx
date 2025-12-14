import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ChevronRight, Minus, Plus, Check, Truck, Shield, RefreshCw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const relatedProducts = product ? getRelatedProducts(product, 6) : [];
  const { addToCart } = useCart();
  
  // Create a unique images array with mainImage first, then other images
  const displayImages = product ? [
    product.mainImage,
    ...product.images.filter(img => img !== product.mainImage)
  ] : [];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now());
  const productSectionRef = useRef<HTMLDivElement>(null);

  // Scroll to product section when product changes
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (productSectionRef.current) {
        productSectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
    
    // Reset states when product changes
    setSelectedImage(0);
    setQuantity(1);
    setAddedToCart(false);
    setImageKey(Date.now()); // Force image refresh
    
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="section-title mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const categoryPath = product.category === 'phone-cases' ? '/phone-cases' : `/${product.category}`;
  const categoryName = product.category === 'phone-cases' ? 'Phone Cases' : 
                       product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to={categoryPath} className="text-muted-foreground hover:text-foreground">{categoryName}</Link>
            {product.subcategory && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <Link to={`${categoryPath}/${product.subcategory}`} className="text-muted-foreground hover:text-foreground capitalize">
                  {product.subcategory}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section ref={productSectionRef} className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div key={`gallery-${product.id}-${imageKey}`} className="space-y-4 animate-fade-in">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img 
                  src={displayImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {displayImages.map((image, index) => (
                  <button
                    key={`thumb-${product.id}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-accent' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div key={`info-${product.id}`} className="space-y-6 animate-slide-up">
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="badge-category capitalize">
                  {product.subcategory || product.category.replace('-', ' ')}
                </span>
                {product.inStock ? (
                  <span className="text-success text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" /> In Stock
                  </span>
                ) : (
                  <span className="text-destructive text-sm font-medium">Out of Stock</span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-lg">{product.description}</p>
              </div>

              <div className="price-tag text-3xl">${product.price}</div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[60px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <Button 
                  variant={addedToCart ? "accent" : "default"}
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-xs text-muted-foreground">Free Shipping</div>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-xs text-muted-foreground">2 Year Warranty</div>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-xs text-muted-foreground">30 Day Returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-8 md:py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Overview */}
            <div className="bg-card rounded-xl p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold mb-4">Product Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* How to Use */}
            <div className="bg-card rounded-xl p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold mb-4">How to Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.howToUse}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
