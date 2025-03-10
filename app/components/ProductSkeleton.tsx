export function ProductSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm animate-pulse">
      <div className="aspect-square bg-neutral-200" />
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-3 w-16 bg-neutral-200 rounded" />
          <div className="h-4 w-20 bg-neutral-200 rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-neutral-200 rounded mb-2" />
        <div className="h-4 w-full bg-neutral-200 rounded mb-3" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-6 w-20 bg-neutral-200 rounded" />
          <div className="h-4 w-12 bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  )
}

export function ProductSkeletonGrid() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </>
  )
} 