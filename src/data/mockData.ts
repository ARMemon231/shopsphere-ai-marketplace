// Mock data mapping for Product fields: stockQuantity, rating, color
// This data matches the products_data.csv file

export const productMockData = {
  // Men's Watches
  'watch-men-1': { stockQuantity: 45, rating: 4.8, color: 'Silver' },
  'watch-men-2': { stockQuantity: 32, rating: 4.9, color: 'Black' },
  'watch-men-3': { stockQuantity: 58, rating: 4.7, color: 'Blue' },
  'watch-men-4': { stockQuantity: 67, rating: 4.6, color: 'Brown' },
  'watch-men-5': { stockQuantity: 41, rating: 4.8, color: 'Red' },
  'watch-men-6': { stockQuantity: 23, rating: 4.9, color: 'Gold' },
  'watch-men-7': { stockQuantity: 38, rating: 4.7, color: 'Silver' },
  
  // Women's Watches
  'watch-women-1': { stockQuantity: 52, rating: 4.9, color: 'Rose Gold' },
  'watch-women-2': { stockQuantity: 44, rating: 4.8, color: 'White' },
  'watch-women-3': { stockQuantity: 18, rating: 5.0, color: 'Silver' },
  'watch-women-4': { stockQuantity: 35, rating: 4.7, color: 'Pearl' },
  'watch-women-5': { stockQuantity: 61, rating: 4.6, color: 'Rose Gold' },
  'watch-women-6': { stockQuantity: 29, rating: 4.8, color: 'Gold' },
  'watch-women-7': { stockQuantity: 48, rating: 4.7, color: 'Silver' },
  
  // Kids' Watches
  'watch-kids-1': { stockQuantity: 89, rating: 4.5, color: 'Multicolor' },
  'watch-kids-2': { stockQuantity: 76, rating: 4.6, color: 'Blue' },
  'watch-kids-3': { stockQuantity: 95, rating: 4.7, color: 'Rainbow' },
  'watch-kids-4': { stockQuantity: 82, rating: 4.6, color: 'Green' },
  'watch-kids-5': { stockQuantity: 71, rating: 4.8, color: 'Blue' },
  'watch-kids-6': { stockQuantity: 84, rating: 4.5, color: 'Black' },
  
  // Airbuds
  'airbuds-1': { stockQuantity: 124, rating: 4.7, color: 'White' },
  'airbuds-2': { stockQuantity: 98, rating: 4.8, color: 'Black' },
  'airbuds-3': { stockQuantity: 67, rating: 4.9, color: 'Silver' },
  'airbuds-4': { stockQuantity: 112, rating: 4.6, color: 'White' },
  'airbuds-5': { stockQuantity: 0, rating: 4.5, color: 'Black' },
  'airbuds-6': { stockQuantity: 45, rating: 4.9, color: 'Pearl White' },
  'airbuds-7': { stockQuantity: 87, rating: 4.7, color: 'Red' },
  'airbuds-8': { stockQuantity: 94, rating: 4.6, color: 'Blue' },
  'airbuds-9': { stockQuantity: 56, rating: 4.8, color: 'Black' },
  'airbuds-10': { stockQuantity: 145, rating: 4.5, color: 'White' },
  'airbuds-11': { stockQuantity: 73, rating: 4.8, color: 'Green' },
  'airbuds-12': { stockQuantity: 42, rating: 4.9, color: 'Silver' },
  'airbuds-13': { stockQuantity: 38, rating: 5.0, color: 'Black' },
  'airbuds-14': { stockQuantity: 108, rating: 4.6, color: 'White' },
  'airbuds-15': { stockQuantity: 81, rating: 4.7, color: 'Black' },
  'airbuds-16': { stockQuantity: 49, rating: 4.8, color: 'Silver' },
  'airbuds-17': { stockQuantity: 118, rating: 4.5, color: 'White' },
  'airbuds-18': { stockQuantity: 64, rating: 4.8, color: 'Black' },
  'airbuds-19': { stockQuantity: 92, rating: 4.6, color: 'Blue' },
  'airbuds-20': { stockQuantity: 76, rating: 4.7, color: 'White' },
  
  // Phone Cases
  'case-1': { stockQuantity: 156, rating: 4.6, color: 'Black' },
  'case-2': { stockQuantity: 189, rating: 4.5, color: 'Clear' },
  'case-3': { stockQuantity: 234, rating: 4.4, color: 'Transparent' },
  'case-4': { stockQuantity: 78, rating: 4.8, color: 'Brown' },
  'case-5': { stockQuantity: 123, rating: 4.7, color: 'Black' },
  'case-6': { stockQuantity: 92, rating: 4.8, color: 'Wood Brown' },
  'case-7': { stockQuantity: 145, rating: 4.6, color: 'White Marble' },
  'case-8': { stockQuantity: 167, rating: 4.5, color: 'Black' },
  'case-9': { stockQuantity: 89, rating: 4.7, color: 'Brown' },
  'case-10': { stockQuantity: 278, rating: 4.3, color: 'Clear' },
  'case-11': { stockQuantity: 112, rating: 4.8, color: 'Black' },
  'case-12': { stockQuantity: 0, rating: 4.5, color: 'Pink' },
  'case-13': { stockQuantity: 134, rating: 4.6, color: 'Silver' },
  'case-14': { stockQuantity: 156, rating: 4.5, color: 'Gray' },
  'case-15': { stockQuantity: 198, rating: 4.4, color: 'Clear' },
  'case-16': { stockQuantity: 187, rating: 4.6, color: 'Black' },
  'case-17': { stockQuantity: 145, rating: 4.7, color: 'Navy Blue' },
  'case-18': { stockQuantity: 67, rating: 4.8, color: 'Black' },
  'case-19': { stockQuantity: 176, rating: 4.6, color: 'Black' },
  'case-20': { stockQuantity: 123, rating: 4.7, color: 'Multicolor' },
};

/**
 * Add mock data to a product
 */
export const addMockData = <T extends { id: string }>(product: T): T => {
  const mockData = productMockData[product.id as keyof typeof productMockData];
  
  if (mockData) {
    return {
      ...product,
      ...mockData,
    };
  }
  
  return product;
};

/**
 * Add mock data to all products
 */
export const addMockDataToProducts = <T extends { id: string }>(products: T[]): T[] => {
  return products.map(addMockData);
};
