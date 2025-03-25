"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuth } from "@/contexts/auth-context"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  items: OrderItem[]
  createdAt: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) return
    
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Buyurtmalar tarixi</h1>
          <p className="text-muted-foreground mt-2">
            Buyurtmalar tarixini ko'rish uchun tizimga kiring
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

  if (orders.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Buyurtmalar tarixi</h1>
          <p className="text-muted-foreground mt-2">
            Sizda hali buyurtmalar yo'q
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
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Buyurtmalar tarixi</h1>
        <Button variant="outline" asChild>
          <Link href="/products">
            Xarid qilishni davom ettirish
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahsulot</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead>Narxi</TableHead>
              <TableHead>Soni</TableHead>
              <TableHead>Jami</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Holat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              order.items.map((item) => (
                <TableRow key={`${order.id}-${item.id}`}>
                  <TableCell>
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.price.toLocaleString()} so'm</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {(item.price * item.quantity).toLocaleString()} so'm
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), 'dd.MM.yyyy')}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'pending' ? 'Kutilmoqda' :
                       order.status === 'processing' ? 'Jarayonda' :
                       order.status === 'completed' ? 'Yakunlandi' :
                       'Bekor qilindi'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 