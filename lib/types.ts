clearimport { ProductBrand, ProductCategory, ProductGender } from './models/Product'

export interface Product {
  _id: string
  name: string
  brand: ProductBrand
  category: ProductCategory
  gender: ProductGender
  description: string
  image: string
  oldPrice?: number
  newPrice: number
  quantity: number
  weight: string
  rating: number
  trending?: boolean
  features?: string[]
  specifications?: {
    [key: string]: string
  }
  qty: number
  price: number
}

export interface CartItem extends Product {
  cartQuantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface FilterOptions {
  categories: string[]
  brands: string[]
  genders: string[]
  priceRanges: PriceRange[]
}

export interface PriceRange {
  min: number
  max: number | null
  label: string
}

export interface ActiveFilters {
  categories: string[]
  brands: string[]
  genders: string[]
  priceRanges: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
} 