import { Link } from 'react-router'
import type { Product } from '../../types'
import Button from '../atoms/Button'
import ProductInfo from '../molecules/ProductInfo'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={`/products/${product.id}`}
        className="rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        aria-label={`Lihat detail ${product.name}`}
      >
        <ProductInfo product={product} />
        <span className="mt-1 inline-block text-sm font-medium text-primary group-hover:underline">
          Lihat detail →
        </span>
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(product)}>
          Hapus
        </Button>
      </div>
    </article>
  )
}
