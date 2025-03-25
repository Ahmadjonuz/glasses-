"use client"

import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useLikes } from "@/contexts/likes-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  oldPrice?: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToLikes, removeFromLikes, isLiked } = useLikes()
  const { user } = useAuth()

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    toast.success("Mahsulot savatga qo'shildi")
  }

  const handleToggleLike = () => {
    if (!user) {
      toast.error("Sevimlilarga qo'shish uchun tizimga kiring")
      return
    }
    if (isLiked(product._id)) {
      removeFromLikes(product._id)
      toast.success("Sevimlilarga olib tashlandi")
    } else {
      addToLikes(product)
      toast.success("Sevimlilarga qo'shildi")
    }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('uz-UZ')
  }

  return (
    <div className="group relative bg-card rounded-lg border-2 hover:border-primary/50 transition-colors">
      <Link href={`/products/${product._id}`}>
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background ${isLiked(product._id) ? 'text-red-500' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              handleToggleLike()
            }}
          >
            <Heart className={`h-5 w-5 ${isLiked(product._id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </Link>

      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <Link href={`/products/${product._id}`}>
              <h3 className="font-semibold leading-none tracking-tight line-clamp-2">
                {product.name}
              </h3>
            </Link>
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              {formatPrice(product.price)} so'm
            </p>
            {product.oldPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)} so'm
              </p>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
          <Link href={`/products/${product._id}`}>
            <Button variant="secondary" className="flex-1">
              Batafsil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 