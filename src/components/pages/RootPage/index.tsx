import { ButtonLink } from '../../atoms/Button'

export default function RootPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Manajemen Produk</h1>
      <p className="mx-auto mt-3 max-w-xl text-slate-600">
        Kelola daftar produk dan harga dalam satu tempat. Tambah, lihat detail, ubah, dan hapus produk dengan data yang
        tersimpan di server.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink to="/products">Lihat Daftar Produk</ButtonLink>
      </div>
    </section>
  )
}
