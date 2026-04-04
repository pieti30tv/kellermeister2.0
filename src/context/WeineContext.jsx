import { createContext } from 'react'
import { useWeine } from '../hooks/useWeine'

export const WeineContext = createContext(null)

export function WeineProvider({ children }) {
  const value = useWeine()

  return <WeineContext.Provider value={value}>{children}</WeineContext.Provider>
}
