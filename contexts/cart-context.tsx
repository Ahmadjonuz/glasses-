'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/lib/types'
import { useToast } from "@/components/ui/use-toast"

interface CartItem extends Product {
  cartQuantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'visionvogue-cart'

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Error loading cart from storage:', error)
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage)
  const { toast } = useToast()

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, quantity = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item._id === product._id)
      
      if (existingItem) {
        return currentItems.map(item =>
          item._id === product._id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        )
      }

      return [...currentItems, { ...product, cartQuantity: quantity }]
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`,
      duration: 2000,
    })
  }

  const removeFromCart = (productId: string) => {
    const itemToRemove = items.find(item => item._id === productId)
    setItems(currentItems => currentItems.filter(item => item._id !== productId))
    if (itemToRemove) {
      toast({
        title: "Removed from Cart",
        description: `${itemToRemove.name} removed from your cart`,
        duration: 2000,
      })
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const itemToUpdate = items.find(item => item._id === productId)
    setItems(currentItems =>
      currentItems.map(item =>
        item._id === productId
          ? { ...item, cartQuantity: quantity }
          : item
      )
    )
    if (itemToUpdate) {
      toast({
        title: "Cart Updated",
        description: `${itemToUpdate.name} quantity updated to ${quantity}`,
        duration: 2000,
      })
    }
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
      duration: 2000,
    })
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.newPrice * item.cartQuantity), 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 