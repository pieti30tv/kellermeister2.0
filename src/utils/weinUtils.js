import { TRINKREIFE_STATUS, TRINKREIFE_LABELS } from './constants'

const currentYear = new Date().getFullYear()

export function getTrinkreifeStatus(von, bis) {
  if (!von && !bis) return TRINKREIFE_STATUS.UNBEKANNT
  const year = currentYear
  if (von && year < von) return TRINKREIFE_STATUS.NOCH_NICHT_REIF
  if (bis && year > bis) return TRINKREIFE_STATUS.UEBERFAELLIG
  return TRINKREIFE_STATUS.OPTIMAL
}

export function getTrinkreifeLabel(status) {
  return TRINKREIFE_LABELS[status] ?? ''
}

export function sortWeine(weine) {
  return [...weine].sort((a, b) => {
    if (a.anzahl === 0 && b.anzahl !== 0) return 1
    if (a.anzahl !== 0 && b.anzahl === 0) return -1
    return (a.name ?? '').localeCompare(b.name ?? '', 'de')
  })
}

export function groupByTyp(weine) {
  const result = {}
  for (const w of weine) {
    const typ = w.typ ?? 'Unbekannt'
    result[typ] = (result[typ] ?? 0) + (w.anzahl ?? 0)
  }
  return result
}

export function groupByRegion(weine) {
  const counts = {}
  for (const w of weine) {
    if (!w.region) continue
    counts[w.region] = (counts[w.region] ?? 0) + (w.anzahl ?? 0)
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([region, anzahl]) => ({ region, anzahl }))
}

export function groupByJahrgang(weine) {
  const counts = {}
  for (const w of weine) {
    if (!w.jahrgang) continue
    counts[w.jahrgang] = (counts[w.jahrgang] ?? 0) + (w.anzahl ?? 0)
  }
  return Object.entries(counts)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([jahrgang, anzahl]) => ({ jahrgang: Number(jahrgang), anzahl }))
}

export function calcGesamtflaschen(weine) {
  return weine.reduce((sum, w) => sum + (w.anzahl ?? 0), 0)
}

export function calcDurchschnittsBewertung(weine) {
  const bewertet = weine.filter((w) => w.bewertung)
  if (!bewertet.length) return 0
  const sum = bewertet.reduce((s, w) => s + w.bewertung, 0)
  return Math.round((sum / bewertet.length) * 10) / 10
}

export function calcOptimalTrinkbar(weine) {
  return weine.filter(
    (w) => getTrinkreifeStatus(w.trinkreife_von, w.trinkreife_bis) === TRINKREIFE_STATUS.OPTIMAL
  ).length
}
