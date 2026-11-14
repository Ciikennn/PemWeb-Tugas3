# Tugas 3 – Manajemen Produk

Aplikasi React + TypeScript (Vite) untuk mengelola daftar produk dan harga.

## Fitur
- Menampilkan daftar produk dalam bentuk kartu (ID, nama, harga format Rupiah)
- Pencarian produk berdasarkan nama
- Jumlah produk & keterangan "Menampilkan X dari Y produk"
- Pop-up **Tambah Produk** dengan validasi (nama wajib, harga > 0)
- Pop-up **Edit Produk** dengan data terisi otomatis
- Pop-up konfirmasi **Hapus Produk**
- Pop-up bisa ditutup dengan tombol ×, Batal, klik di luar, atau tombol Esc

## Menjalankan
```bash
npm install
npm run dev
```
Buka http://localhost:5173

## Struktur
```
src/
├── App.tsx                       # state utama & logika CRUD
├── types.ts                      # tipe Product
├── data/initialProducts.ts       # data awal 5 produk
├── utils/formatRupiah.ts         # format harga Rp
└── components/
    ├── SearchBar.tsx
    ├── ProductList.tsx
    ├── ProductCard.tsx
    ├── Modal.tsx                 # kerangka pop-up
    ├── ProductFormModal.tsx      # pop-up Tambah / Edit
    └── DeleteProductModal.tsx    # pop-up Hapus
```
