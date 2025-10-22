export interface Product {
  id: string;
  name: string;
  description: string;
  vendorId: string;
  vendorName?: string;
  category: ProductCategory;
  subcategory: string;
  specifications: Record<string, any>;
  certifications: string[];
  images: string[];
  datasheet?: string;
  pricing: ProductPricing;
  availability: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 
  | 'hvac'
  | 'lighting'
  | 'plumbing'
  | 'electrical'
  | 'building_materials'
  | 'renewable_energy'
  | 'water_management'
  | 'waste_management'
  | 'other';

export interface ProductPricing {
  basePrice: number;
  currency: string;
  unit: string;
  discounts?: Discount[];
}

export interface Discount {
  minQuantity: number;
  percentage: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  vendorId: string;
  category: ProductCategory;
  subcategory: string;
  specifications: Record<string, any>;
  certifications: string[];
  pricing: ProductPricing;
  availability: string;
  tags: string[];
}
