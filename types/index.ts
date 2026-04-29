export interface Product {
  id: string;
  name: string;
  nameZh: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  tags: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  discount?: number;
  weight?: string;
  origin?: string;
  material?: string;
}

export interface Category {
  id: string;
  name: string;
  nameZh: string;
  slug: string;
  image: string;
  count: number;
  icon?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'admin';
  orders?: Order[];
  wishlist?: string[];
  address?: Address;
  joinedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  address?: Address;
  paymentMethod?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  sortBy: string;
  inStock: boolean;
  tags: string[];
}
