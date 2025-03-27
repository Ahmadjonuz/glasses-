import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Tizimga kiring' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Tizimga kiring' },
        { status: 401 }
      )
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(orders)
  } catch (error) {
    console.error('[BUYURTMALAR_OLISH]', error)
    return new NextResponse("Ichki xatolik", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Tizimga kiring' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Tizimga kiring' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { items, totalPrice } = data

    if (!items || !totalPrice) {
      return NextResponse.json(
        { error: 'Barcha maydonlarni to\'ldiring' },
        { status: 400 }
      )
    }

    const { data: order, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user.id,
          items,
          total_price: totalPrice,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(order)
  } catch (error) {
    console.error('Buyurtmalar API xatosi:', error)
    return NextResponse.json(
      { error: 'Xatolik yuz berdi' },
      { status: 500 }
    )
  }
} 