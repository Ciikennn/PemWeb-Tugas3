import { useLocation } from 'react-router'
import { ButtonLink } from '../../atoms/Button'

export default function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:py-20">
      <p className="text-7xl font-extrabold text-primary sm:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Halaman tidak ditemukan</h1>
      <p className="mt-2 max-w-md text-slate-600">
        Halaman <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm break-all text-slate-800">{pathname}</code>{' '}
        tidak terdaftar atau sudah dipindahkan.
      </p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <ButtonLink to="/">Ke Halaman Utama</ButtonLink>
        <ButtonLink to="/products" variant="secondary">
          Ke Daftar Produk
        </ButtonLink>
      </div>
    </section>
  )
}
