import mongoose from 'mongoose'

export const PRODUCT_CATEGORIES = [
  'Sunglasses',
  'Eyeglasses',
  'Reading Glasses',
  'Sports Eyewear',
  'Kids Eyewear',
  'Designer Frames'
] as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]

export const PRODUCT_BRANDS = [
  'Ray-Ban',
  'Oakley',
  'Carrera',
  'Gucci',
  'Prada',
  'Tom Ford',
  'Warby Parker',
  'Foster Grant',
  'Kate Spade',
  'Persol'
] as const

export type ProductBrand = typeof PRODUCT_BRANDS[number]

export const PRODUCT_GENDERS = ['Men', 'Women', 'Unisex'] as const

export type ProductGender = typeof PRODUCT_GENDERS[number]

export interface IProduct {
  _id: string
  name: string
  brand: ProductBrand
  category: ProductCategory
  gender: ProductGender
  description: string
  image: string
  oldPrice: number
  newPrice: number
  quantity: number
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { 
    type: String, 
    required: true,
    enum: PRODUCT_BRANDS
  },
  category: { 
    type: String, 
    required: true,
    enum: PRODUCT_CATEGORIES
  },
  gender: {
    type: String,
    required: true,
    enum: PRODUCT_GENDERS
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Initialize the model
let Product: mongoose.Model<IProduct>

try {
  // Try to get the existing model
  Product = mongoose.model<IProduct>('Product')
} catch {
  // If the model doesn't exist, create it
  Product = mongoose.model<IProduct>('Product', productSchema)
}

export { Product } 