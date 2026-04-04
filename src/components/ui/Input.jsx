export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  rows,
  className = '',
  ...props
}) {
  const inputClass =
    'w-full bg-wine-card border border-wine-border rounded-wine-sm px-4 py-3 font-inter text-wine-heading placeholder-wine-muted focus:outline-none focus:border-wine-accent transition-colors duration-150'

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium font-inter text-wine-secondary uppercase tracking-wide"
        >
          {label}
          {required && <span className="text-wine-accent ml-1">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows ?? 3}
          className={`${inputClass} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          className={inputClass}
          {...props}
        />
      )}
    </div>
  )
}
