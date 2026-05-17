# ROADMAP

> Roadmap ini adalah dokumen hidup yang merefleksikan arah pengembangan proyek.
> Prioritas dapat berubah seiring kebutuhan. Semua timeline bersifat indikatif.
>
> **Product direction: Contribution Hub** -- Developer Activity Assistant
> Platform personal untuk membantu developer menjaga konsistensi aktivitas GitHub secara meaningful.
> Lihat dokumentasi produk di `.docs/product/` untuk detail lengkap.

## Fase 0: Foundation (Selesai)

- [x] Inisialisasi proyek Next.js 16 + TypeScript strict
- [x] Struktur folder Feature-Sliced Design (FSD)
- [x] Konfigurasi ESLint, Prettier, Husky, commitlint
- [x] Integrasi Tailwind CSS v4 + Shadcn UI
- [x] Setup TanStack React Query + Zustand + Zod
- [x] Setup next-intl untuk internasionalisasi
- [x] Setup Vitest + Testing Library + Playwright
- [x] Dokumentasi engineering (.docs/)
- [x] AGENTS.md -- AI collaboration guide
- [x] Lisensi (MIT), Changelog, Roadmap
- [x] CI workflow (GitHub Actions)

## Fase 1: MVP (Q3 2026)

### Product Definition

- [x] Product vision dan definition documents
- [x] Target user personas
- [x] Product design system dan UI/UX guidelines
- [x] Feature specifications detail

### Core Features

- [ ] **GitHub Activity Tracker**
  - Integrasi GitHub API untuk membaca aktivitas commit, PR, issue
  - Personal activity log harian
  - Kategorisasi aktivitas (coding, review, documentation, learning)

- [ ] **Personal Dashboard**
  - Overview aktivitas hari ini
  - Weekly activity chart
  - Streak tracker dengan meaningful milestones
  - Recent activity feed

- [ ] **Habit System**
  - Daily goals (minimal commit, PR, atau aktivitas)
  - Streak tracking dengan multiple streak types
  - Weekly progress report
  - Motivational insights

- [ ] **Auto-Dokumentasi**
  - Generate daily activity summary dari commit messages
  - Weekly progress report yang bisa di-export
  - Auto-generate changelog dari aktivitas

### Technical Foundation

- [ ] Better Auth integration (GitHub OAuth)
- [ ] Database setup untuk menyimpan aktivitas
- [ ] API endpoints untuk CRUD aktivitas
- [ ] Background job untuk sync GitHub activity
- [ ] Landing page dan onboarding flow

## Vision

Menjadi platform developer activity assistant yang membantu setiap developer di Indonesia dan dunia untuk:

- Menjaga konsistensi coding dengan habit system yang meaningful
- Mendokumentasikan progress pengembangan secara otomatis
- Meningkatkan personal branding melalui GitHub profile yang aktif
- Membangun kebiasaan engineering yang sehat dan sustainable

Dengan fondasi:

- Arsitektur yang maintainable dan scalable (FSD)
- Kualitas kode yang teruji (type-safe, tested, documented)
- Kolaborasi AI-first dengan dokumentasi yang lengkap
- Fokus pada meaningful contribution, bukan spam atau aktivitas artifisial

---

> Detail roadmap dan product documentation tersedia di `.docs/product/roadmap.md`
