"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingCart, User, X, Menu, Heart, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products as defaultProducts } from "@/lib/products"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Product } from "@/lib/types"
import { ProductCard } from "./components/ProductCard"
import { useCart } from "@/contexts/cart-context"
import { useLikes } from "@/contexts/likes-context"
import { ProductSkeletonGrid } from "./components/ProductSkeleton"
import { useAuth } from "@/contexts/auth-context"
import { HeroSlider } from "./components/HeroSlider"
import { MobileNav } from "./components/MobileNav"

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [showProducts, setShowProducts] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { ref: productSectionRef, inView } = useInView({
    threshold: 0.1,
    onChange: (inView: boolean) => {
      if (!inView) setHeaderVisible(true)
    },
  })
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { items } = useCart()
  const { likedItems } = useLikes()
  const { user } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true)
      setProducts(defaultProducts)
      setLoading(false)
    }
  }, [])

  if (!mounted) {
    return <ProductSkeletonGrid />
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Header */}
      <header className={`border-b glass sticky top-0 z-50 transition-transform duration-300 ${headerVisible ? 'header-visible' : 'header-hidden'} hidden md:block`}>
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              {mounted && products[1] && (
                <Image 
                  src={products[1].image}
                  width={32} 
                  height={32} 
                  alt="Logo" 
                  className="animate-float rounded-full"
                />
              )}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">VisionVogue</span>
            </Link>
          </div>
          <nav className="flex gap-6">
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
            {user && (
              <Link href="/orders" className="hover:scale-110 transition-transform" title="Buyurtmalarim">
                <Package className="h-5 w-5" />
              </Link>
            )}
            <Link href="/account" className="hover:scale-110 transition-transform">
              <User className="h-5 w-5" />
            </Link>
            {!user && (
              <Button asChild className="bg-primary hover:bg-primary/90 transition-colors">
                <Link href="/auth/login">Kirish</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b md:hidden">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            {mounted && products[1] && (
              <Image 
                src={products[1].image}
                width={28} 
                height={28} 
                alt="Logo" 
                className="rounded-full"
              />
            )}
            <span className="font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              VisionVogue
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {mounted && items.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {items.reduce((total, item) => total + item.cartQuantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSlider />
        <section className="w-full py-12 md:py-24 lg:py-32" ref={productSectionRef}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Mashhur mahsulotlar
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Eng sifatli va zamonaviy ko'zoynaklarimiz.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 py-8 md:grid-cols-3 lg:grid-cols-4">
              {loading ? (
                <ProductSkeletonGrid />
              ) : (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))
              )}
            </div>
            <div className="flex justify-center">
              <Button asChild variant="outline" className="group">
                <Link href="/products" className="flex items-center gap-2">
                  Barcha mahsulotlarni ko'rish 
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <MobileNav onShowProducts={() => setShowProducts(true)} />

      <footer className="border-t py-6 md:py-0 glass">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 VisionVogue. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Foydalanish shartlari
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Maxfiylik siyosati
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

