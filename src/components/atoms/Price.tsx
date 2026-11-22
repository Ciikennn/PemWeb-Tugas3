import { formatRupiah } from '../../utils/formatRupiah'

interface PriceProps {
  value: number
  className?: string
}

export default function Price({ value, className = 'text-2xl' }: PriceProps) {
  return <p className={`font-bold text-primary ${className}`}>{formatRupiah(value)}</p>
}
