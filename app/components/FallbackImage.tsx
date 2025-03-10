interface FallbackImageProps {
  name: string
  category: string
}

export function FallbackImage({ name, category }: FallbackImageProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100 p-4">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-200 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-neutral-900">{name}</p>
        <p className="text-xs text-neutral-500 mt-1">{category}</p>
        <p className="text-xs text-neutral-400 mt-2">Image not available</p>
      </div>
    </div>
  )
} 