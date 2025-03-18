'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useCart } from '@/contexts/cart-context'
import { useLikes } from '@/contexts/likes-context'

export function Header() {
  const { user } = useAuth()
  const { items } = useCart()
  const { likedItems } = useLikes()

  return (
    <header className="border-b glass sticky top-0 z-50 transition-transform duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              VisionVogue
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-4">
            <Link href="/likes" className="relative hover:scale-110 transition-transform">
              <Heart className="h-5 w-5" />
              {likedItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-in zoom-in">
                  {likedItems.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative hover:scale-110 transition-transform">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground animate-in zoom-in">
                  {items.reduce((total, item) => total + item.cartQuantity, 0)}
                </span>
              )}
            </Link>
            <Link href="/account" className="hover:scale-110 transition-transform">
              <User className="h-5 w-5" />
            </Link>
            {!user && (
              <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 transition-colors">
                <Link href="/auth/login">Kirish</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 