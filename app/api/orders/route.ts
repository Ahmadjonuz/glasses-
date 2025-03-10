import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'

export async function POST(request: Request) {
  try {
    const order = await request.json()
    const client = await clientPromise
    const db = client.db('glasses_store')
    
    const result = await db.collection('orders').insertOne({
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({ 
      success: true, 
      orderId: result.insertedId 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 