"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react'
import { products } from '@/lib/products'
import { FallbackImage } from '@/app/components/FallbackImage'
import { useCart } from '@/contexts/cart-context'
import { useLikes } from '@/contexts/likes-context'
import { useAuth } from '@/contexts/auth-context'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ProductSlider } from '@/app/components/ProductSlider'
import { useToast } from '@/components/ui/use-toast'
import toast from 'react-hot-toast'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProductPage() {
  const params = useParams()
  const { addItem } = useCart()
  const { addToLikes, removeFromLikes, isLiked } = useLikes()
  const { user } = useAuth()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const foundProduct = products.find(p => p._id === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Mahsulot topilmadi</h1>
          <p className="text-muted-foreground mt-2">Bunday mahsulot mavjud emas.</p>
          <Link href="/products">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Mahsulotlar ro'yxatiga qaytish
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get similar products (same category, excluding current product)
  const similarProducts = (products || [])
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 8)

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Ro'yxatdan o'ting",
        description: "Buyurtma berish uchun ro'yxatdan o'tishingiz kerak",
        variant: "destructive",
      })
      return
    }
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    })
    toast.success("Mahsulot savatga qo'shildi")
  }

  const handleToggleLike = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Mahsulotlar ro'yxatiga qaytish
          </Button>
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{(product.newPrice || product.price).toLocaleString()} so'm</span>
                {product.newPrice && product.newPrice < product.price && (
                  <span className="text-xl text-muted-foreground line-through">{product.price.toLocaleString()} so'm</span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`ml-auto ${isLiked(product._id) ? 'text-red-500' : ''}`}
                onClick={handleToggleLike}
              >
                <Heart className={`h-6 w-6 ${isLiked(product._id) ? 'fill-current' : ''}`} />
                <span className="sr-only">
                  {isLiked(product._id) ? 'Sevimlilarga qo\'shilgan' : 'Sevimlilarga qo\'shish'}
                </span>
              </Button>
            </div>

            <div className="space-y-4">
              {user ? (
                <>
                  <div>
                    <h2 className="text-xl font-semibold">Miqdor</h2>
                    <div className="mt-2 flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="text-lg font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Savatga qo'shish
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link href="/auth/login">
                    Buyurtma berish uchun tizimga kiring
                  </Link>
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <p><strong>Brend:</strong> {product.brand}</p>
              <p><strong>Kategoriya:</strong> {product.category}</p>
              <p><strong>Vazni:</strong> {product.weight}</p>
              {product.features && product.features.length > 0 && (
                <div>
                  <strong>Xususiyatlari:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <ProductSlider
              products={similarProducts}
              title="O'xshash mahsulotlar"
            />
          </div>
        )}
      </main>
    </div>
  )
}

function ClientImage({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false)

  return imageError ? (
    <FallbackImage name={product.name} category={product.category} />
  ) : (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
      className="object-cover"
      priority
      onError={() => setImageError(true)}
    />
  )
}

