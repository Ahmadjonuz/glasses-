import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">VisionVogue</h3>
            <p className="text-sm text-muted-foreground">
              VisionVogue - ko'zoynaklar do'koni. Biz sizga eng sifatli ko'zoynaklarni taqdim etamiz.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Foydali havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                  Mahsulotlar
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Aloqa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Yordam</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  Ko'p so'raladigan savollar
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground">
                  Yetkazib berish
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-foreground">
                  Qaytarish
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Aloqa</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                +998 99 123 45 67
              </li>
              <li className="text-sm text-muted-foreground">
                info@visionvogue.uz
              </li>
              <li className="text-sm text-muted-foreground">
                Toshkent shahri, Chilonzor tumani
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} VisionVogue. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  )
} 