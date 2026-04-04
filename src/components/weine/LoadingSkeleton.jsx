function SkeletonCard() {
  return (
    <div className="bg-wine-card rounded-wine shadow-wine border border-wine-border/50 p-5 animate-pulse">
      <div className="h-4 bg-wine-border/60 rounded w-16 mb-3" />
      <div className="h-6 bg-wine-border/60 rounded w-3/4 mb-2" />
      <div className="h-4 bg-wine-border/40 rounded w-1/2 mb-1" />
      <div className="h-3 bg-wine-border/30 rounded w-2/5 mb-4" />
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-wine-border/30">
        <div className="h-4 bg-wine-border/40 rounded w-20" />
        <div className="h-5 bg-wine-border/30 rounded-wine-pill w-14" />
      </div>
    </div>
  )
}

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
