import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.local in development
if (process.env.NODE_ENV === 'development') {
  config({ path: path.resolve(process.cwd(), '.env.local') })
}

// Required environment variables with default values for build time
export const MONGODB_URI = process.env.MONGODB_URI || ''
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Runtime environment variable validation
if (process.env.NODE_ENV !== 'production') {
  const missingVars = [
    ['MONGODB_URI', MONGODB_URI],
    ['NEXT_PUBLIC_SUPABASE_URL', SUPABASE_URL],
    ['NEXT_PUBLIC_SUPABASE_ANON_KEY', SUPABASE_ANON_KEY],
  ].filter(([_, value]) => !value)

  if (missingVars.length > 0) {
    console.warn(
      'Missing environment variables:',
      missingVars.map(([name]) => name).join(', ')
    )
    console.warn('Some features may not work properly.')
  }
} 