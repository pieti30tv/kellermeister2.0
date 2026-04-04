import { createContext, useCallback, useState } from 'react'

export const ToastContext = createContext(null)

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = nextId++
    setToasts((prev) => {
      const next = [...prev, { id, message, type }]
      // max 3 toasts
      return next.length > 3 ? next.slice(next.length - 3) : next
    })
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}
