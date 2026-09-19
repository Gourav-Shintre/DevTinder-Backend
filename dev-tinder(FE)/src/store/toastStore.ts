import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type ToastVariant = 'success' | 'error'

export interface Toast {
  id: number
  message: string
  variant: ToastVariant
}

interface ToastState {
  toasts: Toast[]
  showToast: (message: string, variant?: ToastVariant) => void
  dismissToast: (id: number) => void
}

const TOAST_DURATION_MS = 3500
let nextToastId = 1

export const useToastStore = create<ToastState>()(
  devtools(
    (set, get) => ({
      toasts: [],
      showToast: (message, variant = 'success') => {
        const id = nextToastId++
        set({ toasts: [...get().toasts, { id, message, variant }] }, false, 'toast/show')
        setTimeout(() => get().dismissToast(id), TOAST_DURATION_MS)
      },
      dismissToast: (id) =>
        set({ toasts: get().toasts.filter((toast) => toast.id !== id) }, false, 'toast/dismiss'),
    }),
    { name: 'toastStore' },
  ),
)
