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
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" aria-label="Tutup" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
