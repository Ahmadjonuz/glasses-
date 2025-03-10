'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Wallet, BanknoteIcon, ShoppingCart } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCart } from '@/contexts/cart-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'

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
  const { cart, clearCart } = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_OPTIONS[0].id)
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const shippingCost = SHIPPING_OPTIONS.find(option => option.id === shippingMethod)?.price || 0
  const total = cart.total + shippingCost

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      
      // Create order object
      const order = {
        items: cart.items,
        shipping: {
          ...data,
          method: shippingMethod,
          cost: shippingCost,
        },
        payment: {
          method: paymentMethod,
          total: total,
        },
        status: 'pending',
      }

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      // Clear cart after successful order
      clearCart()
      
      // Show success message
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. We'll send you an email with order details.",
      })

      // Redirect to success page
      router.push('/checkout/success')
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="container max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="rounded-full bg-muted p-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some items to your cart to proceed to checkout.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
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
                      placeholder="Doe" 
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
                    placeholder="john@example.com" 
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 1234567890" 
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Main St" 
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Mumbai" 
                      {...register('city')}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select onValueChange={(value) => register('state').onChange({ target: { value } })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mh">Maharashtra</SelectItem>
                        <SelectItem value="dl">Delhi</SelectItem>
                        <SelectItem value="ka">Karnataka</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-sm text-red-500">{errors.state.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input 
                      id="pincode" 
                      placeholder="400001" 
                      {...register('pincode')}
                    />
                    {errors.pincode && (
                      <p className="text-sm text-red-500">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Shipping Method */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="space-y-4">
                  {SHIPPING_OPTIONS.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.time}</div>
                          </div>
                          <div className="font-medium">
                            {option.price === 0 ? 'FREE' : `₹${option.price}`}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Label htmlFor={method.id} className="flex items-center gap-2">
                        <method.icon className="h-5 w-5" />
                        {method.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.cartQuantity}</span>
                      <span>₹{(item.newPrice * item.cartQuantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
} 