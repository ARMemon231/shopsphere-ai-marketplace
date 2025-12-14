// Google Sheets Integration Service
// This service fetches product data from Google Sheets

// Configuration
const GOOGLE_SHEETS_CONFIG = {
  // Replace with your actual Google Sheets URL
  // Format: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
  
  // The sheet name/tab (default is "Sheet1")
  SHEET_NAME: 'Sheet1',
  
  // Range of data (e.g., "A1:G100" or just "Sheet1" for all data)
  RANGE: 'Sheet1!A:G',
};

// Extended Product interface with new fields
export interface ProductFromSheet {
  Product_ID: string;
  Product_Name: string;
  Category: string;
  Price: number;
  Stock_Qty: number;
  Rating: number;
  Color: string;
}

/**
 * Fetch products from Google Sheets using the public CSV export URL
 * This method works without API key for public sheets
 * 
 * To make your sheet public:
 * 1. Open your Google Sheet
 * 2. Click "Share" button
 * 3. Click "Change to anyone with the link"
 * 4. Make sure "Viewer" permission is selected
 * 5. Copy the sheet ID from URL
 */
export const fetchProductsFromGoogleSheets = async (): Promise<ProductFromSheet[]> => {
  try {
    // Construct the CSV export URL
    // Format: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid=0
    const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/export?format=csv&gid=0`;
    
    console.log('Fetching products from Google Sheets:', csvUrl);
    
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheets data: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const products = parseCSV(csvText);
    
    console.log(`Successfully fetched ${products.length} products from Google Sheets`);
    return products;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    throw error;
  }
};

/**
 * Alternative: Fetch using Google Sheets API (requires API key)
 * More reliable but needs setup
 */
export const fetchProductsFromSheetsAPI = async (apiKey: string): Promise<ProductFromSheet[]> => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${GOOGLE_SHEETS_CONFIG.RANGE}?key=${apiKey}`;
    
    console.log('Fetching products from Google Sheets API');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const products = parseGoogleSheetsResponse(data);
    
    console.log(`Successfully fetched ${products.length} products from Google Sheets API`);
    return products;
  } catch (error) {
    console.error('Error fetching from Google Sheets API:', error);
    throw error;
  }
};

/**
 * Parse CSV text into product objects
 */
function parseCSV(csvText: string): ProductFromSheet[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const products: ProductFromSheet[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    if (values.length === headers.length) {
      const product: ProductFromSheet = {
        Product_ID: values[0].trim(),
        Product_Name: values[1].trim(),
        Category: values[2].trim(),
        Price: parseFloat(values[3]) || 0,
        Stock_Qty: parseInt(values[4]) || 0,
        Rating: parseFloat(values[5]) || 0,
        Color: values[6].trim(),
      };
      
      products.push(product);
    }
  }
  
  return products;
}

/**
 * Parse a single CSV line, handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

/**
 * Parse Google Sheets API response
 */
function parseGoogleSheetsResponse(data: any): ProductFromSheet[] {
  if (!data.values || data.values.length === 0) {
    return [];
  }
  
  const [headers, ...rows] = data.values;
  
  return rows.map((row: string[]) => ({
    Product_ID: row[0] || '',
    Product_Name: row[1] || '',
    Category: row[2] || '',
    Price: parseFloat(row[3]) || 0,
    Stock_Qty: parseInt(row[4]) || 0,
    Rating: parseFloat(row[5]) || 0,
    Color: row[6] || '',
  }));
}

/**
 * Merge Google Sheets data with existing product data
 * This updates price, stock, rating, and color from the sheet
 */
export const mergeProductData = (
  existingProducts: any[],
  sheetProducts: ProductFromSheet[]
): any[] => {
  const sheetProductsMap = new Map(
    sheetProducts.map(p => [p.Product_ID, p])
  );
  
  return existingProducts.map(product => {
    const sheetData = sheetProductsMap.get(product.id);
    
    if (sheetData) {
      return {
        ...product,
        price: sheetData.Price,
        stockQuantity: sheetData.Stock_Qty,
        rating: sheetData.Rating,
        color: sheetData.Color,
        inStock: sheetData.Stock_Qty > 0,
      };
    }
    
    return product;
  });
};

/**
 * Get products by availability
 */
export const getInStockProducts = (products: ProductFromSheet[]): ProductFromSheet[] => {
  return products.filter(p => p.Stock_Qty > 0);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (
  products: ProductFromSheet[],
  category: string
): ProductFromSheet[] => {
  return products.filter(p => p.Category.toLowerCase().includes(category.toLowerCase()));
};

/**
 * Get low stock products (less than 10 items)
 */
export const getLowStockProducts = (products: ProductFromSheet[]): ProductFromSheet[] => {
  return products.filter(p => p.Stock_Qty > 0 && p.Stock_Qty < 10);
};

/**
 * Get top rated products
 */
export const getTopRatedProducts = (products: ProductFromSheet[]): ProductFromSheet[] => {
  return products.filter(p => p.Rating >= 4.5).sort((a, b) => b.Rating - a.Rating);
};

/**
 * Search products by name or category
 */
export const searchProducts = (
  products: ProductFromSheet[],
  query: string
): ProductFromSheet[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p =>
      p.Product_Name.toLowerCase().includes(lowerQuery) ||
      p.Category.toLowerCase().includes(lowerQuery)
  );
};

// Export configuration for easy updates
export const updateSheetsConfig = (spreadsheetId: string, sheetName: string = 'Sheet1') => {
  GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID = spreadsheetId;
  GOOGLE_SHEETS_CONFIG.SHEET_NAME = sheetName;
  GOOGLE_SHEETS_CONFIG.RANGE = `${sheetName}!A:G`;
};
