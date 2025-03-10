import { Star, StarHalf } from "lucide-react"

interface ProductRatingProps {
  rating: number
  showNumber?: boolean
}

export function ProductRating({ rating, showNumber = true }: ProductRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="h-4 w-4 fill-primary text-primary"
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className="h-4 w-4 fill-primary text-primary"
          />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star
            key={`empty-star-${i}`}
            className="h-4 w-4 text-neutral-300"
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-neutral-600">({rating.toFixed(1)})</span>
      )}
    </div>
  )
} 