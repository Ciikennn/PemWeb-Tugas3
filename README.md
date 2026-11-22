# Manajemen Produk – Frontend

Aplikasi React + TypeScript (Vite) dengan **React Router** dan **Tailwind CSS**, mengikuti struktur
[react-template](https://github.com/anasmcfudy/react-template) (Atomic Design). Data produk diambil dan
disimpan melalui backend Express ([PemWeb-Tugas3-BE](https://github.com/Ciikennn/PemWeb-Tugas3-BE)).

## Fitur
- Daftar produk, pencarian, tambah, edit, dan hapus (data dari backend)
- Halaman detail produk `/products/:id` dengan link kembali ke daftar
- Pesan jelas jika produk tidak ditemukan
- Halaman 404 untuk URL yang tidak terdaftar
- Tampilan responsif dengan Tailwind CSS

## Halaman
| URL | Halaman |
|---|---|
| `/` | Beranda |
| `/products` | Daftar produk |
| `/products/:id` | Detail produk |
| URL lain | Halaman 404 |

## Menjalankan
1. Jalankan backend (lihat README repo backend) di http://localhost:4000
2. Jalankan frontend
   ```bash
   npm install
   npm run dev
   ```
   Buka http://localhost:5173
3. (Opsional) jika URL backend berbeda, salin `.env.example` menjadi `.env` lalu ubah `VITE_API_BASE_URL`

## Struktur
```
app/                         # entry & routing (seperti template)
├── entry.tsx
├── routes.tsx
├── globals.css
├── page.tsx                 # /
├── products/page.tsx        # /products
├── products/[id]/page.tsx   # /products/:id
└── not-found/page.tsx       # 404
src/
├── components/
│   ├── atoms/        Button, Input, Label, Price, Spinner
│   ├── molecules/    FormField, Modal, ProductCard, ProductInfo, SearchBar, StatusMessage
│   ├── organisms/    Navbar, ProductGrid, ProductFormModal, DeleteProductModal
│   ├── templates/    PageLayout
│   └── pages/        RootPage, ProductsPage, ProductDetailPage, NotFoundPage
├── data/product/
│   ├── model/        product-model.ts       (validasi response)
│   ├── param/        product-list-param.ts  (query parameter)
│   ├── repository/   product-repository.ts  (payload → model)
│   └── source/       product-remote.ts      (request HTTP)
├── styles/           themes.style.css
├── types/            product.ts
└── utils/            formatRupiah.ts
```
