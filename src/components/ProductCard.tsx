import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn("card-product group block", className)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img 
          src={product.mainImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button 
            onClick={handleAddToCart}
            className="p-3 bg-card rounded-full shadow-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <span className="p-3 bg-card rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 delay-75">
            <Eye className="w-5 h-5" />
          </span>
        </div>

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 badge-category capitalize">
          {product.subcategory || product.category.replace('-', ' ')}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="price-tag">${product.price}</span>
          <div className="flex gap-1">
            {product.features.slice(0, 2).map((feature, i) => (
              <span key={i} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                {feature.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
