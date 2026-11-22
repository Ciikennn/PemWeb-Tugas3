import type { Product } from '../../types'
import Price from '../atoms/Price'

interface ProductInfoProps {
  product: Product
  size?: 'sm' | 'md' | 'lg'
}

const nameSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl sm:text-4xl' }
const priceSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-2xl sm:text-3xl' }

export default function ProductInfo({ product, size = 'md' }: ProductInfoProps) {
  return (
    <div>
      <span className="text-xs text-slate-500">ID: {product.id}</span>
      <h2 className={`mt-1 font-bold break-words ${nameSize[size]}`}>{product.name}</h2>
      <Price value={product.price} className={priceSize[size]} />
    </div>
  )
}
