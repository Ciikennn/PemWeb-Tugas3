import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  onClose: () => void
  labelledBy: string
  children: ReactNode
}

export default function Modal({ onClose, labelledBy, children }: ModalProps) {
  // Tutup modal dengan tombol Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-xl bg-white px-5 pt-6 pb-5 shadow-2xl"
      >
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="absolute top-2.5 right-3 text-2xl leading-none text-slate-500 hover:text-slate-900"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
