import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import type { Product, ProductValues } from '../../../types/product'
import { ApiError, productRepository } from '../../../data/product'
import Button, { ButtonLink } from '../../atoms/Button'
import Price from '../../atoms/Price'
import StatusMessage from '../../molecules/StatusMessage'
import ProductFormModal from '../../organisms/ProductFormModal'
import DeleteProductModal from '../../organisms/DeleteProductModal'

type State =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'error'; message: string }
  | { status: 'ready'; product: Product }

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState<State>({ status: 'loading' })
  const [modal, setModal] = useState<'none' | 'edit' | 'delete'>('none')

  const productId = Number(id)
  const validId = Number.isInteger(productId) && productId > 0

  const loadProduct = useCallback(async () => {
    if (!validId) {
      setState({ status: 'not-found' })
      return
    }
    setState({ status: 'loading' })
    try {
      const model = await productRepository.getProductDetail(productId)
      setState({ status: 'ready', product: model.toJSON() })
    } catch (err) {
      if (err instanceof ApiError && (err.status === 404 || err.status === 400)) {
        setState({ status: 'not-found' })
      } else {
        setState({ status: 'error', message: err instanceof Error ? err.message : 'Gagal memuat produk.' })
      }
    }
  }, [productId, validId])

  useEffect(() => {
    loadProduct()
  }, [loadProduct])

  const handleEdit = async (values: ProductValues) => {
    const updated = await productRepository.updateProduct(productId, values)
    setState({ status: 'ready', product: updated.toJSON() })
    setModal('none')
  }

  const handleDelete = async () => {
    await productRepository.deleteProduct(productId)
    navigate('/products', { replace: true })
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <Link to="/products" className="font-medium text-primary hover:underline">
          ← Kembali ke daftar produk
        </Link>
      </nav>

      {state.status === 'loading' && <StatusMessage variant="loading" message="Memuat detail produk..." />}

      {state.status === 'error' && (
        <StatusMessage
          variant="error"
          message={state.message}
          action={
            <Button variant="secondary" size="sm" onClick={loadProduct}>
              Coba Lagi
            </Button>
          }
        />
      )}

      {state.status === 'not-found' && (
        <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-5xl" aria-hidden="true">
            🔍
          </p>
          <h1 className="mt-4 text-2xl font-bold">Produk tidak ditemukan</h1>
          <p className="mt-2 text-slate-600">
            Produk dengan ID <span className="font-semibold text-slate-900">"{id}"</span> tidak ada atau sudah dihapus.
          </p>
          <ButtonLink to="/products" className="mt-6">
            Kembali ke Daftar Produk
          </ButtonLink>
        </section>
      )}

      {state.status === 'ready' && (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-block rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            ID: {state.product.id}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold break-words sm:text-4xl">{state.product.name}</h1>
          <Price value={state.product.price} className="mt-2 text-2xl sm:text-3xl" />

          <dl className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500">Nama Produk</dt>
              <dd className="mt-1 font-semibold">{state.product.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Harga</dt>
              <dd className="mt-1 font-semibold">
                <Price value={state.product.price} className="text-base" />
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" onClick={() => setModal('edit')} className="sm:w-32">
              Edit
            </Button>
            <Button variant="subtleDanger" onClick={() => setModal('delete')} className="sm:w-32">
              Hapus
            </Button>
          </div>
        </article>
      )}

      {state.status === 'ready' && modal === 'edit' && (
        <ProductFormModal product={state.product} onSubmit={handleEdit} onClose={() => setModal('none')} />
      )}

      {state.status === 'ready' && modal === 'delete' && (
        <DeleteProductModal product={state.product} onConfirm={handleDelete} onClose={() => setModal('none')} />
      )}
    </>
  )
}
