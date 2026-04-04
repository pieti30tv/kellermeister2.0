export default function JahrgangsTabelle({ jahrgaenge }) {
  if (!jahrgaenge || jahrgaenge.length === 0) return (
    <p className="font-inter text-sm text-wine-muted">Keine Jahrgangsdaten vorhanden.</p>
  )

  return (
    <table className="w-full font-inter text-sm">
      <thead>
        <tr className="border-b border-wine-border/50">
          <th className="text-left py-2 font-medium text-wine-secondary text-xs uppercase tracking-wide">Jahrgang</th>
          <th className="text-right py-2 font-medium text-wine-secondary text-xs uppercase tracking-wide">Flaschen</th>
        </tr>
      </thead>
      <tbody>
        {jahrgaenge.map(({ jahrgang, anzahl }) => (
          <tr key={jahrgang} className="border-b border-wine-border/30 last:border-0">
            <td className="py-2.5 text-wine-heading">{jahrgang}</td>
            <td className="py-2.5 text-right text-wine-secondary">{anzahl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
