import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { products as staticProducts } from '@/lib/products'

const PRICE_RANGES = {
  'under-150000': { min: 0, max: 150000 },
  '150000-300000': { min: 150000, max: 300000 },
  '300000-500000': { min: 300000, max: 500000 },
  'above-500000': { min: 500000, max: Infinity }
} as const

type PriceRangeKey = keyof typeof PRICE_RANGES

export const dynamic = 'force-dynamic'
export const revalidate = 0

function filterProducts(products: any[], { search, category, priceRange }: { 
  search: string, 
  category: string, 
  priceRange: PriceRangeKey | null 
}) {
  let filteredProducts = [...products]
  
  if (search && search.trim()) {
    const searchLower = search.trim().toLowerCase()
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    )
  }
  
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    )
  }

  if (priceRange && PRICE_RANGES[priceRange]) {
    const { min, max } = PRICE_RANGES[priceRange]
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && product.price < max
    )
  }

  return filteredProducts
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '12')
    const search = url.searchParams.get('search') || ''
    const category = url.searchParams.get('category') || ''
    const priceRange = url.searchParams.get('priceRange') as PriceRangeKey | null

    console.log('Request params:', { page, limit, search, category, priceRange })

    let products = []
    let total = 0

    try {
      const { db } = await connectToDatabase()
      const collection = db.collection('products')
      
      const query: any = {}
      if (search && search.trim()) {
        query.$or = [
          { name: { $regex: search.trim(), $options: 'i' } },
          { description: { $regex: search.trim(), $options: 'i' } }
        ]
      }
      
      if (category && category !== 'all') {
        query.category = category
      }

      if (priceRange && PRICE_RANGES[priceRange]) {
        const { min, max } = PRICE_RANGES[priceRange]
        query.price = { $gte: min, $lt: max }
      }

      console.log('MongoDB query:', JSON.stringify(query))
      const skip = (page - 1) * limit

      const [dbProducts, dbTotal] = await Promise.all([
        collection.find(query).skip(skip).limit(limit).toArray(),
        collection.countDocuments(query)
      ])

      products = dbProducts
      total = dbTotal

      console.log(`Found ${total} products in database`)
    } catch (dbError) {
      console.error('Database operation failed, using static data:', dbError)
      // Use static data as fallback
      const filteredProducts = filterProducts(staticProducts, { search, category, priceRange })
      total = filteredProducts.length
      const skip = (page - 1) * limit
      products = filteredProducts.slice(skip, skip + limit)
      console.log(`Using ${total} static products`)
    }

    return NextResponse.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      query: { search, category, priceRange }
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request', details: error },
      { status: 500 }
    )
  }
} 