"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import toast from 'react-hot-toast'
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft } from "lucide-react"

export default function AccountPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.name || "",
        email: user.email || "",
      })
    }
  }, [user])

  if (!mounted) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
        },
      })

      if (error) throw error

      toast.success("Profil muvaffaqiyatli yangilandi")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/")
      toast.success("Tizimdan chiqish muvaffaqiyatli!")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  return (
    <div className="container max-w-2xl py-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Orqaga</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Profil sozlamalari</h1>
            <p className="text-muted-foreground">
              Profil sozlamalarini boshqarish
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ism</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              disabled
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </form>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Xavfli zona</h2>
          <Button variant="destructive" onClick={handleSignOut}>
            Chiqish
          </Button>
        </div>
      </div>
    </div>
  )
} 