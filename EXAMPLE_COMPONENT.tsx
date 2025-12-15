// Example: Enhanced Product Card Component with Google Sheets Data
// This component demonstrates how to use stockQuantity, rating, and color fields

import * as React from 'react';

interface Product {
  name: string;
  mainImage: string;
  price: number;
  stockQuantity?: number;
  rating?: number;
  color?: string;
}

interface EnhancedProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ product }) => {
  // Stock status helper
  const getStockBadge = () => {
    if (product.stockQuantity === undefined) return null;
    
    const badgeClass = "inline-block px-2 py-1 text-xs font-semibold rounded text-white";

    if (product.stockQuantity === 0) {
      return <span className={`${badgeClass} bg-red-500`}>Out of Stock</span>;
    }
    if (product.stockQuantity < 10) {
      return <span className={`${badgeClass} bg-orange-500`}>Only {product.stockQuantity} left!</span>;
    }
    return <span className={`${badgeClass} bg-green-500`}>In Stock</span>;
  };

  // Render rating stars
  const renderStars = () => {
    if (product.rating === undefined) return null;
    
    // Clamp rating to 0-5 to prevent runtime errors with repeat()
    const safeRating = Math.max(0, Math.min(5, product.rating));
    const fullStars = Math.floor(safeRating);
    const emptyStars = 5 - fullStars;

    return (
      <div className="flex items-center gap-1" aria-label={`Rating: ${safeRating} out of 5`}>
        <span className="text-yellow-500" aria-hidden="true">{'★'.repeat(fullStars)}</span>
        <span className="text-gray-300" aria-hidden="true">{'★'.repeat(emptyStars)}</span>
        <span className="text-sm ml-1">{safeRating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="product-card border rounded-lg p-4 shadow">
      {/* Product Image */}
      <img 
        src={product.mainImage} 
        alt={product.name} 
        className="w-full h-48 object-cover object-center rounded bg-gray-100" 
        loading="lazy"
      />
      
      {/* Stock Badge */}
      <div className="mt-2">{getStockBadge()}</div>
      
      {/* Product Name */}
      <h3 className="font-bold text-lg mt-2">{product.name}</h3>
      
      {/* Rating */}
      <div className="mt-1">{renderStars()}</div>
      
      {/* Color */}
      {product.color && (
        <p className="text-sm text-gray-600 mt-1">
          Color: <span className="font-semibold">{product.color}</span>
        </p>
      )}
      
      {/* Price */}
      <p className="text-2xl font-bold mt-2">{formatPrice(product.price)}</p>
      
      {/* Stock Quantity */}
      {product.stockQuantity !== undefined && product.stockQuantity > 0 && (
        <p className="text-sm text-gray-500">
          {product.stockQuantity} in stock
        </p>
      )}
    </div>
  );
};

export default EnhancedProductCard;
