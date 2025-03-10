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
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: ['123 Vision Street', 'Mumbai, Maharashtra 400001']
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 123-456-7890', '+91 098-765-4321']
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@visionvogue.com', 'support@visionvogue.com']
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Monday - Saturday: 10:00 AM - 8:00 PM', 'Sunday: Closed']
  }
]

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      })
      
      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-6xl px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help. Reach out to us through any of the following channels.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {contactInfo.map((info) => (
              <Card key={info.title} className="p-6">
                <info.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                {info.details.map((detail, index) => (
                  <p key={index} className="text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </Card>
            ))}
          </div>

          {/* Map */}
          <Card className="p-6">
            <div className="aspect-video relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.803960914286!2d72.8270831!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjUiTiA3MsKwNDknMzcuNSJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="How can we help?"
                {...register('subject')}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="min-h-[150px]"
                {...register('message')}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
} 