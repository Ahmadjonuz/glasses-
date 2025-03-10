import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getAllCategories } from '@/lib/products'

const images: Record<string, string> = {
  'Sunglasses': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
  'Eyeglasses': 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1000&auto=format&fit=crop',
  'Sports Eyewear': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
  'Kids Eyewear': 'https://images.unsplash.com/photo-1577744486770-2f42fd04686f?q=80&w=1000&auto=format&fit=crop',
  'Designer Frames': 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1000&auto=format&fit=crop',
  'Reading Glasses': 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1000&auto=format&fit=crop'
}

export async function GET() {
  try {
    // Try to get categories from Supabase first
    const { data: dbCategories, error } = await supabase
      .from('products')
      .select('category')
      .order('category')

    // If there's an error or no data, fall back to local categories
    const categories = error || !dbCategories 
      ? getAllCategories()
      : [...new Set(dbCategories.map(p => p.category))]

    const categoriesWithImages = categories.map(category => ({
      name: category,
      image: images[category] || images['Eyeglasses'] // fallback image
    }))

    return NextResponse.json(categoriesWithImages)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
} 