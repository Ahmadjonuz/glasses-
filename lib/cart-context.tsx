import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Cart, CartItem, Product } from './types'

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
}

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item._id === product._id)

      if (existingItem) {
        const newQuantity = existingItem.cartQuantity + quantity
        const updatedItems = state.items.map(item =>
          item._id === product._id
            ? { ...item, cartQuantity: Math.min(newQuantity, item.quantity) }
            : item
        )
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: calculateItemCount(updatedItems),
        }
      }

      const newItem: CartItem = {
        ...product,
        cartQuantity: Math.min(quantity, product.quantity),
      }

      return {
        items: [...state.items, newItem],
        total: calculateTotal([...state.items, newItem]),
        itemCount: calculateItemCount([...state.items, newItem]),
      }
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item._id !== action.payload)
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      }
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item._id === action.payload.productId
          ? { ...item, cartQuantity: Math.min(action.payload.quantity, item.quantity) }
          : item
      )
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems),
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.newPrice * item.cartQuantity, 0)
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.cartQuantity, 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
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