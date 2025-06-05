
export interface ProductCardData {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  prescriptionRequired: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
}

// Alias for consistency - both refer to the same product structure
export type Product = ProductCardData;
