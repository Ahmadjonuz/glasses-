'use client'

import { useOrders } from '@/contexts/orders-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Package, CreditCard, MapPin, Calendar, User, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { orders } = useOrders()
  const order = orders.find(o => o.id === params.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="container max-w-6xl px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Buyurtma #{order.id}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Buyurtma mahsulotlari</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x {item.price.toLocaleString()} so'm
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Shipping Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Yetkazib berish ma'lumotlari</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>
                  {order.shipping.firstName} {order.shipping.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{order.shipping.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{order.shipping.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {order.shipping.address}, {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{order.shipping.method}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Buyurtma ma'lumoti</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString('uz-UZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {order.payment.method}
                </span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Mahsulotlar ({order.items.length})</span>
                  <span>{(order.payment.total - order.shipping.cost).toLocaleString()} so'm</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Yetkazib berish</span>
                  <span>{order.shipping.cost.toLocaleString()} so'm</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Jami</span>
                  <span>{order.payment.total.toLocaleString()} so'm</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 