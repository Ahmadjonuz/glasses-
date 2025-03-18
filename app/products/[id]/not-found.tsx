import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/products'

export default function ProductNotFound() {
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
                Bosh sahifa
              </Link>
              <Link href="/cart" className="text-sm font-medium text-neutral-500 hover:text-neutral-900">
                Savat
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Mahsulot topilmadi</h1>
          <p className="mt-2 text-lg text-neutral-500">
            Kechirasiz, siz qidirayotgan mahsulot topilmadi.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-neutral-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            >
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 