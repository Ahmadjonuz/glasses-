'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Wallet, BanknoteIcon, ShoppingCart } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCart } from '@/contexts/cart-context'
import { useOrders } from '@/contexts/orders-context'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

const formSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Invalid PIN code'),
})

type FormData = z.infer<typeof formSchema>

const SHIPPING_OPTIONS = [
  { id: 'free', label: 'Free Shipping', price: 0, time: '5-7 business days' },
  { id: 'standard', label: 'Standard', price: 40, time: '2-4 business days' },
  { id: 'express', label: 'Express', price: 80, time: '1-2 business days' },
]

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  { id: 'upi', label: 'UPI Payment', icon: Wallet },
  { id: 'cod', label: 'Cash on Delivery', icon: BanknoteIcon },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, getCartTotal } = useCart()
  const { addOrder } = useOrders()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_OPTIONS[0].id)
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id)
  const [mounted, setMounted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !user) {
      router.push('/auth/login')
      toast({
        title: "Ro'yxatdan o'ting",
        description: "Buyurtma berish uchun ro'yxatdan o'tishingiz kerak",
        variant: "destructive",
      })
    }
  }, [mounted, user, router, toast])

  const shippingCost = SHIPPING_OPTIONS.find(option => option.id === shippingMethod)?.price || 0
  const subtotal = getCartTotal()
  const total = subtotal + shippingCost

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      
      // Create order object
      const order = {
        items,
        shipping: {
          ...data,
          method: SHIPPING_OPTIONS.find(option => option.id === shippingMethod)?.label || 'Free Shipping',
          cost: shippingCost
        },
        payment: {
          method: PAYMENT_METHODS.find(method => method.id === paymentMethod)?.label || 'Credit Card',
          total
        },
        status: 'pending'
      }

      // Add order to history
      addOrder(order)
      
      // Clear cart after successful order
      clearCart()
      
      // Show success message
      toast({
        title: "Buyurtma muvaffaqiyatli qabul qilindi!",
        description: "Buyurtma ma'lumotlari emailingizga yuborildi.",
      })

      // Redirect to success page
      router.push('/checkout/success')
    } catch (error) {
      console.error('Order submission error:', error)
      toast({
        title: "Xatolik yuz berdi",
        description: "Buyurtma berishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted || !user) {
    return null
  }

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

  return (
    <div className="container max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Buyurtma berish</h1>
        <Button variant="ghost" asChild>
          <Link href="/cart" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Savatga qaytish
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Yetkazib berish ma'lumotlari</h2>
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Annasxon" 
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Ahmadxonov" 
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="annasxon@example.com" 
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+998 99 123 45 67" 
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Manzil</Label>
                  <Input 
                    id="address" 
                    placeholder="Toshkent shahar, Chilonzor tumani, 123-uy" 
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Shahar</Label>
                    <Input 
                      id="city" 
                      placeholder="Toshkent" 
                      {...register('city')}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Viloyat</Label>
                    <Select onValueChange={(value) => setValue('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Viloyatni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Toshkent">Toshkent</SelectItem>
                        <SelectItem value="Andijon">Andijon</SelectItem>
                        <SelectItem value="Buxoro">Buxoro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-sm text-red-500">{errors.state.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pochta indeksi</Label>
                    <Input 
                      id="pincode" 
                      placeholder="100001" 
                      {...register('pincode')}
                    />
                    {errors.pincode && (
                      <p className="text-sm text-red-500">{errors.pincode.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Shipping Method</Label>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="grid gap-4"
                    >
                      {SHIPPING_OPTIONS.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex flex-1 items-center justify-between">
                            <div>
                              <span className="font-medium">{option.label}</span>
                              <p className="text-sm text-muted-foreground">{option.time}</p>
                            </div>
                            <span className="font-medium">
                              {option.price === 0 ? 'Free' : `₹${option.price}`}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid gap-4"
              >
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex items-center space-x-2">
                      <method.icon className="h-5 w-5" />
                      <span>{method.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Buyurtma ma'lumoti</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Mahsulotlar ({items.length})</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish</span>
                  <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Jami</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Buyurtmani tasdiqlash'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
} 