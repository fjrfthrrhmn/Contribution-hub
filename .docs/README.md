# .docs -- Pusat Dokumentasi Engineering

> Dokumentasi internal untuk pengembangan project ini.
> Bukan dokumentasi user -- ini adalah **engineering knowledge base**.

---

## Tujuan

Folder `.docs` adalah pusat dokumentasi engineering yang berfungsi sebagai:

- **Single source of truth** untuk keputusan teknis dan arsitektur
- **Knowledge base** untuk developer dan AI agent
- **Onboarding hub** untuk anggota tim baru
- **Decision log** untuk mencatat why di balik setiap keputusan

---

## Struktur Folder

| Folder          | Fungsi                                                   |
| --------------- | -------------------------------------------------------- |
| `adr/`          | Architecture Decision Records -- keputusan arsitektur    |
| `ai/`           | AI agent collaboration guide, prompt conventions         |
| `api/`          | API documentation, endpoint specs, request/response      |
| `architecture/` | System architecture, data flow, module boundaries        |
| `deployment/`   | Deployment pipeline, environments, infrastructure        |
| `design/`       | Design system, UI/UX guidelines, component patterns      |
| `engineering/`  | Engineering practices, code review, coding standards     |
| `glossary/`     | Project terminology, abbreviations, definitions          |
| `onboarding/`   | New developer onboarding, setup guide                    |
| `product/`      | Visi produk, roadmap, user stories, feature specs        |
| `security/`     | Security policies, auth, authorization, data protection  |
| `testing/`      | Testing strategy, test types, coverage goals             |
| `technical/`    | Tech stack, dependencies, konfigurasi, development setup |

---

## Cara Menggunakan

1. **Baca dulu** -- cek folder yang relevan sebelum memulai task baru
2. **Update secara berkala** -- tambahkan insight, keputusan, dan pelajaran baru
3. **Jangan hapus** -- dokumentasi adalah aset. Deprecate, jangan delete
4. **Gunakan template** -- setiap folder menyediakan template untuk konsistensi
5. **Bahasa Indonesia** -- semua dokumentasi wajib Bahasa Indonesia (kecuali kode)

---

## Prinsip Penulisan

| Prinsip          | Penjelasan                                              |
| ---------------- | ------------------------------------------------------- |
| **Professional** | Hindari bahasa informal, emoji, atau subjective opinion |
| **Clear**        | Jelaskan konteks, bukan hanya apa yang terjadi          |
| **Practical**    | Berikan contoh nyata, bukan teori abstrak               |
| **Up-to-date**   | Jika informasi berubah, update dokumentasi              |
| **Searchable**   | Gunakan judul dan struktur yang mudah dicari            |

---

## Format Dokumen

Setiap dokumen sebaiknya memiliki struktur:

```markdown
# Judul Dokumen

## Tujuan

[Mengapa dokumen ini dibuat]

## Konteks

[Latar belakang, keputusan yang melatarbelakangi]

## Isi

[Konten utama]

## Referensi

[Link ke dokumen terkait]
```

---

_Dokumentasi adalah investasi. Setiap menit yang dihabiskan untuk menulis docs menghemat berjam-jam kebingungan di masa depan._
