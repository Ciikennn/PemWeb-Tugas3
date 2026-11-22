# Manajemen Produk – Frontend

Aplikasi React + TypeScript (Vite) untuk mengelola daftar produk dan harga.
Menggunakan **React Router** untuk navigasi, **Tailwind CSS** untuk tampilan, dan terhubung ke
backend Express ([PemWeb-Tugas3-BE](https://github.com/Ciikennn/PemWeb-Tugas3-BE)) melalui REST API `/api/products`.

## Fitur
- Daftar produk dengan pencarian berdasarkan nama
- Tambah, edit, dan hapus produk melalui pop-up (data tersimpan lewat API)
- Halaman detail produk `/products/:id` dengan link kembali ke daftar
- Pesan "Produk tidak ditemukan" jika ID tidak ada
- Halaman 404 untuk URL yang tidak terdaftar
- Tampilan responsif (HP, tablet, desktop)

## Halaman (Routes)
| Path | Halaman |
|---|---|
| `/` | Beranda |
| `/products` | Daftar produk |
| `/products/:id` | Detail produk |
| `*` | 404 – Halaman tidak ditemukan |

## Menjalankan

### 1. Backend
```bash
git clone https://github.com/Ciikennn/PemWeb-Tugas3-BE.git
cd PemWeb-Tugas3-BE
npm install
cp .env.example .env    # isi DATABASE_URL & DIRECT_URL (Neon)
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev             # http://localhost:4000
```

### 2. Frontend
```bash
npm install
npm run dev             # http://localhost:5173
```
Jika backend berjalan di alamat lain, salin `.env.example` menjadi `.env` lalu ubah `VITE_API_URL`.

## Struktur (Atomic Design)
```
src/
├── api/products.ts          # pemanggilan REST API backend
├── components/
│   ├── atoms/               # Button, Input, Label, Price, Spinner
│   ├── molecules/           # FormField, SearchBar, ProductInfo, Modal, StatusMessage
│   ├── organisms/           # Navbar, ProductCard, ProductGrid, ProductFormModal, DeleteProductModal
│   └── templates/           # MainLayout (Navbar + konten + footer)
├── pages/                   # HomePage, ProductListPage, ProductDetailPage, NotFoundPage
├── routes/index.tsx         # konfigurasi React Router
├── types.ts
├── utils/formatRupiah.ts
├── index.css                # Tailwind CSS + tema warna
└── main.tsx
```
