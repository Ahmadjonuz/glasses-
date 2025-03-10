'use client'

import Link from 'next/link'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function CheckoutSuccessPage() {
  return (
    <div className="container max-w-6xl px-4 py-16">
      <Card className="max-w-lg mx-auto p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. We have sent you an email with your order details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 