'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Eye, Shield, Heart, Award } from 'lucide-react'

const values = [
  {
    icon: Eye,
    title: 'Expert Eye Care',
    description: 'Our certified opticians provide comprehensive eye examinations and expert advice.'
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'We only stock premium eyewear from trusted manufacturers with warranty protection.'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We offer personalized service and aftercare support.'
  },
  {
    icon: Award,
    title: 'Premium Selection',
    description: 'Curated collection of designer frames and high-quality lenses for every style and need.'
  }
]

export default function AboutPage() {
  return (
    <div className="container max-w-6xl px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About VisionVogue</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your trusted destination for premium eyewear since 2010. We combine fashion with functionality to help you see and look your best.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid gap-12 md:grid-cols-2 items-center mb-20">
        <div className="relative aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1582142839970-2b3661a58ac1?q=80&w=1000&auto=format&fit=crop"
            alt="Our Store"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2010, VisionVogue began with a simple mission: to make premium eyewear accessible while providing exceptional customer service.
            </p>
            <p>
              Over the years, we've grown from a small local shop to a trusted eyewear destination, serving thousands of satisfied customers with our curated collection of frames and expert eye care services.
            </p>
            <p>
              Today, we continue to uphold our commitment to quality, style, and customer satisfaction, helping you find the perfect eyewear that matches your personality and lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title} className="p-6">
              <value.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-semibold text-center mb-12">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((member) => (
            <Card key={member} className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                <Image
                  src={`https://images.unsplash.com/photo-${1500000000000 + member}?q=80&w=500&auto=format&fit=crop`}
                  alt={`Team Member ${member}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-1">Team Member {member}</h3>
                <p className="text-muted-foreground">Position</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 