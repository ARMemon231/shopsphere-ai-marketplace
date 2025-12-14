export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  howToUse: string;
  price: number;
  category: 'watches' | 'airbuds' | 'phone-cases';
  subcategory?: 'men' | 'women' | 'kids';
  mainImage: string;
  images: string[];
  features: string[];
  inStock: boolean;
  // New fields from Google Sheets
  stockQuantity?: number;
  rating?: number;
  color?: string;
}

// Watch images with placeholder URLs
const watchImagesMen = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=600&fit=crop',
];

const watchImagesWomen = [
  'https://images.unsplash.com/photo-1549972574-8e3e1ed6a347?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=600&h=600&fit=crop',
];

const watchImagesKids = [
  'https://images.unsplash.com/photo-1434056886845-deb1e2e23aef?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506193095-80f06cdccfb4?w=600&h=600&fit=crop',
];

const airbudsImages = [
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop',
];

const phoneCaseImages = [
  'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop',
];

const generateWatches = (): Product[] => {
  const menWatches: Product[] = Array.from({ length: 7 }, (_, i) => ({
    id: `watch-men-${i + 1}`,
    name: ['Chronos Elite', 'Titan Pro', 'Navigator X', 'Urban Classic', 'Sport Master', 'Executive Plus', 'Voyager'][i],
    description: ['Precision engineering meets bold design', 'Military-grade durability with style', 'Adventure-ready timepiece', 'Timeless elegance for every occasion', 'Built for performance', 'Luxury redefined', 'For the modern explorer'][i],
    fullDescription: `Experience the pinnacle of watchmaking with our ${['Chronos Elite', 'Titan Pro', 'Navigator X', 'Urban Classic', 'Sport Master', 'Executive Plus', 'Voyager'][i]}. Crafted with premium materials including sapphire crystal glass, surgical-grade stainless steel, and genuine Italian leather. Features include water resistance up to 100m, automatic movement, luminous hands, and a date display. The ${['Chronos Elite', 'Titan Pro', 'Navigator X', 'Urban Classic', 'Sport Master', 'Executive Plus', 'Voyager'][i]} represents the perfect blend of functionality and sophistication.`,
    howToUse: 'To set the time, pull the crown out to the second position and rotate clockwise or counter-clockwise. Push the crown back in to start the movement. For date adjustment, pull the crown to the first position and rotate. Water resistance is maintained only when the crown is fully pushed in.',
    price: [299, 349, 279, 199, 249, 399, 329][i],
    category: 'watches',
    subcategory: 'men',
    mainImage: watchImagesMen[i % 4],
    images: [...watchImagesMen],
    features: ['Sapphire Crystal', 'Water Resistant 100m', 'Automatic Movement', 'Luminous Hands'],
    inStock: true,
  }));

  const womenWatches: Product[] = Array.from({ length: 7 }, (_, i) => ({
    id: `watch-women-${i + 1}`,
    name: ['Rose Elegance', 'Pearl Blossom', 'Diamond ShopSphere', 'Moonlight', 'Sophia Classic', 'Aurora', 'Grace'][i],
    description: ['Feminine grace in every detail', 'Delicate beauty meets precision', 'Sparkling sophistication', 'Ethereal elegance', 'Timeless feminine charm', 'Light up your wrist', 'Simple yet stunning'][i],
    fullDescription: `The ${['Rose Elegance', 'Pearl Blossom', 'Diamond ShopSphere', 'Moonlight', 'Sophia Classic', 'Aurora', 'Grace'][i]} is designed for the modern woman who appreciates both beauty and functionality. Featuring a mother-of-pearl dial, rose gold accents, and genuine Swarovski crystals. The slim profile and lightweight design ensure all-day comfort while the Swiss quartz movement guarantees precision timing.`,
    howToUse: 'Gently pull the crown to set the time. The delicate crystal accents should be cleaned with a soft, dry cloth. Store in the provided jewelry box when not in use. Avoid contact with perfumes, lotions, and water for best preservation of the finish.',
    price: [249, 299, 449, 279, 199, 329, 229][i],
    category: 'watches',
    subcategory: 'women',
    mainImage: watchImagesWomen[i % 4],
    images: [...watchImagesWomen],
    features: ['Mother of Pearl Dial', 'Swarovski Crystals', 'Swiss Quartz', 'Rose Gold Plating'],
    inStock: true,
  }));

  const kidsWatches: Product[] = Array.from({ length: 6 }, (_, i) => ({
    id: `watch-kids-${i + 1}`,
    name: ['Adventure Time', 'Sport Junior', 'Rainbow Star', 'Dino Explorer', 'Ocean Buddy', 'Space Cadet'][i],
    description: ['Built for young adventurers', 'Active kids deserve active watches', 'Colorful and fun', 'For little dinosaur lovers', 'Dive into fun', 'Reach for the stars'][i],
    fullDescription: `The ${['Adventure Time', 'Sport Junior', 'Rainbow Star', 'Dino Explorer', 'Ocean Buddy', 'Space Cadet'][i]} is specially designed for children. Made with hypoallergenic materials and featuring a durable silicone strap that withstands active play. The easy-to-read dial helps children learn to tell time, while the fun design makes it a favorite accessory.`,
    howToUse: 'Perfect for teaching time! The clearly marked numbers and hour/minute hands make learning easy. The silicone strap is adjustable and washable. Water-resistant for handwashing and rain, but not suitable for swimming.',
    price: [49, 59, 45, 55, 65, 52][i],
    category: 'watches',
    subcategory: 'kids',
    mainImage: watchImagesKids[i % 4],
    images: [...watchImagesKids],
    features: ['Hypoallergenic', 'Durable Silicone', 'Easy-Read Dial', 'Water Resistant'],
    inStock: true,
  }));

  return [...menWatches, ...womenWatches, ...kidsWatches];
};

const generateAirbuds = (): Product[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `airbuds-${i + 1}`,
    name: ['SoundPro Elite', 'BassMax 3000', 'AirPods Ultra', 'Harmony Plus', 'Echo Wireless', 'PureTone Pro', 'BeatDrop X', 'SonicWave', 'AudioMax', 'ZenPods', 'PowerBuds', 'ClearSound Pro', 'NoiseFree Elite', 'MusicFlow', 'BassBoost Pro', 'TrueWireless X', 'AudioPure', 'SoundMax Ultra', 'EchoPods', 'HarmonyX'][i],
    description: ['Premium sound, zero wires', 'Deep bass, crystal highs', 'Next-gen audio experience', 'Perfect harmony in your ears', 'Freedom to listen', 'Pure audio bliss', 'Drop the beat anywhere', 'Ride the sound wave', 'Maximum audio performance', 'Find your audio zen', 'Power through your day', 'Crystal clear communication', 'Silence the world', 'Let the music flow', 'Bass that moves you', 'True wireless freedom', 'Pure, unfiltered sound', 'Ultimate sound experience', 'Echo your style', 'Harmony in every note'][i],
    fullDescription: `The ${['SoundPro Elite', 'BassMax 3000', 'AirPods Ultra', 'Harmony Plus', 'Echo Wireless', 'PureTone Pro', 'BeatDrop X', 'SonicWave', 'AudioMax', 'ZenPods', 'PowerBuds', 'ClearSound Pro', 'NoiseFree Elite', 'MusicFlow', 'BassBoost Pro', 'TrueWireless X', 'AudioPure', 'SoundMax Ultra', 'EchoPods', 'HarmonyX'][i]} delivers exceptional audio quality with advanced active noise cancellation technology. Features include 40-hour battery life with the charging case, IPX5 water resistance, touch controls, and seamless connectivity with all Bluetooth devices. The ergonomic design ensures a secure, comfortable fit for hours of listening.`,
    howToUse: 'Remove earbuds from the charging case to automatically power on and enter pairing mode. Tap the touch surface to play/pause, double-tap to skip tracks, and triple-tap to activate voice assistant. Return to the case to charge. Use the companion app to customize EQ settings and touch controls.',
    price: [79, 129, 199, 99, 89, 149, 119, 109, 159, 69, 139, 179, 189, 95, 125, 169, 85, 145, 105, 135][i],
    category: 'airbuds',
    mainImage: airbudsImages[i % 4],
    images: [...airbudsImages],
    features: ['Active Noise Cancellation', '40hr Battery Life', 'IPX5 Water Resistant', 'Touch Controls'],
    inStock: i !== 5,
  }));
};

const generatePhoneCases = (): Product[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `case-${i + 1}`,
    name: ['Armor Shield', 'SlimFit Pro', 'Crystal Clear', 'Leather ShopSphere', 'Carbon Fiber X', 'Nature Wood', 'Marble Elite', 'Grip Master', 'Wallet Case Pro', 'Minimalist', 'Rugged Defender', 'Silicone Soft', 'Metal Edge', 'Fabric Touch', 'Transparent Plus', 'Ring Holder', 'Kickstand Pro', 'Battery Case', 'Magnetic Mount', 'Artist Series'][i],
    description: ['Ultimate protection', 'Slim without compromise', 'Show off your phone', 'Luxury in your hands', 'Racing-inspired design', 'Natural elegance', 'Stone-cold style', 'Never drop again', 'Cards and phone in one', 'Less is more', 'Built like a tank', 'Soft to the touch', 'Premium metal accents', 'Unique texture feel', 'Clear with extra protection', 'Secure grip solution', 'Stand and deliver', 'Power on the go', 'Snap and go', 'Express yourself'][i],
    fullDescription: `The ${['Armor Shield', 'SlimFit Pro', 'Crystal Clear', 'Leather ShopSphere', 'Carbon Fiber X', 'Nature Wood', 'Marble Elite', 'Grip Master', 'Wallet Case Pro', 'Minimalist', 'Rugged Defender', 'Silicone Soft', 'Metal Edge', 'Fabric Touch', 'Transparent Plus', 'Ring Holder', 'Kickstand Pro', 'Battery Case', 'Magnetic Mount', 'Artist Series'][i]} provides the perfect combination of protection and style for your device. Engineered with military-grade drop protection, raised edges for screen and camera protection, and precise cutouts for all ports and buttons. Compatible with wireless charging and designed to maintain a slim profile.`,
    howToUse: 'Simply snap the case onto your phone starting from one corner and working around the edges. Remove by gently prying from one corner. Clean with a damp cloth as needed. The case is compatible with most screen protectors and wireless chargers.',
    price: [29, 24, 19, 49, 39, 45, 35, 27, 55, 15, 42, 22, 38, 32, 21, 28, 36, 79, 33, 41][i],
    category: 'phone-cases',
    mainImage: phoneCaseImages[i % 4],
    images: [...phoneCaseImages],
    features: ['Military-Grade Protection', 'Wireless Charging Compatible', 'Raised Edges', 'Precise Cutouts'],
    inStock: i !== 12,
  }));
};

import { addMockDataToProducts } from './mockData';

const allProducts = [
  ...generateWatches(),
  ...generateAirbuds(),
  ...generatePhoneCases(),
];

export const products: Product[] = addMockDataToProducts(allProducts);

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductsBySubcategory = (category: Product['category'], subcategory: Product['subcategory']): Product[] => {
  return products.filter(p => p.category === category && p.subcategory === subcategory);
};

export const getRelatedProducts = (product: Product, limit: number = 6): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};
