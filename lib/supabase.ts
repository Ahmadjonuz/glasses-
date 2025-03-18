import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './env'

// During build time, return a mock client
if (process.env.NEXT_PHASE === 'phase-production-build') {
  const mockClient = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  }
  // @ts-ignore - Mock client for build time
  export const supabase = mockClient
} else {
  // Runtime - use actual client
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials not found. Authentication features will not be available.')
  }

  export const supabase = createClient(
    SUPABASE_URL || '',
    SUPABASE_ANON_KEY || '',
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  )
} 