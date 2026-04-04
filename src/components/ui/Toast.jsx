import { useEffect, useState } from 'react'

export default function Toast({ id, message, type = 'success', onDismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true))

    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(id), 300)
    }, 3500)

    return () => clearTimeout(timer)
  }, [id, onDismiss])

  const borderColor = type === 'error' ? 'border-l-[#8B4513]' : 'border-l-[#2d5a27]'

  return (
    <div
      role="alert"
      className={`bg-wine-card border border-wine-border rounded-wine-sm shadow-wine px-4 py-3 border-l-4 ${borderColor}
        font-inter text-sm text-wine-heading min-w-[260px] max-w-[380px]
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {message}
    </div>
  )
}
