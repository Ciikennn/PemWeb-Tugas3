import { useState } from 'react'
import type { Product } from '../../types'
import Button from '../atoms/Button'
import Modal from '../molecules/Modal'
import ProductInfo from '../molecules/ProductInfo'

interface DeleteProductModalProps {
  product: Product
  onConfirm: () => Promise<void>
  onClose: () => void
}

export default function DeleteProductModal({ product, onConfirm, onClose }: DeleteProductModalProps) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setDeleting(true)
    setError('')
    try {
      await onConfirm()
    } catch (err) {
      setError((err as Error).message)
      setDeleting(false)
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="delete-title">
      <div className="text-center">
        <span className="mb-3.5 inline-flex h-13 w-13 items-center justify-center rounded-lg bg-danger-soft text-danger" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-6.5 w-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </span>
        <h2 id="delete-title" className="text-2xl font-bold">
          Hapus Produk?
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">Produk yang dihapus tidak dapat dikembalikan.</p>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 p-4">
        <ProductInfo product={product} size="sm" />
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-[2fr_3fr] gap-2">
        <Button variant="outline" onClick={onClose} disabled={deleting}>
          Batal
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={deleting}>
          {deleting ? 'Menghapus...' : 'Hapus Produk'}
        </Button>
      </div>
    </Modal>
  )
}
