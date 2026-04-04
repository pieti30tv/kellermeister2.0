import { getTrinkreifeStatus, getTrinkreifeLabel } from '../../utils/weinUtils'
import { TRINKREIFE_COLORS, TRINKREIFE_STATUS } from '../../utils/constants'

export default function TrinkreifeBadge({ von, bis }) {
  const status = getTrinkreifeStatus(von, bis)
  if (status === TRINKREIFE_STATUS.UNBEKANNT) return null

  const label = getTrinkreifeLabel(status)
  const colors = TRINKREIFE_COLORS[status]

  return (
    <span
      className={`inline-block text-[11px] font-inter font-medium px-2 py-0.5 rounded-wine-pill border
        ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {label}
    </span>
  )
}
