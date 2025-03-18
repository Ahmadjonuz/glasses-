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

// MongoDB clientni ishga tushirish uchun funksiya
const initMongoClient = async (): Promise<MongoClient> => {
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI not found. Database features will not be available.')
  }

  const client = new MongoClient(MONGODB_URI, options)
  return client.connect()
}

// `clientPromise` faqat bir marta e'lon qilinadi va qiymati o‘zgarmaydi
const clientPromise: Promise<MongoClient> = 
  global._mongoClientPromise ?? (global._mongoClientPromise = initMongoClient())

export { clientPromise }
