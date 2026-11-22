import { Outlet } from 'react-router'
import Navbar from '../organisms/Navbar'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-10">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Manajemen Produk · Tugas Pemrograman Web
      </footer>
    </div>
  )
}
