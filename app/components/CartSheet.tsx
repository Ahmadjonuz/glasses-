import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.itemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {cart.itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cart.itemCount} items)</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cart.items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2">
              <Image
                src="/assets/empty-shopping-bag.png"
                alt="Empty cart"
                width={150}
                height={150}
                className="opacity-50"
              />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some items to your cart to see them here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₹{item.newPrice}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item._id, item.cartQuantity - 1)}
                        disabled={item.cartQuantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.cartQuantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item._id, item.cartQuantity + 1)}
                        disabled={item.cartQuantity >= item.quantity}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.items.length > 0 && (
          <div className="mt-auto space-y-4">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">₹{cart.total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes will be calculated at checkout
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
} 