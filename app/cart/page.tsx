'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/cart-context'
import { useAuth } from '@/contexts/auth-context'
import { Card } from '@/components/ui/card'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const { user } = useAuth()

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <Image
            src="/assets/empty-shopping-bag.png"
            alt="Bo'sh savat"
            width={200}
            height={200}
            className="opacity-50"
          />
          <h2 className="text-2xl font-semibold">Savatingiz bo'sh</h2>
          <p className="text-muted-foreground">Mahsulotlarni savatga qo'shing.</p>
          <Button asChild>
            <Link href="/products">Xarid qilishni davom ettirish</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      toast.success("Mahsulot savatdan olib tashlandi")
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success("Savat tozalandi")
  }

  return (
    <div className="container max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Savat</h1>
        <Button variant="ghost" asChild>
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Xarid qilishni davom ettirish
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-lg border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Brend: {item.brand}</p>
                        <p className="text-sm text-muted-foreground">Kategoriya: {item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">{(item.price * item.quantity).toLocaleString()} so'm</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-6" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="destructive" onClick={handleClearCart}>
                Savatni tozalash
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Buyurtma ma'lumoti</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Mahsulotlar ({items.length})</span>
                <span>{totalPrice.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Yetkazib berish</span>
                <span>Bepul</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Jami</span>
                <span>{totalPrice.toLocaleString()} so'm</span>
              </div>
              {user ? (
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">Buyurtma berish</Link>
                </Button>
              ) : (
                <Button className="w-full" size="lg" asChild>
                  <Link href="/auth/login">Buyurtma berish uchun tizimga kiring</Link>
                </Button>
              )}
              <p className="text-xs text-center text-muted-foreground">
                Yetkazib berish narxi buyurtma berish vaqtida hisoblanadi
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 