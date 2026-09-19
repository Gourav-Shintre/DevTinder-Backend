import clsx, { type ClassValue } from 'clsx'

/** Join class names conditionally: cn('btn', isActive && 'btn-active') */
export function cn(...classes: ClassValue[]): string {
  return clsx(classes)
}
