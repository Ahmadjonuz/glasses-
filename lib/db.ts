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
const clientPromise: Promise<MongoClient> = 
  process.env.NODE_ENV === 'development'
    ? global._mongoClientPromise ?? (global._mongoClientPromise = initMongoClient())
    : initMongoClient()

export { clientPromise }
