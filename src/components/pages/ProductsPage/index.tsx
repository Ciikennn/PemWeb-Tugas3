import { useCallback, useEffect, useState } from 'react'
import type { Product, ProductValues } from '../../../types/product'
import { productRepository } from '../../../data/product'
import Button from '../../atoms/Button'
import SearchBar from '../../molecules/SearchBar'
import StatusMessage from '../../molecules/StatusMessage'
import ProductGrid from '../../organisms/ProductGrid'
import ProductFormModal from '../../organisms/ProductFormModal'
import DeleteProductModal from '../../organisms/DeleteProductModal'

type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; product: Product }
  | { type: 'delete'; product: Product }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const loadProducts = useCallback(async () => {
    setIsLoading(true)
    setError('')
    try {
      const models = await productRepository.getProductList()
      setProducts(models.map((model) => model.toJSON()))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat produk.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const closeModal = () => setModal({ type: 'none' })

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))

  // Jika request gagal, error dilempar dan ditampilkan di dalam pop-up.
  const handleAdd = async (values: ProductValues) => {
    const created = await productRepository.createProduct(values)
    setProducts((prev) => [...prev, created.toJSON()])
    closeModal()
  }

  const handleEdit = async (id: number, values: ProductValues) => {
    const updated = await productRepository.updateProduct(id, values)
    setProducts((prev) => prev.map((p) => (p.id === id ? updated.toJSON() : p)))
    closeModal()
  }

  const handleDelete = async (id: number) => {
    await productRepository.deleteProduct(id)
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

      <section aria-label="Daftar produk" aria-busy={isLoading}>
        {isLoading ? (
          <StatusMessage variant="loading" message="Memuat produk..." />
        ) : error ? (
          <StatusMessage
            variant="error"
            message={error}
            action={
              <Button variant="secondary" size="sm" onClick={loadProducts}>
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
      </section>

      {modal.type === 'add' && <ProductFormModal onSubmit={handleAdd} onClose={closeModal} />}

      {modal.type === 'edit' && (
        <ProductFormModal
          product={modal.product}
          onSubmit={(values) => handleEdit(modal.product.id, values)}
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
