import { useContext } from 'react'
import WeinCard from '../weine/WeinCard'
import FilterChips from './FilterChips'
import LoadingSkeleton from '../weine/LoadingSkeleton'
import { WeineContext } from '../../context/WeineContext'
import { useWeineFilter } from '../../hooks/useWeineFilter'

export default function SuchFilter() {
  const { weine, loading } = useContext(WeineContext)

  const {
    query, setQuery,
    filterTyp, setFilterTyp,
    filterTrinkreife, setFilterTrinkreife,
    filterBewertung, setFilterBewertung,
    filtered,
    resetFilters,
    hasActiveFilters,
  } = useWeineFilter(weine)

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="font-playfair text-3xl font-semibold text-wine-heading mb-7">
        Suche & Filter
      </h1>

      {/* Search input */}
      <div className="mb-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name, Rebsorte, Region, Land…"
          className="w-full bg-wine-card border border-wine-border rounded-wine-sm px-4 py-3 font-inter text-wine-heading placeholder-wine-muted focus:outline-none focus:border-wine-accent transition-colors duration-150"
        />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterChips
          filterTyp={filterTyp} setFilterTyp={setFilterTyp}
          filterTrinkreife={filterTrinkreife} setFilterTrinkreife={setFilterTrinkreife}
          filterBewertung={filterBewertung} setFilterBewertung={setFilterBewertung}
          hasActiveFilters={hasActiveFilters} resetFilters={resetFilters}
        />
      </div>

      {/* Result count */}
      {!loading && (
        <p className="font-inter text-sm text-wine-muted mb-4">
          {filtered.length} {filtered.length === 1 ? 'Wein' : 'Weine'} gefunden
        </p>
      )}

      {/* Results */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-playfair italic text-wine-secondary text-xl">
            Keine Weine gefunden.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((wein) => (
            <WeinCard key={wein.id} wein={wein} />
          ))}
        </div>
      )}
    </div>
  )
}
