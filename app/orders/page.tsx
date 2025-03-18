"use client"

import { useOrders } from "@/contexts/orders-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, XCircle } from "lucide-react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { uz } from "date-fns/locale"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

export default function OrdersPage() {
  const { orders, deleteOrder, cancelOrder } = useOrders()
  const { toast } = useToast()

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId)
    toast({
      title: "Buyurtma o'chirildi",
      description: "Bekor qilingan buyurtma muvaffaqiyatli o'chirildi",
    })
  }

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId)
    toast({
      title: "Buyurtma bekor qilindi",
      description: "Buyurtma muvaffaqiyatli bekor qilindi",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Buyurtmalarim</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Sizda hali buyurtmalar yo'q</p>
          <Button asChild>
            <Link href="/products">Xarid qilish</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Buyurtma raqami: {order.id}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sana: {format(new Date(order.createdAt), "d MMMM yyyy", { locale: uz })}
                  </p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="font-medium">
                    Jami: {order.payment.total.toLocaleString()} so'm
                  </p>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm ${
                      order.status === "completed" ? "text-green-500" :
                      order.status === "pending" ? "text-yellow-500" :
                      "text-red-500"
                    }`}>
                      {order.status === "completed" ? "Tugallandi" :
                       order.status === "pending" ? "Kutilmoqda" :
                       "Bekor qilingan"}
                    </p>
                    {order.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                    {order.status === "cancelled" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mahsulot</TableHead>
                    <TableHead>Narxi</TableHead>
                    <TableHead>Soni</TableHead>
                    <TableHead>Jami</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.newPrice.toLocaleString()} so'm</TableCell>
                      <TableCell>{item.cartQuantity}</TableCell>
                      <TableCell>
                        {(item.newPrice * item.cartQuantity).toLocaleString()} so'm
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 