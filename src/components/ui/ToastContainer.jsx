import { useContext } from 'react'
import Toast from './Toast'
import { ToastContext } from '../../context/ToastContext'

export default function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext)

  if (!toasts.length) return null

  return (
    <div
      aria-live="polite"
      aria-label="Benachrichtigungen"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={removeToast} />
      ))}
    </div>
  )
}
