import { MongoClient } from 'mongodb'
import { MONGODB_URI } from './env'

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

// Only initialize MongoDB client if we're not building
const initMongoClient = async (): Promise<MongoClient> => {
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI not found. Database features will not be available.')
  }

  try {
    const client = new MongoClient(MONGODB_URI, options)
    return await client.connect()
  } catch (err) {
    console.error('Error initializing MongoDB client:', err)
    throw err
  }
}

// Initialize client promise
let clientPromise: Promise<MongoClient>

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