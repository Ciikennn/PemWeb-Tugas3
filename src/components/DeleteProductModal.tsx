import type { Product } from '../types'
import { formatRupiah } from '../utils/formatRupiah'
import Modal from './Modal'

interface DeleteProductModalProps {
  product: Product
  onConfirm: () => void
  onClose: () => void
}

export default function DeleteProductModal({ product, onConfirm, onClose }: DeleteProductModalProps) {
  return (
    <Modal onClose={onClose} labelledBy="delete-title">
      <div className="delete-head">
        <span className="delete-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </span>
        <h2 id="delete-title" className="modal-title">Hapus Produk?</h2>
        <p className="modal-subtitle">Produk yang dihapus tidak dapat dikembalikan.</p>
      </div>

      <div className="card card-preview">
        <span className="card-id">ID: {product.id}</span>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-price">{formatRupiah(product.price)}</p>
      </div>

      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onClose}>
          Batal
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Hapus Produk
        </button>
      </div>
    </Modal>
  )
}
