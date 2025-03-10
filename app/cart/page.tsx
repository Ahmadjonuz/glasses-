'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/cart-context'
import { Card } from '@/components/ui/card'
export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <Image
            src="/assets/empty-shopping-bag.png"
            alt="Empty cart"
            width={200}
            height={200}
            className="opacity-50"
          />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some items to your cart to see them here.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="ghost" asChild>
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item._id}>
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
                        <p className="text-sm text-muted-foreground">Brand: {item.brand}</p>
                        <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item._id, item.cartQuantity - 1)}
                            disabled={item.cartQuantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.cartQuantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item._id, item.cartQuantity + 1)}
                            disabled={item.cartQuantity >= item.quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">₹{(item.newPrice * item.cartQuantity).toFixed(2)}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item._id)}
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
              <Button variant="destructive" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Items ({items.length})</span>
                <span>₹{items.reduce((total: number, item: any) => total + item.newPrice * item.cartQuantity, 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{items.reduce((total: number, item: any) => total + item.newPrice * item.cartQuantity, 0).toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Shipping and taxes will be calculated at checkout
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 