# public/ -- Public Static Assets

## Fungsi

Static assets yang diserve langsung oleh web server: images, fonts, icons, manifest files, robots.txt, favicon.

## Aturan Development

- Semua file di public/ bisa diakses via `/filename`
- Jangan taruh sensitive data di public/
- Optimasi gambar sebelum commit (ukuran, format)

## Convention

- Nama file: kebab-case (`logo.svg`, `icon-192.png`, `og-image.jpg`)
- Folder grouping: `images/`, `fonts/`, `icons/`, `docs/`
- Favicon: `favicon.ico` di root public/

## Best Practices

- Gunakan format WebP atau AVIF untuk gambar
- next/image untuk optimasi gambar dari public/
- SVG harus di-optimasi (SVGO) sebelum commit
- robots.txt untuk SEO control
- manifest.json untuk PWA support

## AI Do's / Don'ts

- Boleh: mengupdate favicon, menambah static assets
- Tidak boleh: menaruh kode aplikasi atau secrets di public/
