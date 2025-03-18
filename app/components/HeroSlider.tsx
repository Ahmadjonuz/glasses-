"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper core and required modules
import SwiperCore from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination])

const slides = [
  {
    image: "/assets/hero/slide1.jpg",
    title: "Zamonaviy ko'zoynaklar kolleksiyasi",
    description: "Eng so'nggi trendlarga mos keladigan yuqori sifatli ko'zoynaklar",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide2.jpg",
    title: "Premium quyosh ko'zoynaklar",
    description: "Yozgi mavsumga tayyormisiz? Bizning quyosh ko'zoynaklarimiz bilan o'zingizni himoya qiling",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide3.jpg",
    title: "Sport ko'zoynaklar",
    description: "Faol hayot tarzi uchun maxsus ishlab chiqilgan ko'zoynaklar",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide4.jpg",
    title: "Bolalar ko'zoynaklar",
    description: "Kichkintoylaringiz uchun qulay va chiroyli ko'zoynaklar",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide5.jpg",
    title: "Klassik uslublar",
    description: "Har qanday kiyim bilan mos keladigan an'anaviy ko'zoynaklar",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide6.jpg",
    title: "Zamonaviy dizayn",
    description: "Eng so'nggi texnologiyalar bilan yaratilgan innovatsion ko'zoynaklar",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide7.jpg",
    title: "Maxsus takliflar",
    description: "Chegirmalar va maxsus aksiyalardan foydalaning",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide8.jpg",
    title: "Professional maslahat",
    description: "Mutaxassislarimiz sizga eng mos ko'zoynakni tanlashda yordam beradi",
    gradient: "from-white to-gray-300"
  },
  {
    image: "/assets/hero/slide9.jpg",
    title: "Yangi kolleksiya",
    description: "2024-yilning eng so'nggi trendlari bilan tanishing",
    gradient: "from-white to-gray-300"
  }
]

export function HeroSlider() {
  return (
    <div className="relative w-full h-[600px]">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container px-4 md:px-6">
                <div className="max-w-2xl space-y-4">
                  <h1 className={`text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-5 duration-1000`}>
                    {slide.title}
                  </h1>
                  <p className="max-w-[600px] text-white md:text-xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-300">
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-colors">
                      <Link href="/products">Xarid qilish</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="group border-white text-white hover:bg-white/10 bg-black/30 backdrop-blur-sm">
                      <Link href="/products" className="flex items-center gap-2">
                        Kolleksiyani ko'rish
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 