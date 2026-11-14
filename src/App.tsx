import { useState } from 'react'
import type { Product, ProductInput } from './types'
import { initialProducts } from './data/initialProducts'
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
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [nextId, setNextId] = useState(initialProducts.length + 1)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState<ModalState>({ type: 'none' })

  const closeModal = () => setModal({ type: 'none' })

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  const handleAdd = (input: ProductInput) => {
    setProducts((prev) => [...prev, { id: nextId, ...input }])
    setNextId((id) => id + 1)
    closeModal()
  }

  const handleEdit = (id: number, input: ProductInput) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...input } : p)))
    closeModal()
  }

  const handleDelete = (id: number) => {
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

      <ProductList
        products={filteredProducts}
        onEdit={(product) => setModal({ type: 'edit', product })}
        onDelete={(product) => setModal({ type: 'delete', product })}
      />

      <p className="summary">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

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
