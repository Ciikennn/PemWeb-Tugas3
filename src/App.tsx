import { useEffect, useState } from 'react'
import type { Product, ProductInput } from './types'
import * as productApi from './api/products'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import ProductFormModal from './components/ProductFormModal'
import DeleteProductModal from './components/DeleteProductModal'

type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'edit'; product: Product }
  | { type: 'delete'; product: Product }

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const loadProducts = async () => {
    setLoading(true)
    setLoadError('')
    try {
      setProducts(await productApi.getProducts())
    } catch (err) {
      setLoadError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const closeModal = () => setModal({ type: 'none' })

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  // Fungsi-fungsi di bawah melempar error jika request gagal,
  // error tersebut ditampilkan di dalam pop-up.
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
    <main className="container">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p className="subtitle">Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button type="button" className="btn btn-primary btn-add" onClick={() => setModal({ type: 'add' })}>
          <span aria-hidden="true">+</span> Tambah Produk
        </button>
      </header>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <span className="count">{products.length} produk</span>
      </div>

      {loading ? (
        <p className="empty">Memuat produk...</p>
      ) : loadError ? (
        <div className="load-error" role="alert">
          <p>{loadError}</p>
          <button type="button" className="btn btn-outline" onClick={loadProducts}>
            Coba Lagi
          </button>
        </div>
      ) : (
        <>
          <ProductList
            products={filteredProducts}
            onEdit={(product) => setModal({ type: 'edit', product })}
            onDelete={(product) => setModal({ type: 'delete', product })}
          />
          <p className="summary">
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
    </main>
  )
}
