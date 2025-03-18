import Link from "next/link"
import { Home, ShoppingBag, Heart, User, Menu, X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useLikes } from "@/contexts/likes-context"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  onShowProducts: () => void
}

export function MobileNav({ onShowProducts }: MobileNavProps) {
  const { items } = useCart()
  const { likedItems } = useLikes()
  const { user } = useAuth()

  const cartItemsCount = items.reduce((total, item) => total + item.cartQuantity, 0)

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="grid grid-cols-5 gap-1 p-2">
          <Link href="/" className="flex flex-col items-center justify-center py-2">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Bosh sahifa</span>
          </Link>
          <Link href="/products" className="flex flex-col items-center justify-center py-2">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">Do'kon</span>
          </Link>
          <Link href="/likes" className="flex flex-col items-center justify-center py-2 relative">
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">Sevimli</span>
            {likedItems.length > 0 && (
              <span className="absolute top-1 right-4 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {likedItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <Link href="/orders" className="flex flex-col items-center justify-center py-2">
              <Package className="h-5 w-5" />
              <span className="text-xs mt-1">Buyurtmalar</span>
            </Link>
          ) : (
            <Link href="/auth/login" className="flex flex-col items-center justify-center py-2">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Kirish</span>
            </Link>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="w-full h-full flex flex-col items-center justify-center">
                <Menu className="h-5 w-5" />
                <span className="text-xs mt-1">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium">
                  Bosh sahifa
                </Link>
                <Link href="/products" className="text-lg font-medium">
                  Do'kon
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Aloqa
                </Link>
                {user ? (
                  <>
                    <Link href="/orders" className="text-lg font-medium">
                      Buyurtmalar
                    </Link>
                    <Link href="/account" className="text-lg font-medium">
                      Profil
                    </Link>
                  </>
                ) : (
                  <Link href="/auth/login" className="text-lg font-medium">
                    Kirish
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Add padding to main content to account for bottom navigation */}
      <div className="pb-16 md:pb-0" />
    </>
  )
} 