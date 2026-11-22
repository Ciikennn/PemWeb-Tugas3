import { Link, NavLink } from 'react-router'

const links = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/products', label: 'Produk', end: false },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3" aria-label="Navigasi utama">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-white">MP</span>
          <span className="hidden sm:inline">Manajemen Produk</span>
        </Link>

        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  'rounded-md px-3 py-2 text-sm font-semibold transition-colors ' +
                  (isActive ? 'bg-primary-soft text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
