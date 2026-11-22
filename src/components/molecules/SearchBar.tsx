interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex w-full items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-500 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 sm:max-w-sm">
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        placeholder="Cari nama produk..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Cari nama produk"
        className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
      />
    </label>
  )
}
