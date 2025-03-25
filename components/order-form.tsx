"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast'
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  phone: z.string().min(9, "Telefon raqami kamida 9 ta raqamdan iborat bo'lishi kerak"),
  address: z.string().min(10, "Manzil kamida 10 ta harfdan iborat bo'lishi kerak"),
})

interface OrderFormProps {
  productId: string
  productName: string
  productPrice: number
}

export function OrderForm({ productId, productName, productPrice }: OrderFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          productId,
          productName,
          productPrice,
        }),
      })

      if (!response.ok) {
        throw new Error("Buyurtma yuborishda xatolik yuz berdi")
      }

      toast.success("Buyurtma muvaffaqiyatli yuborildi!", {
        description: "Tez orada siz bilan bog'lanamiz",
      })
      
      // Reset form
      form.reset()
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error("Order submission error:", error)
      toast.error("Xatolik yuz berdi", {
        description: "Iltimos, qayta urinib ko'ring",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ismingiz</FormLabel>
              <FormControl>
                <Input placeholder="Ismingizni kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon raqamingiz</FormLabel>
              <FormControl>
                <Input placeholder="Telefon raqamingizni kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yetkazib berish manzili</FormLabel>
              <FormControl>
                <Input placeholder="Manzilingizni kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Buyurtma yuborilmoqda...
            </>
          ) : (
            "Buyurtma berish"
          )}
        </Button>
      </form>
    </Form>
  )
} 