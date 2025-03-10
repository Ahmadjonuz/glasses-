import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/products'

export default function ProductLoading() {
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
            <div className="aspect-square relative overflow-hidden rounded-lg bg-neutral-200 animate-pulse" />
          </div>

          <div className="mt-8 lg:col-span-3 lg:mt-0">
            <div className="flex flex-col gap-6">
              <div>
                <div className="h-8 w-3/4 bg-neutral-200 rounded animate-pulse" />
                <div className="mt-1 h-4 w-1/4 bg-neutral-200 rounded animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-32 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-neutral-200 rounded animate-pulse" />
                </div>
              </div>

              <div>
                <div className="h-5 w-24 bg-neutral-200 rounded animate-pulse mb-2" />
                <div className="h-20 w-full bg-neutral-200 rounded animate-pulse" />
              </div>

              <div>
                <div className="h-5 w-16 bg-neutral-200 rounded animate-pulse mb-2" />
                <div className="h-6 w-32 bg-neutral-200 rounded animate-pulse" />
              </div>

              <div>
                <div className="h-5 w-24 bg-neutral-200 rounded animate-pulse mb-2" />
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-8 w-12 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-10 w-10 bg-neutral-200 rounded animate-pulse" />
                </div>
              </div>

              <div className="h-12 w-full bg-neutral-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 