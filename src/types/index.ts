export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email?: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  image?: string;
  services: string[];
  workingHours: string;
  verified: boolean;
  yearEstablished?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
}

export interface SearchFilters {
  category: string;
  pincode: string;
  city: string;
  rating: number;
  sortBy: 'rating' | 'name' | 'reviews';
  verified: boolean;
}

export interface RentalItem {
  id: string;
  name: string;
  category: string;
  description: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  securityDeposit: number;
  condition: 'excellent' | 'good' | 'fair';
  brand: string;
  model?: string;
  year?: number;
  images: string[];
  features: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  verified: boolean;
}

export interface ResaleItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: 'like-new' | 'excellent' | 'good' | 'fair';
  brand: string;
  model?: string;
  year?: number;
  images: string[];
  features: string[];
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail?: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  verified: boolean;
  negotiable: boolean;
  warranty?: string;
}

export interface RentalFilters {
  category: string;
  pincode: string;
  city: string;
  priceRange: [number, number];
  condition: string;
  sortBy: 'price' | 'rating' | 'name';
  verified: boolean;
}

export interface ResaleFilters {
  category: string;
  pincode: string;
  city: string;
  priceRange: [number, number];
  condition: string;
  sortBy: 'price' | 'rating' | 'name';
  verified: boolean;
  negotiable: boolean;
}