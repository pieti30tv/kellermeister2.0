import { useContext } from 'react'
import Card from '../ui/Card'
import BewertungDisplay from './BewertungDisplay'
import TrinkreifeBadge from './TrinkreifeBadge'
import { AppContext } from '../../context/AppContext'

export default function WeinCard({ wein }) {
  const { openEditModal } = useContext(AppContext)

  return (
    <Card onClick={() => openEditModal(wein)} className="p-5 flex flex-col gap-2">
      {/* Typ Badge */}
      {wein.typ && (
        <span className="self-start text-[11px] font-inter font-medium uppercase tracking-wider text-wine-accent bg-wine-accent/10 border border-wine-accent/20 px-2 py-0.5 rounded-wine-pill">
          {wein.typ}
        </span>
      )}

      {/* Name */}
      <h3 className="font-playfair font-semibold text-wine-heading text-lg leading-snug">
        {wein.name}
      </h3>

      {/* Jahrgang + Rebsorte */}
      <p className="font-inter text-sm text-wine-secondary">
        {[wein.jahrgang, wein.rebsorte].filter(Boolean).join(' · ')}
      </p>

      {/* Region + Land */}
      {(wein.region || wein.land) && (
        <p className="font-inter text-xs text-wine-muted">
          {[wein.region, wein.land].filter(Boolean).join(', ')}
        </p>
      )}

      {/* Divider */}
      <div className="flex-1" />
      <div className="border-t border-wine-border/40 pt-3 flex items-center justify-between gap-2 flex-wrap">
        {/* Bewertung */}
        <BewertungDisplay bewertung={wein.bewertung} />

        {/* Anzahl Badge */}
        <span className="text-xs font-inter font-medium text-wine-secondary bg-wine-border/50 px-2.5 py-1 rounded-wine-pill">
          {wein.anzahl ?? 0} {wein.anzahl === 1 ? 'Flasche' : 'Flaschen'}
        </span>
      </div>

      {/* Trinkreife */}
      <TrinkreifeBadge von={wein.trinkreife_von} bis={wein.trinkreife_bis} />
    </Card>
  )
}
