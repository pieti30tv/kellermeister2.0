import { BEWERTUNG_MAX } from '../../utils/constants'

export default function BewertungDisplay({ bewertung, size = 'sm', interactive = false, onSelect }) {
  const stars = Array.from({ length: BEWERTUNG_MAX }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-1" aria-label={`Bewertung: ${bewertung ?? 0} von ${BEWERTUNG_MAX}`}>
      {stars.map((val) => (
        <span
          key={val}
          onClick={interactive ? () => onSelect?.(val) : undefined}
          className={`
            inline-flex items-center justify-center select-none
            ${interactive ? 'cursor-pointer hover:scale-110 transition-transform p-2' : ''}
          `}
        >
          <span
            className={`
              inline-block rounded-full
              ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}
              ${val <= (bewertung ?? 0)
                ? 'bg-wine-accent'
                : 'border-2 border-wine-border bg-transparent'}
            `}
          />
        </span>
      ))}
    </div>
  )
}
