'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="container max-w-6xl px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold">Buyurtma muvaffaqiyatli qabul qilindi!</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Buyurtma ma'lumotlari emailingizga yuborildi. Biz sizning buyurtmangizni tez orada ko'rib chiqamiz.
        </p>
        <div className="flex gap-4 pt-4">
          <Button asChild>
            <Link href="/products">Xarid qilishni davom ettirish</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/orders">Buyurtmalarim</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 