import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/products'
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS, PRODUCT_GENDERS } from '@/lib/models/Product'
import { clientPromise } from '@/lib/db'

const PRICE_RANGES = {
  'under-150000': { min: 0, max: 150000 },
  '150000-300000': { min: 150000, max: 300000 },
  '300000-500000': { min: 300000, max: 500000 },
  'above-500000': { min: 500000, max: Infinity }
} as const

type PriceRangeKey = keyof typeof PRICE_RANGES

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '8')
    const search = url.searchParams.get('search') || ''
    const category = url.searchParams.get('category') || ''

    const client = await clientPromise
    if (!client) {
      return NextResponse.json({ products: [], total: 0 })
    }

    const db = client.db('glasses_store')
    const collection = db.collection('products')

    const query: any = {}
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }
    if (category) {
      query.category = category
    }

    const skip = (page - 1) * limit
    const [products, total] = await Promise.all([
      collection.find(query).skip(skip).limit(limit).toArray(),
      collection.countDocuments(query)
    ])

    return NextResponse.json({ products, total })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 