"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"
import { useState } from "react"
import { FallbackImage } from './FallbackImage'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    onAddToCart?.(product)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    onAddToWishlist?.(product)
  }

  const discountPercentage = Math.round(((product.price - product.newPrice) / product.price) * 100)

  console.log('Loading image:', product.image)

  return (
    <Link href={`/products/${product._id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          {imageError ? (
            <FallbackImage name={product.name} category={product.category} />
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              priority
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span className="sr-only">Add to cart</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4 text-primary" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          {discountPercentage > 0 && (
            <span className="absolute left-2 top-2 bg-accent text-white px-2 py-1 text-xs font-medium rounded-md">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.brand}</span>
            <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full text-neutral-600">{product.category}</span>
          </div>
          <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2 mt-1">{product.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium text-lg text-primary">₹{product.newPrice.toLocaleString()}</span>
              {product.price !== product.newPrice && (
                <span className="text-sm text-neutral-500 line-through">₹{product.price.toLocaleString()}</span>
              )}
            </div>
            <span className="text-xs text-neutral-600">{product.gender}</span>
          </div>
          {product.quantity <= 5 && (
            <p className="mt-2 text-xs text-accent">Only {product.quantity} left in stock!</p>
          )}
        </div>
      </div>
    </Link>
  )
} 