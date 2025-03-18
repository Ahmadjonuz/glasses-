'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem } from '@/lib/types'

interface Order {
  id: string
  items: CartItem[]
  shipping: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
    method: string
    cost: number
  }
  payment: {
    method: string
    total: number
  }
  status: string
  createdAt: string
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void
  cancelOrder: (orderId: string) => void
  deleteOrder: (orderId: string) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

const ORDERS_STORAGE_KEY = 'visionvogue-orders'

function loadOrdersFromStorage(): Order[] {
  if (typeof window === 'undefined') return []
  try {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)
    return savedOrders ? JSON.parse(savedOrders) : []
  } catch (error) {
    console.error('Error loading orders from storage:', error)
    return []
  }
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrdersFromStorage)

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const addOrder = (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    setOrders(prevOrders => [newOrder, ...prevOrders])
  }

  const cancelOrder = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' }
          : order
      )
    )
  }

  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, cancelOrder, deleteOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
} 