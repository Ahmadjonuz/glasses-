'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

interface Category {
  id: string
  name: string
  description: string
  image: string
}

export default function CollectionsPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="container max-w-6xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Collections</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our carefully curated collections of premium eyewear, featuring the latest styles and timeless classics.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="animate-pulse">
              <div className="aspect-[4/3] bg-muted" />
              <div className="p-6 space-y-2">
                <div className="h-6 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.name}`}>
              <Card className="group overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 