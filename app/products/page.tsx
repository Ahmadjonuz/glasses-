"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FilterSidebar } from '@/components/FilterSidebar'
import { Product } from '@/lib/types'
import { MainHeader } from '@/components/MainHeader'
import { ProductCard } from '@/app/components/ProductCard'
import { ModeToggle } from "@/components/ui/mode-toggle"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { MobileNav } from "@/app/components/MobileNav"

type FilterType = 'categories' | 'brands' | 'genders' | 'priceRanges'

interface Filters {
  categories: string[]
  brands: string[]
  genders: string[]
  priceRanges: string[]
}

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const { items } = useCart()

  // Initialize filters with URL params or empty arrays
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    categories: searchParams.getAll('category'),
    brands: searchParams.getAll('brand'),
    genders: searchParams.getAll('gender'),
    priceRanges: searchParams.getAll('priceRange'),
  })

  // Update filters when URL changes
  useEffect(() => {
    const newFilters = {
      categories: searchParams.getAll('category'),
      brands: searchParams.getAll('brand'),
      genders: searchParams.getAll('gender'),
      priceRanges: searchParams.getAll('priceRange'),
    }

    // Only update if filters have actually changed
    if (JSON.stringify(newFilters) !== JSON.stringify(selectedFilters)) {
      setSelectedFilters(newFilters)
    }
  }, [searchParams])

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
        if (values.length > 0) { // Only add non-empty filters to URL
          values.forEach((value: string) => {
            params.append(key.slice(0, -1), value)
          })
        }
      })
      
      router.push(`/products?${params.toString()}`)
      return newFilters
    })
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true)
        const params = new URLSearchParams()
        
        // Only add non-empty filters to the query
        Object.entries(selectedFilters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            values.forEach((value: string) => {
              params.append(key.slice(0, -1), value)
            })
          }
        })

        console.log('Fetching products with params:', params.toString())
        
        try {
          const response = await fetch(`/api/products?${params.toString()}`)
          const data = await response.json()
          
          console.log('API Response:', data)

          if (!response.ok) {
            console.error('API error:', data.error)
            throw new Error(data.error || 'Failed to fetch products')
          }
          
          if (Array.isArray(data.products)) {
            console.log(`Received ${data.products.length} products`)
            setProducts(data.products)
          } else {
            console.error('Invalid response format - products is not an array:', data)
            setProducts([])
          }
        } catch (apiError: any) {
          console.error('API Error:', apiError.message)
          setProducts([])
        }
      } catch (error) {
        console.error('Error in fetchProducts:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedFilters])

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader 
        products={products} 
        showMobileMenu={true}
        onShowProducts={() => setShowMobileFilters(true)}
      />

      <main className="flex-1 pb-16 md:pb-0">
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <FilterSidebar
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                isOpen={showMobileFilters}
                onClose={() => setShowMobileFilters(false)}
              />
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {isLoading ? (
                    Array(8).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-lg"></div>
                        <div className="space-y-3 mt-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                  ) : products.length === 0 ? (
                    <div className="text-center col-span-full py-12">
                      <h3 className="text-lg font-semibold">Mahsulotlar topilmadi</h3>
                      <p className="text-muted-foreground mt-2">
                        Boshqa filtrlash parametrlarini tanlashga harakat qiling.
                      </p>
                    </div>
                  ) : (
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNav onShowProducts={() => setShowMobileFilters(true)} />
    </div>
  )
}

