import { useContext } from 'react'
import Navbar from './components/layout/Navbar'
import WeinkartGrid from './components/weine/WeinkartGrid'
import WeinModal from './components/weine/WeinModal'
import SuchFilter from './components/suche/SuchFilter'
import Statistik from './components/statistik/Statistik'
import ToastContainer from './components/ui/ToastContainer'
import { ToastProvider } from './context/ToastContext'
import { WeineProvider } from './context/WeineContext'
import { AppProvider, AppContext } from './context/AppContext'

function AppContent() {
  const { activeView } = useContext(AppContext)

  return (
    <div className="min-h-screen bg-wine-bg font-inter">
      <Navbar />
      {/* Offset for fixed navbar */}
      <main className="pt-16">
        {activeView === 'keller' && <WeinkartGrid />}
        {activeView === 'suche' && <SuchFilter />}
        {activeView === 'statistik' && <Statistik />}
      </main>
      <WeinModal />
      <ToastContainer />
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <WeineProvider>
          <AppContent />
        </WeineProvider>
      </AppProvider>
    </ToastProvider>
  )
}
