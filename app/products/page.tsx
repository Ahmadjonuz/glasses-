"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "../../components/header"

const categories = [
  { id: 'all', name: 'Barcha' },
  { id: 'Sunglasses', name: 'Quyosh ko\'zoynak' },
  { id: 'Vision', name: 'Ko\'zoynak' },
  { id: 'Sports', name: 'Sport' },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-12">
        <div className="flex flex-col gap-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Barcha mahsulotlar</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bizning barcha ko'zoynaklar to'plami. Zamonaviy dizayn va yuqori sifatli materiallardan tayyorlangan ko'zoynaklarimizni tanlang.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="min-w-[120px]"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Footer Section */}
          <div className="text-center text-muted-foreground">
            <p>Jami {filteredProducts.length} ta mahsulot</p>
          </div>
        </div>
      </div>
    </div>
  )
}

