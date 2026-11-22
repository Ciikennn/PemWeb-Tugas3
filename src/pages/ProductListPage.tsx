import { useCallback, useEffect, useState } from 'react'
import type { Product, ProductInput } from '../types'
import * as productApi from '../api/products'
import Button from '../components/atoms/Button'
import SearchBar from '../components/molecules/SearchBar'
import StatusMessage from '../components/molecules/StatusMessage'
import ProductGrid from '../components/organisms/ProductGrid'
import ProductFormModal from '../components/organisms/ProductFormModal'
import DeleteProductModal from '../components/organisms/DeleteProductModal'

type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; product: Product }
  | { type: 'delete'; product: Product }

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setLoadError('')
    try {
      setProducts(await productApi.getProducts())
    } catch (err) {
      setLoadError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const closeModal = () => setModal({ type: 'none' })

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))

  // Jika request gagal, error dilempar dan ditampilkan di dalam pop-up.
  const handleAdd = async (input: ProductInput) => {
    const created = await productApi.createProduct(input)
    setProducts((prev) => [...prev, created])
    closeModal()
  }

  const handleEdit = async (id: number, input: ProductInput) => {
    const updated = await productApi.updateProduct(id, input)
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
    closeModal()
  }

  const handleDelete = async (id: number) => {
    await productApi.deleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
    closeModal()
  }

  return (
    <>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Manajemen Produk</h1>
          <p className="mt-1.5 text-slate-600">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <Button onClick={() => setModal({ type: 'add' })} className="px-5 py-2.5">
          <span aria-hidden="true">+</span> Tambah Produk
        </Button>
      </header>

      <div className="mt-6 mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} />
        <span className="text-sm text-slate-600">{products.length} produk</span>
      </div>

      {loading ? (
        <StatusMessage variant="loading" message="Memuat produk..." />
      ) : loadError ? (
        <StatusMessage
          variant="error"
          message={loadError}
          action={
            <Button variant="outline" size="sm" onClick={loadProducts}>
              Coba Lagi
            </Button>
          }
        />
      ) : (
        <>
          <ProductGrid
            products={filteredProducts}
            onEdit={(product) => setModal({ type: 'edit', product })}
            onDelete={(product) => setModal({ type: 'delete', product })}
          />
          <p className="mt-6 text-sm text-slate-600">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </>
      )}

      {modal.type === 'add' && <ProductFormModal onSubmit={handleAdd} onClose={closeModal} />}

      {modal.type === 'edit' && (
        <ProductFormModal
          product={modal.product}
          onSubmit={(input) => handleEdit(modal.product.id, input)}
          onClose={closeModal}
        />
      )}

      {modal.type === 'delete' && (
        <DeleteProductModal
          product={modal.product}
          onConfirm={() => handleDelete(modal.product.id)}
          onClose={closeModal}
        />
      )}
    </>
  )
}
