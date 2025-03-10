"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingCart, User, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products as defaultProducts } from "@/lib/products"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useEffect, useState } from "react"
import { useInView, IntersectionOptions } from "react-intersection-observer"
import { Product } from "@/lib/types"
import { ProductCard } from "./components/ProductCard"
import { supabase } from "@/lib/supabase"
import { useCart } from "@/contexts/cart-context"
import { ProductSkeletonGrid } from "./components/ProductSkeleton"

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(true)
  const [showProducts, setShowProducts] = useState(false)
  const { ref: productSectionRef, inView } = useInView({
    threshold: 0.1,
    onChange: (inView: boolean) => {
      if (!inView) setHeaderVisible(true)
    },
  } as IntersectionOptions)
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [loading, setLoading] = useState(true)
  const { items } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')

        if (error) {
          console.error('Error fetching products:', error)
          return
        }

        if (data && data.length > 0) {
          setProducts(data as Product[])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`border-b glass sticky top-0 z-50 transition-transform duration-300 ${headerVisible ? 'header-visible' : 'header-hidden'}`}>
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowProducts(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Show products</span>
            </Button>
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Image 
                src={products[1].image}
                width={32} 
                height={32} 
                alt="Logo" 
                className="animate-float rounded-full"
              />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">VisionVogue</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
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
            <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 transition-colors">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-float">
                    See the World in Style
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover our premium collection of eyewear that combines fashion with functionality.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-colors">
                    <Link href="/products">Shop Now</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="group">
                    <Link href="/collections" className="flex items-center gap-2">
                      View Collections 
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-primary to-purple-600 opacity-25 blur-xl group-hover:opacity-75 transition duration-1000"></div>
                <Image
                  src={products[2].image}
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="relative rounded-lg object-cover w-full animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section 
          ref={productSectionRef}
          className={`fixed inset-0 bg-background/95 backdrop-blur-sm md:relative md:bg-transparent md:backdrop-blur-none w-full py-12 md:py-24 lg:py-32 transform ${
            showProducts ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 md:transform-none z-40`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 md:hidden z-50"
            onClick={() => setShowProducts(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close products</span>
          </Button>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Featured Products
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our most popular frames, handpicked for quality and style.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  View All Products 
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 glass">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 VisionVogue. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

