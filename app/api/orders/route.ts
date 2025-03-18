import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/db'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    if (!client) {
      console.warn('MongoDB connection not available')
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      )
    }

    const data = await request.json()
    const { userId, products, totalPrice } = data

    const db = client.db()
    const orders = db.collection('orders')

    const result = await orders.insertOne({
      userId: new ObjectId(userId),
      products,
      totalPrice,
      createdAt: new Date(),
      status: 'pending'
    })

    return NextResponse.json({ orderId: result.insertedId })
  } catch (error) {
    console.error('Error in orders API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 