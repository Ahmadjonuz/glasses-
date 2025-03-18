'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '@/types'

interface LikesContextType {
  likedItems: Product[]
  addToLikes: (product: Product) => void
  removeFromLikes: (productId: string) => void
  isLiked: (productId: string) => boolean
}

const LikesContext = createContext<LikesContextType | undefined>(undefined)

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likedItems, setLikedItems] = useState<Product[]>([])
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load liked items from localStorage on mount
  useEffect(() => {
    if (isClient) {
      try {
        const savedLikes = localStorage.getItem('likedItems')
        if (savedLikes) {
          setLikedItems(JSON.parse(savedLikes))
        }
      } catch (error) {
        console.error('Error loading likes from localStorage:', error)
      }
    }
  }, [isClient])

  // Save liked items to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('likedItems', JSON.stringify(likedItems))
      } catch (error) {
        console.error('Error saving likes to localStorage:', error)
      }
    }
  }, [likedItems, isClient])

  const addToLikes = (product: Product) => {
    setLikedItems((prev) => {
      if (!prev.find((item) => item._id === product._id)) {
        return [...prev, product]
      }
      return prev
    })
  }

  const removeFromLikes = (productId: string) => {
    setLikedItems((prev) => prev.filter((item) => item._id !== productId))
  }

  const isLiked = (productId: string) => {
    return likedItems.some((item) => item._id === productId)
  }

  return (
    <LikesContext.Provider value={{ likedItems, addToLikes, removeFromLikes, isLiked }}>
      {children}
    </LikesContext.Provider>
  )
}

export function useLikes() {
  const context = useContext(LikesContext)
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider')
  }
  return context
} 