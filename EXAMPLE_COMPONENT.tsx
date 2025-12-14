// Example: Enhanced Product Card Component with Google Sheets Data
// This component demonstrates how to use stockQuantity, rating, and color fields

import React from 'react';
import { Product } from '@/data/products';

interface EnhancedProductCardProps {
  product: Product;
}

export const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ product }) => {
  // Stock status helper
  const getStockBadge = () => {
    if (!product.stockQuantity) return null;
    
    if (product.stockQuantity === 0) {
      return <span className="badge bg-red-500">Out of Stock</span>;
    }
    if (product.stockQuantity < 10) {
      return <span className="badge bg-orange-500">Only {product.stockQuantity} left!</span>;
    }
    return <span className="badge bg-green-500">In Stock</span>;
  };

  // Render rating stars
  const renderStars = () => {
    if (!product.rating) return null;
    
    return (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}</span>
        <span className="text-gray-300">{'★'.repeat(5 - Math.floor(product.rating))}</span>
        <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="product-card border rounded-lg p-4 shadow">
      {/* Product Image */}
      <img src={product.mainImage} alt={product.name} className="w-full h-48 object-cover rounded" />
      
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
      <p className="text-2xl font-bold mt-2">${product.price}</p>
      
      {/* Stock Quantity */}
      {product.stockQuantity !== undefined && (
        <p className="text-sm text-gray-500">
          {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
        </p>
      )}
    </div>
  );
};

export default EnhancedProductCard;
