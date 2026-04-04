import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const NAV_LINKS = [
  { view: 'keller', label: 'Keller' },
  { view: 'suche', label: 'Suche' },
  { view: 'statistik', label: 'Statistik' },
]

export default function MobileMenu({ open, onClose }) {
  const { activeView, setActiveView } = useContext(AppContext)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function navigate(view) {
    setActiveView(view)
    onClose()
  }

  return (
    <div
      className={`absolute top-full left-0 right-0 bg-wine-card border-b border-wine-border/60 shadow-wine overflow-hidden transition-all duration-300 ease-in-out
        ${open ? 'max-h-[300px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}
      aria-hidden={!open}
    >
      <nav className="flex flex-col py-2">
        {NAV_LINKS.map(({ view, label }) => (
          <button
            key={view}
            onClick={() => navigate(view)}
            className={`w-full text-left px-6 font-inter text-base font-medium transition-colors duration-150 min-h-[52px] flex items-center
              ${activeView === view
                ? 'text-wine-accent bg-wine-accent/5'
                : 'text-wine-heading hover:bg-wine-cardHover'
              }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}
