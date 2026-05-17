# glossary/ -- Glossary Proyek

> Daftar istilah, singkatan, dan definisi yang digunakan dalam project.

---

## Tujuan

Folder ini berisi glosarium yang mencakup:

- Istilah teknis yang sering digunakan
- Singkatan dan akronim
- Domain-specific terminology
- Definisi konsep arsitektur
- Terminologi bisnis (jika ada)

---

## Struktur yang Direkomendasikan

```txt
glossary/
├── README.md              # File ini -- panduan folder + glosarium utama
├── technical-terms.md     # Istilah teknis
├── domain-terms.md        # Istilah domain bisnis
├── abbreviations.md       # Daftar singkatan
└── deprecated.md          # Istilah yang sudah tidak digunakan
```

---

## Template Glossary Entry

Setiap entri glosarium sebaiknya memiliki format:

```markdown
## [Istilah]

**Kategori:** [Technical / Domain / Business / Architecture]

**Singkatan:** [Jika ada]

**Definisi:**
[Definisi lengkap]

**Konteks:**
[Di mana istilah ini digunakan]

**Related:**
[Istilah terkait]
```

---

## Glossary Dasar

Berikut adalah istilah-istilah dasar yang digunakan dalam project ini.

### Arsitektur & Struktur

| Istilah        | Definisi                                                     |
| -------------- | ------------------------------------------------------------ |
| **FSD**        | Feature-Sliced Design -- metodologi struktur folder frontend |
| **Module**     | Unit mandiri dalam FSD yang punya boundary jelas             |
| **Feature**    | Modul fitur di `src/features/` yang self-contained           |
| **Shared**     | Layer di FSD untuk kode yang digunakan bersama               |
| **App Router** | Routing system Next.js 14+ dengan file-based routing         |
| **RSC**        | React Server Components -- komponen yang render di server    |

### Teknologi

| Istilah            | Definisi                                            |
| ------------------ | --------------------------------------------------- |
| **Next.js**        | React framework untuk production-grade applications |
| **TypeScript**     | JavaScript dengan static type system                |
| **Tailwind CSS**   | Utility-first CSS framework                         |
| **Shadcn UI**      | Component library berbasis Radix UI + Tailwind      |
| **TanStack Query** | Server state management untuk React                 |
| **Zustand**        | Lightweight client state management                 |
| **Zod**            | TypeScript-first schema validation                  |
| **Vitest**         | Unit test framework (Vite-native)                   |
| **Playwright**     | E2E browser testing framework                       |
| **Motion**         | Animation library (formerly Framer Motion)          |

### Development

| Istilah   | Definisi                                           |
| --------- | -------------------------------------------------- |
| **ADR**   | Architecture Decision Record                       |
| **PR**    | Pull Request                                       |
| **CI/CD** | Continuous Integration / Continuous Deployment     |
| **E2E**   | End-to-End testing                                 |
| **a11y**  | Accessibility (numeronym: a + 11 huruf + y)        |
| **i18n**  | Internationalization (numeronym: i + 18 huruf + n) |
| **SSR**   | Server-Side Rendering                              |
| **SSG**   | Static Site Generation                             |
| **ISR**   | Incremental Static Regeneration                    |

---

## Cara Menambah Glossary

1. Cari di folder `glossary/` apakah istilah sudah ada
2. Jika belum ada, tambahkan entri baru dengan format template di atas
3. Jika istilah domain-specific, masukkan di file yang sesuai
4. Jika istilah sudah tidak digunakan, pindahkan ke `deprecated.md`

---

_Glosarium ini hidup. Tambahkan istilah baru saat ditemukan._
