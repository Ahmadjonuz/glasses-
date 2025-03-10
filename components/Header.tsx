"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span>VisionVogue</span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <Button asChild>
              <Link href="/account">Account</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 