import { useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Button from '../ui/Button'
import Input from '../ui/Input'
import BewertungDisplay from './BewertungDisplay'
import { AppContext } from '../../context/AppContext'
import { WeineContext } from '../../context/WeineContext'
import { WEINTYPEN } from '../../utils/constants'

const EMPTY_FORM = {
  name: '',
  jahrgang: '',
  rebsorte: '',
  region: '',
  land: '',
  anzahl: 1,
  typ: '',
  bewertung: 0,
  trinkreife_von: '',
  trinkreife_bis: '',
  notizen: '',
}

function toFormValues(wein) {
  if (!wein) return EMPTY_FORM
  return {
    name: wein.name ?? '',
    jahrgang: wein.jahrgang ?? '',
    rebsorte: wein.rebsorte ?? '',
    region: wein.region ?? '',
    land: wein.land ?? '',
    anzahl: wein.anzahl ?? 1,
    typ: wein.typ ?? '',
    bewertung: wein.bewertung ?? 0,
    trinkreife_von: wein.trinkreife_von ?? '',
    trinkreife_bis: wein.trinkreife_bis ?? '',
    notizen: wein.notizen ?? '',
  }
}

function toDbValues(form) {
  return {
    name: form.name.trim(),
    jahrgang: form.jahrgang ? Number(form.jahrgang) : null,
    rebsorte: form.rebsorte.trim() || null,
    region: form.region.trim() || null,
    land: form.land.trim() || null,
    anzahl: Number(form.anzahl) || 0,
    typ: form.typ || null,
    bewertung: form.bewertung || null,
    trinkreife_von: form.trinkreife_von ? Number(form.trinkreife_von) : null,
    trinkreife_bis: form.trinkreife_bis ? Number(form.trinkreife_bis) : null,
    notizen: form.notizen.trim() || null,
  }
}

export default function WeinModal() {
  const { modalOpen, editingWein, closeModal } = useContext(AppContext)
  const { addWein, updateWein, deleteWein } = useContext(WeineContext)

  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const firstInputRef = useRef(null)

  const isEdit = !!editingWein

  useEffect(() => {
    if (modalOpen) {
      setForm(toFormValues(editingWein))
      setConfirmDelete(false)
      // lock scroll
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstInputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [modalOpen, editingWein])

  useEffect(() => {
    if (!modalOpen) return
    function onKey(e) {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, closeModal])

  if (!modalOpen) return null

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    const data = toDbValues(form)
    let ok
    if (isEdit) {
      ok = await updateWein(editingWein.id, data)
    } else {
      ok = await addWein(data)
    }
    setSaving(false)
    if (ok) closeModal()
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    const ok = await deleteWein(editingWein.id)
    setDeleting(false)
    if (ok) closeModal()
  }

  const inputClass = 'w-full bg-wine-card border border-wine-border rounded-wine-sm px-4 py-3 font-inter text-wine-heading placeholder-wine-muted focus:outline-none focus:border-wine-accent transition-colors duration-150'
  const selectClass = `${inputClass} appearance-none cursor-pointer`
  const labelClass = 'text-xs font-medium font-inter text-wine-secondary uppercase tracking-wide mb-1.5 block'

  const modal = (
    <div
      className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label={isEdit ? 'Wein bearbeiten' : 'Neuer Wein'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-wine-heading/40 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Panel */}
      <div className="relative z-10 w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-wine-card rounded-t-wine sm:rounded-wine shadow-wine border border-wine-border/50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-wine-border/40 sticky top-0 bg-wine-card z-10">
          <h2 className="font-playfair text-xl font-semibold text-wine-heading">
            {isEdit ? 'Wein bearbeiten' : 'Neuer Wein'}
          </h2>
          <button
            onClick={closeModal}
            className="text-wine-muted hover:text-wine-heading transition-colors w-8 h-8 flex items-center justify-center rounded-wine-sm hover:bg-wine-border/40"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className={labelClass} htmlFor="m-name">Name <span className="text-wine-accent">*</span></label>
            <input ref={firstInputRef} id="m-name" className={inputClass} value={form.name} onChange={set('name')} placeholder="z.B. Château Margaux" required />
          </div>

          {/* Row: Jahrgang + Typ */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="m-jahrgang">Jahrgang</label>
              <input id="m-jahrgang" type="number" className={inputClass} value={form.jahrgang} onChange={set('jahrgang')} placeholder="2019" min="1800" max="2099" />
            </div>
            <div>
              <label className={labelClass} htmlFor="m-typ">Weintyp</label>
              <select id="m-typ" className={selectClass} value={form.typ} onChange={set('typ')}>
                <option value="">— Wählen —</option>
                {WEINTYPEN.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Rebsorte */}
          <div>
            <label className={labelClass} htmlFor="m-rebsorte">Rebsorte</label>
            <input id="m-rebsorte" className={inputClass} value={form.rebsorte} onChange={set('rebsorte')} placeholder="z.B. Cabernet Sauvignon" />
          </div>

          {/* Row: Region + Land */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="m-region">Region</label>
              <input id="m-region" className={inputClass} value={form.region} onChange={set('region')} placeholder="z.B. Bordeaux" />
            </div>
            <div>
              <label className={labelClass} htmlFor="m-land">Land</label>
              <input id="m-land" className={inputClass} value={form.land} onChange={set('land')} placeholder="z.B. Frankreich" />
            </div>
          </div>

          {/* Anzahl */}
          <div>
            <label className={labelClass} htmlFor="m-anzahl">Anzahl Flaschen</label>
            <input id="m-anzahl" type="number" className={inputClass} value={form.anzahl} onChange={set('anzahl')} min="0" max="9999" />
          </div>

          {/* Bewertung */}
          <div>
            <span className={labelClass}>Bewertung</span>
            <BewertungDisplay
              bewertung={form.bewertung}
              size="lg"
              interactive
              onSelect={(val) => setForm((prev) => ({ ...prev, bewertung: prev.bewertung === val ? 0 : val }))}
            />
          </div>

          {/* Trinkreife */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} htmlFor="m-trink-von">Trinkreife von</label>
              <input id="m-trink-von" type="number" className={inputClass} value={form.trinkreife_von} onChange={set('trinkreife_von')} placeholder="2024" min="1900" max="2099" />
            </div>
            <div>
              <label className={labelClass} htmlFor="m-trink-bis">Trinkreife bis</label>
              <input id="m-trink-bis" type="number" className={inputClass} value={form.trinkreife_bis} onChange={set('trinkreife_bis')} placeholder="2035" min="1900" max="2099" />
            </div>
          </div>

          {/* Notizen */}
          <div>
            <label className={labelClass} htmlFor="m-notizen">Notizen</label>
            <textarea id="m-notizen" className={`${inputClass} resize-none`} rows={3} value={form.notizen} onChange={set('notizen')} placeholder="Aromen, Anlässe, Erinnerungen…" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2 border-t border-wine-border/40 mt-1">
            {isEdit && (
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
                type="button"
                className="mr-auto"
              >
                {deleting ? 'Lösche…' : confirmDelete ? 'Wirklich löschen?' : 'Löschen'}
              </Button>
            )}
            <Button variant="secondary" onClick={closeModal} type="button" className="ml-auto">
              Abbrechen
            </Button>
            <Button variant="primary" type="submit" disabled={saving || !form.name.trim()}>
              {saving ? 'Speichern…' : 'Speichern'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modal, document.body)
}
