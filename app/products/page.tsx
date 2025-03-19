"use client"

import { useEffect, useState, Suspense } from 'react'
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
import { ProductSkeletonGrid } from "../components/ProductSkeleton"

type FilterType = 'categories' | 'brands' | 'genders' | 'priceRanges'

interface Filters {
  categories: string[]
  brands: string[]
  genders: string[]
  priceRanges: string[]
}

function ProductList() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search")?.toLowerCase() || ""
  const category = searchParams.get("category") || ""

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search) ||
                         product.description.toLowerCase().includes(search)
    const matchesCategory = !category || product.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  )
}

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
                <Suspense fallback={<ProductSkeletonGrid />}>
                  <ProductList />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNav onShowProducts={() => setShowMobileFilters(true)} />
    </div>
  )
}

