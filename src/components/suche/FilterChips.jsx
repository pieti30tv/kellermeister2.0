import { WEINTYPEN, FILTER_TRINKREIFE_OPTIONS } from '../../utils/constants'

function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 font-inter text-sm px-3.5 py-1.5 rounded-wine-pill border transition-colors duration-150 min-h-[36px]
        ${active
          ? 'bg-wine-accent text-white border-wine-accent'
          : 'bg-wine-card text-wine-secondary border-wine-border hover:border-wine-accent/40 hover:bg-wine-cardHover'
        }`}
    >
      {label}
    </button>
  )
}

export default function FilterChips({
  filterTyp, setFilterTyp,
  filterTrinkreife, setFilterTrinkreife,
  filterBewertung, setFilterBewertung,
  hasActiveFilters, resetFilters,
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Weintyp */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <span className="shrink-0 text-xs font-inter font-medium text-wine-muted uppercase tracking-wide mr-1">Typ</span>
        {WEINTYPEN.map((typ) => (
          <Chip
            key={typ}
            label={typ}
            active={filterTyp === typ}
            onClick={() => setFilterTyp(filterTyp === typ ? '' : typ)}
          />
        ))}
      </div>

      {/* Trinkreife */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <span className="shrink-0 text-xs font-inter font-medium text-wine-muted uppercase tracking-wide mr-1">Reife</span>
        {FILTER_TRINKREIFE_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            active={filterTrinkreife === opt.value}
            onClick={() => setFilterTrinkreife(filterTrinkreife === opt.value ? '' : opt.value)}
          />
        ))}
      </div>

      {/* Bewertung */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <span className="shrink-0 text-xs font-inter font-medium text-wine-muted uppercase tracking-wide mr-1">Bewertung</span>
        {[1, 2, 3, 4, 5].map((val) => (
          <Chip
            key={val}
            label={'●'.repeat(val)}
            active={filterBewertung === val}
            onClick={() => setFilterBewertung(filterBewertung === val ? 0 : val)}
          />
        ))}
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={resetFilters}
          className="self-start text-xs font-inter text-wine-muted hover:text-wine-secondary underline underline-offset-2 transition-colors"
        >
          Filter zurücksetzen
        </button>
      )}
    </div>
  )
}
