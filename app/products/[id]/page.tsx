"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { products } from '@/lib/products'
import { FallbackImage } from '@/app/components/FallbackImage'
import { useCart } from '@/contexts/cart-context'
import type { Product } from '@/lib/types'

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const product = (products || []).find((p) => p._id === params.id) as Product

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={products[1].image}
                alt="VisionVogue Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-semibold bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                VisionVogue
              </span>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
                Home
              </Link>
              <Link href="/cart" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:col-span-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-100">
              <ClientImage product={product as any} />
            </div>
          </div>

          <div className="mt-8 lg:col-span-3 lg:mt-0">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">{product.name}</h1>
                <p className="mt-1 text-sm text-neutral-500">{product.category}</p>
              </div>

              <div>
                <h2 className="sr-only">Product information</h2>
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-neutral-900">${product.newPrice}</p>
                  {product.price !== product.newPrice && (
                    <p className="text-lg text-neutral-500 line-through">${product.price}</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-neutral-900">Description</h2>
                <p className="mt-2 text-sm text-neutral-500">{product.description}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-neutral-900">Brand</h2>
                <p className="mt-2 text-sm text-neutral-500">{product.brand}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-neutral-900">Quantity</h2>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-neutral-100 p-2 text-neutral-900 hover:bg-neutral-200"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <button
                    type="button"
                    className="rounded-md bg-neutral-100 p-2 text-neutral-900 hover:bg-neutral-200"
                    onClick={() => setQuantity(q => Math.min(product.quantity, q + 1))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-neutral-900 px-8 py-3 text-base font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ClientImage({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false)

  return imageError ? (
    <FallbackImage name={product.name} category={product.category} />
  ) : (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
      className="object-cover"
      priority
      onError={() => setImageError(true)}
    />
  )
}

