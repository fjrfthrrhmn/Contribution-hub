# src/app/(public)/ -- Public Routes

## Fungsi

Route group untuk halaman publik yang tidak memerlukan autentikasi: landing page dan login.

## Struktur

```
(public)/
├── login/
│   └── page.tsx   → /login
└── page.tsx       → /
```

## Aturan

- Tidak menggunakan AppShell -- layout full-bleed
- Hanya berisi halaman yang bisa diakses tanpa sesi
- Tidak ada data fetching dari GitHub API
- CTA dan link mengarah ke `/login` untuk autentikasi

## AI Do's / Don'ts

- Boleh: menambah halaman publik baru (forgot-password, about, dll)
- Tidak boleh: menempatkan halaman yang butuh autentikasi di sini
