import { BEWERTUNG_MAX } from '../../utils/constants'

export default function BewertungDisplay({ bewertung, size = 'sm', interactive = false, onSelect }) {
  const stars = Array.from({ length: BEWERTUNG_MAX }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-0.5" aria-label={`Bewertung: ${bewertung ?? 0} von ${BEWERTUNG_MAX}`}>
      {stars.map((val) => (
        <span
          key={val}
          onClick={interactive ? () => onSelect?.(val) : undefined}
          className={`
            font-inter select-none leading-none
            ${size === 'sm' ? 'text-sm' : 'text-lg'}
            ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
            ${val <= (bewertung ?? 0) ? 'text-wine-accent' : 'text-wine-border'}
          `}
        >
          {val <= (bewertung ?? 0) ? '●' : '○'}
        </span>
      ))}
    </div>
  )
}
