import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

// Static storage for orders
let orders: any[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, phone, address, productId, productName, productPrice } = data

    if (!name || !phone || !address || !productId || !productName || !productPrice) {
      return NextResponse.json(
        { error: 'Barcha maydonlarni to\'ldiring' },
        { status: 400 }
      )
    }

    // Create new order
    const newOrder = {
      id: Date.now().toString(),
      name,
      phone,
      address,
      productId,
      productName,
      productPrice,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }

    // Add to static storage
    orders.push(newOrder)

    return NextResponse.json({ 
      success: true,
      orderId: newOrder.id
    })
  } catch (error) {
    console.error('Buyurtmalar API xatosi:', error)
    return NextResponse.json(
      { error: 'Xatolik yuz berdi' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return new NextResponse("Ruxsat berilmagan", { status: 401 })
    }

    const orders = await db.order.findMany({
      where: {
        userId
      },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('[BUYURTMALAR_OLISH]', error)
    return new NextResponse("Ichki xatolik", { status: 500 })
  }
} 