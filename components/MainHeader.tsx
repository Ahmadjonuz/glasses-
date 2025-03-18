"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useLikes } from "@/contexts/likes-context"
import { useState, useEffect } from "react"

interface MainHeaderProps {
  onShowProducts?: () => void
  showMobileMenu?: boolean
  products?: any[]
}

export function MainHeader({ onShowProducts, showMobileMenu = false, products = [] }: MainHeaderProps) {
  const [mounted, setMounted] = useState(false)
  const { items } = useCart()
  const { user } = useAuth()
  const { likedItems } = useLikes()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-b glass sticky top-0 z-50 transition-transform duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {showMobileMenu && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onShowProducts}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Mahsulotlarni ko'rsatish</span>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            {mounted && products[1] && (
              <Image 
                src={products[1].image}
                width={32} 
                height={32} 
                alt="Logotip" 
                className="animate-float rounded-full"
              />
            )}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">VisionVogue</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Bosh sahifa
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Do'kon
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Aloqa
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/likes" className="relative hover:scale-110 transition-transform">
            <Heart className="h-5 w-5" />
            {mounted && likedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-in zoom-in">
                {likedItems.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative hover:scale-110 transition-transform">
            <ShoppingCart className="h-5 w-5" />
            {mounted && items.length > 0 && (
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
        </div>
      </div>
    </header>
  )
} 