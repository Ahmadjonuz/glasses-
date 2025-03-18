import { MongoClient } from 'mongodb'
import { MONGODB_URI } from './env'

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

// Only initialize MongoDB client if we're not building
const initMongoClient = () => {
  if (!MONGODB_URI) {
    console.warn('MongoDB URI not found. Database features will not be available.')
    return Promise.resolve(null)
  }

  try {
    const client = new MongoClient(MONGODB_URI, options)
    return client.connect()
      .catch(err => {
        console.error('Failed to connect to MongoDB:', err)
        return null
      })
  } catch (err) {
    console.error('Error initializing MongoDB client:', err)
    return Promise.resolve(null)
  }
}

// Initialize client promise
let clientPromise: Promise<MongoClient | null>
if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the value
  // is preserved across module reloads caused by HMR
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = initMongoClient()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, it's best to not use a global variable
  clientPromise = initMongoClient()
}

export { clientPromise } 
export const clientPromise = global._mongoClientPromise 