import Image from "next/image"
import Link from "next/link"

interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

const categories: Category[] = [
  {
    id: "sports",
    name: "Sport ko'zoynaklar",
    image: "/assets/glassCategory1.png",
    productCount: 8
  },
  {
    id: "sunglasses",
    name: "Quyosh ko'zoynaklar",
    image: "/assets/glassCategory2.png",
    productCount: 12
  },
  {
    id: "vision",
    name: "Ko'rish ko'zoynaklar",
    image: "/assets/glassCategory3.png",
    productCount: 10
  }
]

export function CategorySection() {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter text-neutral-900">Kategoriyalar bo'yicha xarid qiling</h2>
          <p className="mt-2 text-lg text-neutral-600">O'z uslubingizga mos ko'zoynakni toping</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.productCount} ta mahsulot</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 