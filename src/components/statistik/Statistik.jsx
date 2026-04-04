import { useContext, useMemo } from 'react'
import BalkenChart from './BalkenChart'
import JahrgangsTabelle from './JahrgangsTabelle'
import BewertungDisplay from '../weine/BewertungDisplay'
import { WeineContext } from '../../context/WeineContext'
import {
  calcGesamtflaschen,
  calcDurchschnittsBewertung,
  calcOptimalTrinkbar,
  groupByTyp,
  groupByRegion,
  groupByJahrgang,
} from '../../utils/weinUtils'

function StatCard({ label, children }) {
  return (
    <div className="bg-wine-card rounded-wine shadow-wine border border-wine-border/50 p-5">
      <p className="font-inter text-xs font-medium text-wine-muted uppercase tracking-wide mb-2">{label}</p>
      <div className="font-playfair text-2xl font-semibold text-wine-heading">{children}</div>
    </div>
  )
}

export default function Statistik() {
  const { weine, loading } = useContext(WeineContext)

  const gesamt = useMemo(() => calcGesamtflaschen(weine), [weine])
  const durchschnitt = useMemo(() => calcDurchschnittsBewertung(weine), [weine])
  const optimal = useMemo(() => calcOptimalTrinkbar(weine), [weine])

  const typData = useMemo(() => {
    const grouped = groupByTyp(weine)
    return Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }))
  }, [weine])

  const regionData = useMemo(
    () => groupByRegion(weine).map(({ region, anzahl }) => ({ label: region, value: anzahl })),
    [weine]
  )

  const jahrgaenge = useMemo(() => groupByJahrgang(weine), [weine])

  const typTotal = typData.reduce((s, d) => s + d.value, 0)
  const regionTotal = regionData.reduce((s, d) => s + d.value, 0)

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-wine-border/60 rounded w-48 mb-7" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-wine-card rounded-wine h-24 border border-wine-border/50" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="font-playfair italic text-3xl font-normal text-wine-heading mb-7">
        Auf einen Blick
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Gesamtflaschen">{gesamt}</StatCard>
        <StatCard label="Verschiedene Weine">{weine.length}</StatCard>
        <StatCard label="Durchschnittsbewertung">
          <div className="flex items-center gap-2">
            <span>{durchschnitt || '—'}</span>
            {durchschnitt > 0 && (
              <BewertungDisplay bewertung={Math.round(durchschnitt)} size="sm" />
            )}
          </div>
        </StatCard>
        <StatCard label="Optimal trinkbar">{optimal}</StatCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-wine-card rounded-wine shadow-wine border border-wine-border/50 p-5">
          <h2 className="font-playfair text-lg font-semibold text-wine-heading mb-4">Nach Weintyp</h2>
          <BalkenChart data={typData} total={typTotal} />
        </div>
        <div className="bg-wine-card rounded-wine shadow-wine border border-wine-border/50 p-5">
          <h2 className="font-playfair text-lg font-semibold text-wine-heading mb-4">Top 5 Regionen</h2>
          <BalkenChart data={regionData} total={regionTotal} />
        </div>
      </div>

      {/* Jahrgangstabelle */}
      <div className="bg-wine-card rounded-wine shadow-wine border border-wine-border/50 p-5">
        <h2 className="font-playfair text-lg font-semibold text-wine-heading mb-4">Jahrgänge</h2>
        <JahrgangsTabelle jahrgaenge={jahrgaenge} />
      </div>
    </div>
  )
}
