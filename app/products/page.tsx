"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FilterSidebar } from '@/components/FilterSidebar'
import { useCart } from '@/contexts/cart-context'
import { Product } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'

type FilterType = 'categories' | 'brands' | 'genders' | 'priceRanges'

interface Filters {
  categories: string[]
  brands: string[]
  genders: string[]
  priceRanges: string[]
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    categories: searchParams.getAll('category'),
    brands: searchParams.getAll('brand'),
    genders: searchParams.getAll('gender'),
    priceRanges: searchParams.getAll('priceRange'),
  })

  const handleFilterChange = (type: FilterType, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[type]
      const updated = current.includes(value)
        ? current.filter((item: string) => item !== value)
        : [...current, value]

      const newFilters = { ...prev, [type]: updated }
      
      // Update URL
      const params = new URLSearchParams()
      Object.entries(newFilters).forEach(([key, values]) => {
        values.forEach((value: string) => {
          params.append(key.slice(0, -1), value) // Remove 's' from key (categories -> category)
        })
      })
      
      router.push(`/products?${params.toString()}`)
      return newFilters
    })
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const params = new URLSearchParams()
        Object.entries(selectedFilters).forEach(([key, values]) => {
          values.forEach((value: string) => {
            params.append(key.slice(0, -1), value)
          })
        })

        const response = await fetch(`/api/products?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedFilters])

  return (
    <div className="container max-w-7xl px-4 py-8">
      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <div className="w-64 flex-shrink-0">
          <FilterSidebar
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Card key={n} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-8 bg-muted rounded" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product._id} className="overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold">₹{product.newPrice}</span>
                        {product.oldPrice && product.oldPrice > product.newPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => addToCart(product, 1)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
              <p className="text-muted-foreground">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

