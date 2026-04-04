import { useContext } from 'react'
import WeinCard from './WeinCard'
import LoadingSkeleton from './LoadingSkeleton'
import Button from '../ui/Button'
import { WeineContext } from '../../context/WeineContext'
import { AppContext } from '../../context/AppContext'

export default function WeinkartGrid() {
  const { weine, loading } = useContext(WeineContext)
  const { openAddModal } = useContext(AppContext)

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-7 gap-4">
        <h1 className="font-playfair text-3xl font-semibold text-wine-heading">
          Mein Weinkeller
        </h1>
        <Button variant="primary" onClick={openAddModal}>
          Wein hinzufügen
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : weine.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-playfair italic text-wine-secondary text-xl mb-3">
            Dein Keller ist noch leer.
          </p>
          <p className="font-inter text-sm text-wine-muted mb-6">
            Füge deinen ersten Wein hinzu, um loszulegen.
          </p>
          <Button variant="primary" onClick={openAddModal}>
            Ersten Wein hinzufügen
          </Button>
        </div>
      ) : (
        <>
          <p className="font-inter text-sm text-wine-muted mb-4">
            {weine.length} {weine.length === 1 ? 'Wein' : 'Weine'} im Keller
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {weine.map((wein) => (
              <WeinCard key={wein.id} wein={wein} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
