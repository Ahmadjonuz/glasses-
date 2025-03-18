import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/products'
import { PRODUCT_CATEGORIES, PRODUCT_BRANDS, PRODUCT_GENDERS } from '@/lib/models/Product'

const PRICE_RANGES = {
  'under-150000': { min: 0, max: 150000 },
  '150000-300000': { min: 150000, max: 300000 },
  '300000-500000': { min: 300000, max: 500000 },
  'above-500000': { min: 500000, max: Infinity }
} as const

type PriceRangeKey = keyof typeof PRICE_RANGES

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categories = searchParams.getAll('category')
    const brands = searchParams.getAll('brand')
    const genders = searchParams.getAll('gender')
    const priceRanges = searchParams.getAll('priceRange')
    const featured = searchParams.get('featured')

    console.log('Received filters:', {
      categories,
      brands,
      genders,
      priceRanges,
      featured
    })

    // Filter products based on parameters
    let filteredProducts = [...products]
    
    // Category filter
    if (categories.length > 0) {
      if (!categories.every(cat => PRODUCT_CATEGORIES.includes(cat as any))) {
        console.log('Invalid category found:', categories)
        return NextResponse.json(
          { error: 'Invalid category' },
          { status: 400 }
        )
      }
      filteredProducts = filteredProducts.filter(product => 
        categories.includes(product.category)
      )
    }

    // Brand filter
    if (brands.length > 0) {
      if (!brands.every(brand => PRODUCT_BRANDS.includes(brand as any))) {
        console.log('Invalid brand found:', brands)
        return NextResponse.json(
          { error: 'Invalid brand' },
          { status: 400 }
        )
      }
      filteredProducts = filteredProducts.filter(product => 
        brands.includes(product.brand)
      )
    }

    // Gender filter
    if (genders.length > 0) {
      if (!genders.every(gender => PRODUCT_GENDERS.includes(gender as any))) {
        console.log('Invalid gender found:', genders)
        return NextResponse.json(
          { error: 'Invalid gender' },
          { status: 400 }
        )
      }
      filteredProducts = filteredProducts.filter(product => 
        genders.includes(product.gender)
      )
    }

    // Price range filter
    if (priceRanges.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return priceRanges.some(range => {
          const { min, max } = PRICE_RANGES[range as PriceRangeKey] || {}
          if (!min && !max) return false
          return product.newPrice >= min && product.newPrice <= (max === Infinity ? product.newPrice : max)
        })
      })
    }

    // Featured filter
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.trending)
    }

    console.log(`Found ${filteredProducts.length} products`)

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch products: ${error.message}` },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred while fetching products' },
      { status: 500 }
    )
  }
} 