import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/db'
import { ObjectId } from 'mongodb'
import { MONGODB_URI } from '@/lib/env'

// This prevents build-time errors by checking the environment during runtime only
if (process.env.NODE_ENV === 'development' && !MONGODB_URI) {
  console.warn('MongoDB URI is required for the orders API to function properly')
}

export async function POST(request: Request) {
  if (!MONGODB_URI) {
    return NextResponse.json(
      { error: 'Database configuration is not available' },
      { status: 503 }
    )
  }

  try {
    const client = await clientPromise
    const data = await request.json()
    const { userId, products, totalPrice } = data

    if (!userId || !products || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = client.db('glasses_store')
    const orders = db.collection('orders')

    const result = await orders.insertOne({
      userId: new ObjectId(userId),
      products,
      totalPrice,
      createdAt: new Date(),
      status: 'pending'
    })

    return NextResponse.json({ 
      success: true,
      orderId: result.insertedId.toString() 
    })
  } catch (error) {
    console.error('Error in orders API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 