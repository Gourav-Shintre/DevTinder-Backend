import { cn } from '@/lib/cn'
import { useToastStore } from '@/store/toastStore'

/** Renders toasts from the toast store. Mounted once in the root layout. */
export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const dismissToast = useToastStore((state) => state.dismissToast)

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismissToast(toast.id)}
          className={cn(
            'rounded-lg px-4 py-3 text-left text-sm text-white shadow-lg',
            toast.variant === 'error' ? 'bg-red-600' : 'bg-slate-800',
          )}
        >
          {toast.message}
        </button>
      ))}
    </div>
  )
}
