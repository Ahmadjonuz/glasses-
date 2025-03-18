"use client"

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FilterSidebar } from '@/components/FilterSidebar'
import { Product } from '@/lib/types'
import { createClient } from '@supabase/supabase-js'
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const { items } = useCart()

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
                    <div>Yuklanmoqda...</div>
                  ) : (
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  )}
                  {isLoading ? (
                    <div>Yuklanmoqda...</div>
                  ) : products.length === 0 ? (
                    <div className="text-center col-span-full py-12">
                      <h3 className="text-lg font-semibold">Mahsulotlar topilmadi</h3>
                      <p className="text-muted-foreground mt-2">
                        Boshqa filtrlash parametrlarini tanlashga harakat qiling.
                      </p>
                    </div>
                  ) : null}
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

