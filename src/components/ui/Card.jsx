export default function Card({ children, className = '', onClick, ...props }) {
  const isClickable = !!onClick
  return (
    <div
      onClick={onClick}
      className={`bg-wine-card rounded-wine shadow-wine border border-wine-border/50 transition-colors duration-150
        ${isClickable ? 'cursor-pointer hover:bg-wine-cardHover' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
