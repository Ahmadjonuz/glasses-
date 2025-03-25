import mongoose from 'mongoose'
import { MONGODB_URI } from '@/lib/env'

interface GlobalMongoose {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: GlobalMongoose | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  try {
    if (cached?.conn) {
      console.log('Using cached database connection')
      return cached.conn
    }

    if (!cached?.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        family: 4,
        dnsServer: ['8.8.8.8', '8.8.4.4']  // Using Google's DNS servers
      }

      console.log('Creating new database connection with options:', opts)
      mongoose.set('strictQuery', true)
      
      cached = global.mongoose = {
        conn: null,
        promise: mongoose.connect(MONGODB_URI, opts)
      }
    }

    try {
      const mongoose = await cached.promise
      cached.conn = mongoose
      console.log('Database connected successfully')
      return mongoose
    } catch (e) {
      cached.promise = null
      console.error('Error during connection attempt:', e)
      throw e
    }
  } catch (error) {
    console.error('Database connection error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to connect to database')
  }
}

export default dbConnect 