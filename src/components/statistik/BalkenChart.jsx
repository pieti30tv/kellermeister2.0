export default function BalkenChart({ data, total }) {
  if (!data || data.length === 0) return (
    <p className="font-inter text-sm text-wine-muted">Keine Daten vorhanden.</p>
  )

  return (
    <div className="flex flex-col gap-3">
      {data.map(({ label, value }) => {
        const pct = total > 0 ? Math.round((value / total) * 100) : 0
        return (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-inter text-sm text-wine-heading">{label}</span>
              <span className="font-inter text-xs text-wine-muted">
                {value} · {pct}%
              </span>
            </div>
            <div className="h-1.5 bg-wine-border/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-wine-accent rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
