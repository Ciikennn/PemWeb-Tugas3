import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return <p className="empty">Produk tidak ditemukan.</p>
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
