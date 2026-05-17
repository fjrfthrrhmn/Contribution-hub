# onboarding/ -- Onboarding Guide

> Panduan untuk developer baru yang bergabung dengan project.

---

## Tujuan

Folder ini berisi dokumentasi onboarding yang mencakup:

- Setup environment dari awal
- Panduan menjalankan project secara lokal
- Workflow harian yang harus diikuti
- Struktur project dan navigasi codebase
- Sumber daya untuk belajar teknologi yang digunakan
- Kontak dan channel komunikasi

---

## Struktur yang Direkomendasikan

```txt
onboarding/
├── README.md              # File ini -- panduan folder
├── quick-start.md         # Panduan cepat setup project
├── project-map.md         # Navigasi struktur project
├── daily-workflow.md      # Workflow harian
├── learning-resources.md  # Resources untuk belajar stack
└── faq.md                 # Frequently asked questions
```

---

## Template Quick Start

```markdown
# Quick Start

## Prerequisites

- [Tool/software dengan versi minimum]
- [Akun/layanan yang perlu didaftarkan]

## Installation

\`\`\`bash

# Clone repository

git clone [url]

# Install dependencies

bun install

# Copy environment variables

cp .env.example .env.local

# Run development server

bun dev
\`\`\`

## Verify

Buka http://localhost:3000 -- seharusnya halaman utama muncul.
\`\`\`bash
bun check-types # Harus exit 0
bun test # Harus semua passing
\`\`\`
```

---

## Daily Workflow Template

```markdown
# Daily Workflow

1. **Pull latest changes**
   \`\`\`bash
   git pull origin main
   bun install
   \`\`\`

2. **Create feature branch**
   \`\`\`bash
   git checkout -b feat/nama-fitur
   \`\`\`

3. **Development**
   \`\`\`bash
   bun dev # Start development server
   bun test # Run tests
   bun check-types # Type checking
   \`\`\`

4. **Commit**
   \`\`\`bash
   git add .
   git commit -m "feat(scope): deskripsi perubahan"
   \`\`\`

5. **Push dan buat PR**
   \`\`\`bash
   git push -u origin feat/nama-fitur
   \`\`\`
```

---

## Project Map Template

```markdown
# Project Map

## Root Structure

| Path              | Deskripsi                                |
| ----------------- | ---------------------------------------- |
| `src/app/`        | Entry point, routing, layout             |
| `src/components/` | Shared components (ui, layouts, widgets) |
| `src/features/`   | Feature modules (self-contained)         |
| `src/lib/`        | Integrations, API clients                |
| `src/utils/`      | Utility functions                        |
| `src/types/`      | Global type definitions                  |
| `.docs/`          | Engineering documentation                |
```

---

## Onboarding Checklist

### Week 1

- [ ] Setup development environment
- [ ] Baca `AGENTS.md` -- Engineering handbook
- [ ] Baca `.docs/architecture/` -- Architecture overview
- [ ] Jalankan project dan eksplorasi codebase
- [ ] Kerjakan starter task kecil

### Week 2

- [ ] Pahami Feature-Sliced Design structure
- [ ] Pelajari tech stack yang digunakan
- [ ] Buat contribution pertama (bug fix / small feature)
- [ ] Pahami CI/CD pipeline

### Month 1

- [ ] Mampu mengerjakan fitur secara mandiri
- [ ] Aktif dalam code review
- [ ] Mulai berkontribusi ke dokumentasi
- [ ] Memahami business domain produk
