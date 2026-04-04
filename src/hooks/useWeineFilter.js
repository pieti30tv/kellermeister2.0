import { useMemo, useState } from 'react'
import { getTrinkreifeStatus } from '../utils/weinUtils'
import { TRINKREIFE_STATUS } from '../utils/constants'

export function useWeineFilter(weine) {
  const [query, setQuery] = useState('')
  const [filterTyp, setFilterTyp] = useState('')
  const [filterTrinkreife, setFilterTrinkreife] = useState('')
  const [filterBewertung, setFilterBewertung] = useState(0)

  const filtered = useMemo(() => {
    let result = weine

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(
        (w) =>
          w.name?.toLowerCase().includes(q) ||
          w.rebsorte?.toLowerCase().includes(q) ||
          w.region?.toLowerCase().includes(q) ||
          w.land?.toLowerCase().includes(q)
      )
    }

    if (filterTyp) {
      result = result.filter((w) => w.typ === filterTyp)
    }

    if (filterTrinkreife) {
      result = result.filter(
        (w) =>
          getTrinkreifeStatus(w.trinkreife_von, w.trinkreife_bis) === filterTrinkreife
      )
    }

    if (filterBewertung) {
      result = result.filter((w) => w.bewertung === filterBewertung)
    }

    return result
  }, [weine, query, filterTyp, filterTrinkreife, filterBewertung])

  function resetFilters() {
    setQuery('')
    setFilterTyp('')
    setFilterTrinkreife('')
    setFilterBewertung(0)
  }

  const hasActiveFilters = !!(query || filterTyp || filterTrinkreife || filterBewertung)

  return {
    query,
    setQuery,
    filterTyp,
    setFilterTyp,
    filterTrinkreife,
    setFilterTrinkreife,
    filterBewertung,
    setFilterBewertung,
    filtered,
    resetFilters,
    hasActiveFilters,
  }
}
