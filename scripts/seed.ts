import dbConnect from '@/lib/mongoose'
import { Product, PRODUCT_CATEGORIES, PRODUCT_BRANDS, PRODUCT_GENDERS } from '@/lib/models/Product'
import { MONGODB_URI } from '@/lib/env'

console.log('Using MongoDB URI:', MONGODB_URI)

const sampleProducts = [
  {
    name: 'Classic Wayfarer',
    brand: 'Ray-Ban',
    category: 'Sunglasses',
    gender: 'Unisex',
    description: 'Iconic Ray-Ban Wayfarer sunglasses with UV protection',
    image: '/assets/sunglasses/sun3.png',
    oldPrice: 2999,
    newPrice: 2499,
    quantity: 50,
    featured: true,
  },
  {
    name: 'Titanium Round',
    brand: 'Warby Parker',
    category: 'Eyeglasses',
    gender: 'Men',
    description: 'Lightweight titanium round frames for everyday wear',
    image: '/assets/vision/vision2.png',
    oldPrice: 1999,
    newPrice: 1499,
    quantity: 30,
    featured: false,
  },
  {
    name: 'Cat Eye Crystal',
    brand: 'Kate Spade',
    category: 'Eyeglasses',
    gender: 'Women',
    description: 'Elegant crystal cat eye frames with modern design',
    image: '/assets/vision/vision7.png',
    oldPrice: 2499,
    newPrice: 1999,
    quantity: 25,
    featured: true,
  },
  {
    name: 'Sport Shield',
    brand: 'Oakley',
    category: 'Sports Eyewear',
    gender: 'Unisex',
    description: 'High-performance sport shield with impact protection',
    image: '/assets/sports/sports1.png',
    oldPrice: 3499,
    newPrice: 2999,
    quantity: 20,
    featured: true,
  },
  {
    name: 'Kids Flex',
    brand: 'Ray-Ban',
    category: 'Kids Eyewear',
    gender: 'Unisex',
    description: 'Durable and flexible frames for active kids',
    image: '/assets/sports/sports2.png',
    oldPrice: 1499,
    newPrice: 999,
    quantity: 40,
    featured: false,
  },
  {
    name: 'Designer Aviator',
    brand: 'Gucci',
    category: 'Designer Frames',
    gender: 'Unisex',
    description: 'Luxury aviator frames with gold-plated details',
    image: '/assets/sunglasses/sun4.png',
    oldPrice: 4999,
    newPrice: 4499,
    quantity: 15,
    featured: true,
  },
  {
    name: 'Reading Classic',
    brand: 'Foster Grant',
    category: 'Reading Glasses',
    gender: 'Unisex',
    description: 'Classic reading glasses with anti-glare coating',
    image: '/assets/vision/vision2.png',
    oldPrice: 999,
    newPrice: 799,
    quantity: 60,
    featured: false,
  },
  {
    name: 'Sport Wrap',
    brand: 'Oakley',
    category: 'Sports Eyewear',
    gender: 'Men',
    description: 'Wraparound sport frames with polarized lenses',
    image: '/assets/sports/sports3.png',
    oldPrice: 2999,
    newPrice: 2499,
    quantity: 25,
    featured: true,
  }
]

async function seed() {
  try {
    console.log('Connecting to database...')
    await dbConnect()
    console.log('Database connected successfully')

    // Clear existing products
    console.log('Clearing existing products...')
    await Product.deleteMany({})
    console.log('Existing products cleared')

    // Insert new products
    console.log('Inserting sample products...')
    await Product.insertMany(sampleProducts)
    console.log('Sample products inserted successfully')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed() 