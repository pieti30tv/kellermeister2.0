import { useContext, useState } from 'react'
import MobileMenu from './MobileMenu'
import { AppContext } from '../../context/AppContext'

const NAV_LINKS = [
  { view: 'keller', label: 'Keller' },
  { view: 'suche', label: 'Suche' },
  { view: 'statistik', label: 'Statistik' },
]

export default function Navbar() {
  const { activeView, setActiveView } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen((prev) => !prev)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(240,235,224,0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(45,90,39,0.12)',
        height: '64px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center justify-between relative">
        {/* Logo */}
        <button
          onClick={() => setActiveView('keller')}
          className="font-playfair italic text-xl text-wine-accent hover:text-wine-accentHover transition-colors focus:outline-none"
          aria-label="Kellermeister — Zur Startseite"
        >
          Kellermeister
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
          {NAV_LINKS.map(({ view, label }) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`font-inter text-sm font-medium px-4 py-2 rounded-wine-sm transition-colors duration-150
                ${activeView === view
                  ? 'text-wine-accent bg-wine-accent/8'
                  : 'text-wine-secondary hover:text-wine-heading hover:bg-wine-cardHover'
                }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-wine-sm hover:bg-wine-cardHover transition-colors"
          aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-wine-heading transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-wine-heading transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-wine-heading transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>

        {/* Mobile Menu dropdown */}
        <div className="lg:hidden absolute top-full left-0 right-0">
          <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </div>
      </div>
    </header>
  )
}
