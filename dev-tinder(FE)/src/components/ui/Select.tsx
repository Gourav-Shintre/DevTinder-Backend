import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends ComponentProps<'select'> {
  options: SelectOption[]
  placeholder?: string
  hasError?: boolean
}

export function Select({
  options,
  placeholder,
  hasError = false,
  className,
  ...rest
}: SelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none',
        'focus:ring-2 focus:ring-rose-200',
        hasError ? 'border-red-400' : 'border-slate-300 focus:border-rose-400',
        className,
      )}
      aria-invalid={hasError || undefined}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
