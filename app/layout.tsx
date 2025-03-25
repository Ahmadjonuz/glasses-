import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/cart-context'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { LikesProvider } from '@/contexts/likes-context'
import { OrdersProvider } from '@/contexts/orders-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VisionVogue - Ko\'zoynaklar do\'koni',
  description: 'VisionVogue\'da o\'zingizga mos ko\'zoynaklarni toping',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <OrdersProvider>
                <LikesProvider>
                  <div className="flex flex-col min-h-screen">
                    <main className="flex-1">
                      {children}
                    </main>
                  </div>
                  <Toaster />
                  <SonnerToaster />
                </LikesProvider>
              </OrdersProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
