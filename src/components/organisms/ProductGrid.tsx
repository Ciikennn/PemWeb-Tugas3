import type { Product } from '../../types'
import StatusMessage from '../molecules/StatusMessage'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
  if (products.length === 0) {
    return <StatusMessage variant="empty" message="Produk tidak ditemukan." />
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
