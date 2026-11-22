export type SkinType = 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive';
export type SkinConcern = 'acne' | 'spots' | 'dryness' | 'redness' | 'wrinkles';
export type CategorySlug = 'cleanser' | 'serum' | 'moisturizer' | 'sunscreen';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  categoryName: string;
  shortDesc: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  volume: string;
  skinTypes: SkinType[];
  concerns: SkinConcern[];
  keyIngredients: string[];
  features: string[];
  image: string;
  accentColor: string;
  badge?: 'پرفروش' | 'جدید' | 'منتخب تحریریه' | 'تخفیف ویژه';
  affiliateUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  skinType: SkinType;
}
