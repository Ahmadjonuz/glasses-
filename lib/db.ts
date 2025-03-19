import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const isDevelopment = process.env.NODE_ENV === 'development'
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build'

if (!MONGODB_URI) {
  if (isDevelopment) {
    console.warn('MongoDB URI not found. Using mock client.')
  }
}

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
} as const

let client: MongoClient
let clientPromise: Promise<MongoClient>

const mockClient = {
  connect: () => Promise.resolve(mockClient),
  db: () => ({
    collection: () => ({
      find: () => ({ toArray: () => Promise.resolve([]) }),
      findOne: () => Promise.resolve(null),
      insertOne: () => Promise.resolve({ insertedId: 'mock-id' }),
      updateOne: () => Promise.resolve({ modifiedCount: 1 }),
      deleteOne: () => Promise.resolve({ deletedCount: 1 }),
      aggregate: () => ({ toArray: () => Promise.resolve([]) }),
    }),
  }),
} as unknown as MongoClient

if (!MONGODB_URI || isBuildTime) {
  client = mockClient
  clientPromise = Promise.resolve(mockClient)
} else {
  try {
    client = new MongoClient(MONGODB_URI, options)
    clientPromise = client.connect()
  } catch (error) {
    console.error('Failed to initialize MongoDB client:', error)
    client = mockClient
    clientPromise = Promise.resolve(mockClient)
  }
}

export default clientPromise
