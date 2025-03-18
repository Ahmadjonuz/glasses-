"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"
import { useState } from "react"
import { FallbackImage } from './FallbackImage'
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useLikes } from "@/contexts/likes-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const { addToCart } = useCart()
  const { addToLikes, removeFromLikes, isLiked } = useLikes()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Ro'yxatdan o'ting",
        description: "Buyurtma berish uchun ro'yxatdan o'tishingiz kerak",
        variant: "destructive",
      })
      return
    }
    addToCart(product, 1)
  }

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      toast({
        title: "Ro'yxatdan o'ting",
        description: "Sevimlilarga qo'shish uchun ro'yxatdan o'tishingiz kerak",
        variant: "destructive",
      })
      return
    }
    if (isLiked(product._id)) {
      removeFromLikes(product._id)
    } else {
      addToLikes(product)
    }
  }

  const discountPercentage = Math.round(((product.price - product.newPrice) / product.price) * 100)

  console.log('Loading image:', product.image)

  return (
    <Link href={`/products/${product._id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md bg-card">
        <div className="relative aspect-square overflow-hidden bg-muted">
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

          {/* Discount badge */}
          {product.newPrice && product.newPrice < product.price && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              {discountPercentage}% chegirma
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {user ? (
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Savatga qo'shish</span>
              </Button>
            ) : (
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.href = '/auth/login'
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Ro'yxatdan o'tish</span>
              </Button>
            )}
            <Button
              size="icon"
              variant="secondary"
              className={`h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background ${
                isLiked(product._id) ? 'text-red-500' : ''
              }`}
              onClick={handleToggleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked(product._id) ? 'fill-current' : ''}`} />
              <span className="sr-only">Sevimlilarga qo'shish</span>
            </Button>
          </div>
        </div>

        <div className="p-4 bg-card">
          <h3 className="font-medium text-base">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">{product.newPrice || product.price} so'm</span>
              {product.newPrice && product.newPrice < product.price && (
                <span className="text-sm text-muted-foreground line-through">{product.price} so'm</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
} 