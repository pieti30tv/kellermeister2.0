export const WEINTYPEN = ['Rotwein', 'Weißwein', 'Rosé', 'Sekt', 'Dessertwein']

export const BEWERTUNG_MAX = 5

export const TRINKREIFE_STATUS = {
  NOCH_NICHT_REIF: 'noch-nicht-reif',
  OPTIMAL: 'optimal',
  UEBERFAELLIG: 'ueberfaellig',
  UNBEKANNT: 'unbekannt',
}

export const TRINKREIFE_LABELS = {
  [TRINKREIFE_STATUS.NOCH_NICHT_REIF]: 'Noch nicht reif',
  [TRINKREIFE_STATUS.OPTIMAL]: 'Optimal',
  [TRINKREIFE_STATUS.UEBERFAELLIG]: 'Überfällig',
  [TRINKREIFE_STATUS.UNBEKANNT]: '',
}

export const TRINKREIFE_COLORS = {
  [TRINKREIFE_STATUS.NOCH_NICHT_REIF]: {
    bg: 'bg-wine-muted/20',
    text: 'text-wine-secondary',
    border: 'border-wine-muted/40',
  },
  [TRINKREIFE_STATUS.OPTIMAL]: {
    bg: 'bg-wine-accent/10',
    text: 'text-wine-accent',
    border: 'border-wine-accent/30',
  },
  [TRINKREIFE_STATUS.UEBERFAELLIG]: {
    bg: 'bg-[#8B4513]/10',
    text: 'text-[#8B4513]',
    border: 'border-[#8B4513]/30',
  },
  [TRINKREIFE_STATUS.UNBEKANNT]: {
    bg: '',
    text: '',
    border: '',
  },
}

export const FILTER_TRINKREIFE_OPTIONS = [
  { value: TRINKREIFE_STATUS.NOCH_NICHT_REIF, label: 'Noch nicht reif' },
  { value: TRINKREIFE_STATUS.OPTIMAL, label: 'Optimal' },
  { value: TRINKREIFE_STATUS.UEBERFAELLIG, label: 'Überfällig' },
]
