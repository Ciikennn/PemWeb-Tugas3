import { useState, type FormEvent } from 'react'
import type { Product, ProductInput } from '../../types'
import Button from '../atoms/Button'
import FormField from '../molecules/FormField'
import Modal from '../molecules/Modal'

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
    if (price.trim() === '' || !Number.isInteger(priceNumber) || priceNumber <= 0) {
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
      <h2 id="form-title" className="text-2xl font-bold">
        {isEdit ? 'Edit Produk' : 'Tambah Produk'}
      </h2>
      <p className="mt-1.5 text-sm text-slate-600">
        {isEdit ? 'Perbarui informasi produk yang dipilih.' : 'Masukkan informasi produk baru.'}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-5">
        {isEdit && <p className="-mb-1 text-sm text-slate-500">ID: {product.id}</p>}

        <FormField
          id="product-name"
          label="Nama Produk"
          type="text"
          placeholder="Contoh: Pulpen"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoFocus
        />

        <FormField
          id="product-price"
          label="Harga (Rp)"
          type="number"
          min={1}
          placeholder="Contoh: 5000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          hint="Harga harus lebih dari 0."
          error={errors.price}
        />

        {submitError && (
          <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">
            {submitError}
          </p>
        )}

        <div className="grid grid-cols-[2fr_3fr] gap-2">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Batal
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
