import { useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { ToastContext } from '../context/ToastContext'
import { sortWeine } from '../utils/weinUtils'

export function useWeine() {
  const [weine, setWeine] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useContext(ToastContext)

  const fetchWeine = useCallback(async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('weine').select('*').order('name')
      if (error) throw error
      setWeine(sortWeine(data ?? []))
    } catch (err) {
      addToast('Fehler beim Laden der Weine.', 'error')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    fetchWeine()
  }, [fetchWeine])

  const addWein = useCallback(
    async (weinData) => {
      try {
        const { error } = await supabase.from('weine').insert([weinData])
        if (error) throw error
        addToast('Wein erfolgreich hinzugefügt.')
        await fetchWeine()
        return true
      } catch (err) {
        addToast('Fehler beim Hinzufügen des Weins.', 'error')
        console.error(err)
        return false
      }
    },
    [addToast, fetchWeine]
  )

  const updateWein = useCallback(
    async (id, weinData) => {
      try {
        const { error } = await supabase.from('weine').update(weinData).eq('id', id)
        if (error) throw error
        addToast('Wein erfolgreich gespeichert.')
        await fetchWeine()
        return true
      } catch (err) {
        addToast('Fehler beim Speichern des Weins.', 'error')
        console.error(err)
        return false
      }
    },
    [addToast, fetchWeine]
  )

  const deleteWein = useCallback(
    async (id) => {
      try {
        const { error } = await supabase.from('weine').delete().eq('id', id)
        if (error) throw error
        addToast('Wein gelöscht.')
        await fetchWeine()
        return true
      } catch (err) {
        addToast('Fehler beim Löschen des Weins.', 'error')
        console.error(err)
        return false
      }
    },
    [addToast, fetchWeine]
  )

  return { weine, loading, fetchWeine, addWein, updateWein, deleteWein }
}
