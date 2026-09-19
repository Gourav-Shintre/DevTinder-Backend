import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends ComponentProps<'input'> {
  hasError?: boolean
}

export function Input({ hasError = false, className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 outline-none',
        'focus:ring-2 focus:ring-rose-200',
        hasError ? 'border-red-400' : 'border-slate-300 focus:border-rose-400',
        className,
      )}
      aria-invalid={hasError || undefined}
      {...rest}
    />
  )
}
