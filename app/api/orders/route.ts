import { NextResponse } from 'next/server'

// Static storage for orders
let orders: any[] = []

export async function GET() {
  try {
    return NextResponse.json(orders)
  } catch (error) {
    console.error('[BUYURTMALAR_OLISH]', error)
    return new NextResponse("Ichki xatolik", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { items, totalPrice } = data

    if (!items || !totalPrice) {
      return NextResponse.json(
        { error: 'Barcha maydonlarni to\'ldiring' },
        { status: 400 }
      )
    }

    const newOrder = {
      id: Date.now().toString(),
      items,
      totalPrice,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }

    orders.push(newOrder)

    return NextResponse.json(newOrder)
  } catch (error) {
    console.error('Buyurtmalar API xatosi:', error)
    return NextResponse.json(
      { error: 'Xatolik yuz berdi' },
      { status: 500 }
    )
  }
} 