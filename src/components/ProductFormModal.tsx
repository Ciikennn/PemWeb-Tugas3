import { useState, type FormEvent } from 'react'
import type { Product, ProductInput } from '../types'
import Modal from './Modal'

interface ProductFormModalProps {
  /** Jika diisi, modal dalam mode Edit. Jika kosong, mode Tambah. */
  product?: Product
  onSubmit: (input: ProductInput) => Promise<void>
  onClose: () => void
}

interface FormErrors {
  name?: string
  price?: string
}

export default function ProductFormModal({ product, onSubmit, onClose }: ProductFormModalProps) {
  const isEdit = product !== undefined
  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const priceNumber = Number(price)
    const nextErrors: FormErrors = {}

    if (!trimmedName) nextErrors.name = 'Nama produk wajib diisi.'
    if (price.trim() === '' || !Number.isFinite(priceNumber) || priceNumber <= 0) {
      nextErrors.price = 'Harga harus lebih dari 0.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setSubmitError('')
    try {
      await onSubmit({ name: trimmedName, price: priceNumber })
    } catch (err) {
      setSubmitError((err as Error).message)
      setSubmitting(false)
    }
  }

  return (
    <Modal onClose={onClose} labelledBy="form-title">
      <h2 id="form-title" className="modal-title">
        {isEdit ? 'Edit Produk' : 'Tambah Produk'}
      </h2>
      <p className="modal-subtitle">
        {isEdit ? 'Perbarui informasi produk yang dipilih.' : 'Masukkan informasi produk baru.'}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {isEdit && <p className="modal-meta">ID: {product.id}</p>}

        <div className="field">
          <label htmlFor="product-name">Nama Produk</label>
          <input
            id="product-name"
            type="text"
            placeholder="Contoh: Pulpen"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'invalid' : undefined}
            autoFocus
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="field">
          <label htmlFor="product-price">Harga (Rp)</label>
          <input
            id="product-price"
            type="number"
            min="1"
            placeholder="Contoh: 5000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={errors.price ? 'invalid' : undefined}
          />
          <small className={errors.price ? 'error' : 'hint'}>Harga harus lebih dari 0.</small>
        </div>

        {submitError && (
          <p className="error submit-error" role="alert">
            {submitError}
          </p>
        )}

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose} disabled={submitting}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
