import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAuthUrl = process.env.SUPABASE_AUTH_URL

const mockClient = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: () => Promise.resolve({ error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    updateUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      })
    }),
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
}

const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build'
const isDevelopment = process.env.NODE_ENV === 'development'

if (!supabaseUrl || !supabaseAnonKey) {
  if (isDevelopment) {
    console.warn('Supabase credentials not found. Using mock client.')
  }
}

export const supabase = (!supabaseUrl || !supabaseAnonKey || isBuildTime)
  ? mockClient
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
      global: {
        headers: {
          'x-my-custom-header': 'VisionVogue'
        }
      }
    }) 