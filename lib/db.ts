import { MongoClient } from 'mongodb'
import { MONGODB_URI } from './env'

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

if (!global._mongoClientPromise) {
  if (!MONGODB_URI) {
    console.warn('MongoDB URI not found. Some features may not work properly.')
    global._mongoClientPromise = Promise.resolve(null)
  } else {
    const client = new MongoClient(MONGODB_URI, options)
    global._mongoClientPromise = client.connect()
      .catch(err => {
        console.error('Failed to connect to MongoDB:', err)
        return null
      })
  }
}

export const clientPromise = global._mongoClientPromise 