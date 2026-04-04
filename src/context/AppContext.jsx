import { createContext, useState } from 'react'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [activeView, setActiveView] = useState('keller')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingWein, setEditingWein] = useState(null)

  function openAddModal() {
    setEditingWein(null)
    setModalOpen(true)
  }

  function openEditModal(wein) {
    setEditingWein(wein)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setEditingWein(null)
  }

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        modalOpen,
        editingWein,
        openAddModal,
        openEditModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
