'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { MapPin, Phone, Mail, Clock, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(2, "Ism kiritish majburiy"),
  email: z.string().email("Noto'gri email manzil"),
  subject: z.string().min(2, "Mavzu kiritish majburiy"),
  message: z.string().min(10, "Xabar kamida 10 ta belgidan iborat bo'lishi kerak"),
})

type FormData = z.infer<typeof formSchema>

const contactInfo = [
  {
    icon: MapPin,
    title: "Manzil",
    details: ["Toshkent"]
  },
  {
    icon: Phone,
    title: "Telefon",
    details: ["+998 91 142 88 77", "+998 90 009 88 69"]
  },
  {
    icon: Mail,
    title: "Email",
    details: ["karimovahmadjon@gmail.com"]
  },
  {
    icon: Clock,
    title: "Ish vaqti",
    details: ["Dushanba - Shanba: 10:00 - 20:00", "Yakshanba: Dam olish kuni"]
  }
]

export default function ContactPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  })

  const { register, handleSubmit, formState: { errors }, reset } = form

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Ma'lumotlarni backend'ga yuborish
      console.log(data)
      toast({
        title: "Xabar yuborildi",
        description: "Tez orada siz bilan bog'lanamiz.",
      })
      reset()
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Iltimos, qaytadan urinib ko'ring.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => router.back()}
          className="hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Orqaga</span>
        </Button>
        <h1 className="text-3xl font-bold">Biz bilan bog'lanish</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Biz bilan bog'lanish</h1>
            <p className="mt-2 text-muted-foreground">
              Savollaringiz bormi? Biz bilan bog'laning va biz sizga yordam beramiz.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="mt-1 text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-6">
            <div className="w-full h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.25298617416!2d69.2793667!3d41.28259745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQsNGI0LrQtdC90YI!5e0!3m2!1sru!2s!4v1742167581381!5m2!1sru!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Toshkent xaritasi"
              />
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold">Xabar yuborish</h2>
          <p className="mt-2 text-muted-foreground">
            Formani to'ldiring va biz siz bilan tez orada bog'lanamiz.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Ismingiz</Label>
              <Input
                id="name"
                placeholder="To'liq ismingiz"
                {...register("name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="sizning@email.uz"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="subject">Mavzu</Label>
              <Input
                id="subject"
                placeholder="Xabar mavzusi"
                {...register("subject")}
                className={errors.subject ? "border-destructive" : ""}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Xabar</Label>
              <Textarea
                id="message"
                placeholder="Xabaringizni yozing..."
                {...register("message")}
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
} 