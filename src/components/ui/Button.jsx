export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-inter font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine-accent/50 min-h-[44px] px-5 text-sm'

  const variants = {
    primary:
      'bg-wine-accent hover:bg-wine-accentHover text-white rounded-wine-pill disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-transparent border border-wine-border hover:bg-wine-cardHover text-wine-heading rounded-wine-sm disabled:opacity-50 disabled:cursor-not-allowed',
    danger:
      'bg-[#8B4513]/10 hover:bg-[#8B4513]/20 text-[#8B4513] border border-[#8B4513]/30 rounded-wine-sm disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent hover:bg-wine-cardHover text-wine-secondary rounded-wine-sm disabled:opacity-50 disabled:cursor-not-allowed',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
