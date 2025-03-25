'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, Trash2, Check, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useLikes } from '@/contexts/likes-context'
import { useCart } from '@/contexts/cart-context'
import { useAuth } from '@/contexts/auth-context'
import { Product } from '@/lib/types'
import toast from 'react-hot-toast'

export default function LikesPage() {
  const { likedItems, removeFromLikes, clearLikes } = useLikes()
  const { addItem } = useCart()
  const { user } = useAuth()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const handleToggleSelect = (productId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedItems.size === likedItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(likedItems.map(item => item._id)))
    }
  }

  const handleRemoveSelected = () => {
    selectedItems.forEach(productId => {
      removeFromLikes(productId)
    })
    setSelectedItems(new Set())
  }

  const handleAddSelectedToCart = () => {
    selectedItems.forEach(productId => {
      const product = likedItems.find(item => item._id === productId)
      if (product) {
        handleAddToCart(product)
      }
    })
  }

  const handleAddToCart = (product: Product) => {
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
      quantity: 1
    })
    toast.success("Mahsulot savatga qo'shildi")
  }

  const handleRemoveFromLikes = (productId: string) => {
    removeFromLikes(productId)
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      newSet.delete(productId)
      return newSet
    })
    toast.success("Mahsulot sevimlilardan olib tashlandi")
  }

  if (!user) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sevimlilar</h1>
          <p className="text-muted-foreground mt-2">
            Sevimlilar ro'yxatini ko'rish uchun tizimga kiring
          </p>
          <Link href="/auth/login">
            <Button className="mt-4">
              Tizimga kirish
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (likedItems.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sevimlilar</h1>
          <p className="text-muted-foreground mt-2">
            Sevimlilar ro'yxatingiz bo'sh
          </p>
          <Link href="/products">
            <Button className="mt-4">
              Mahsulotlar ro'yxatiga o'tish
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-8 hover:scale-105 transition-transform"
          asChild
        >
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Orqaga
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Sevimli mahsulotlar</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              className="flex items-center gap-2"
            >
              {selectedItems.size === likedItems.length ? (
                <>
                  <Check className="h-4 w-4" />
                  Barchasini bekor qilish
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Barchasini tanlash
                </>
              )}
            </Button>
            {selectedItems.size > 0 && (
              <>
                <Button
                  variant="destructive"
                  onClick={handleRemoveSelected}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Tanlanganlarni o'chirish
                </Button>
                <Button
                  onClick={handleAddSelectedToCart}
                  className="flex items-center gap-2"
                >
                  Tanlanganlarni savatga qo'shish
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {likedItems.map((product) => (
            <Card
              key={product._id}
              className={`group relative overflow-hidden transition-colors hover:bg-accent ${
                selectedItems.has(product._id) ? 'border-primary' : ''
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => handleToggleSelect(product._id)}
                >
                  <Check className={`h-4 w-4 ${selectedItems.has(product._id) ? 'text-primary' : ''}`} />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{product.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">{(product.newPrice || product.price).toLocaleString()} so'm</span>
                    {product.newPrice && product.newPrice < product.price && (
                      <span className="text-sm text-muted-foreground line-through">{product.price.toLocaleString()} so'm</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemoveFromLikes(product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Savatga qo'shish
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
} 