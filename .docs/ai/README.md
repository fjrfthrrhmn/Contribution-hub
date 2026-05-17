# ai/ -- AI Agent Collaboration Guide

> Panduan kolaborasi antara developer dan AI coding agents.
> Dibuat agar AI agents bisa bekerja efektif dan konsisten.

---

## Tujuan

Folder ini berisi dokumentasi untuk memastikan AI agents (OpenCode, Claude, Copilot, dll.) dapat:

- Memahami konteks project dengan cepat
- Mengikuti coding standards yang sudah ditetapkan
- Menghasilkan kode yang konsisten dengan arsitektur
- Tidak melanggar boundaries yang sudah ditentukan
- Berkolaborasi efektif dengan developer manusia

---

## Struktur yang Direkomendasikan

```txt
ai/
├── README.md              # File ini -- panduan folder
├── agent-rules.md         # Aturan umum untuk AI agents
├── prompt-templates.md    # Template prompt untuk task umum
├── boundaries.md          # Apa yang BOLEH dan TIDAK BOLEH dilakukan AI
├── context-files.md       # File yang harus dibaca AI untuk konteks
└── review-checklist.md    # Checklist untuk AI code review
```

---

## Template Agent Rules

```markdown
# Agent Rule: [Judul]

## Trigger

[Kapan aturan ini berlaku]

## Rule

[Aturan yang harus diikuti]

## Example

[Contoh implementasi yang benar]

## Anti-Example

[Contoh yang salah]
```

---

## AI Agent Boundaries

### Boleh Dilakukan

- Refactor kode (rename, extract, restructure)
- Menulis unit test, integration test
- Memperbaiki type errors
- Menambah dokumentasi
- Optimasi performa minor
- Membuat komponen baru sesuai pattern existing

### Tidak Boleh Dilakukan Tanpa Approval

- Mengubah arsitektur inti
- Menghapus folder atau file existing
- Mengubah konfigurasi core (tsconfig, next.config)
- Menambah dependencies baru
- Mengubah API interface yang sudah dipakai
- Melakukan migration database

---

## Prompt Convention

Gunakan format berikut saat memberi instruksi ke AI agent:

```markdown
Task: [Deskripsi singkat]
File: [Path file yang diubah]
Pattern: [Referensi pattern yang sudah ada]
Scope: [Batasan perubahan]
Verify: [Command untuk verifikasi]
```

---

## Context Hierarchy

AI agents harus membaca file dalam urutan ini untuk memahami project:

1. `AGENTS.md` -- General engineering handbook
2. `CLAUDE.md` -- AI-specific instructions
3. `.docs/ai/` -- AI collaboration guide
4. `.docs/architecture/` -- Architecture documentation
5. `.docs/engineering/` -- Coding standards
6. Feature-specific documentation

---

## Best Practices

1. **Selalu baca AGENTS.md** -- Ini adalah single source of truth untuk engineering practices
2. **Gunakan template prompt** -- Memastikan instruksi jelas dan lengkap
3. **Verifikasi output** -- Jangan trust output AI tanpa review
4. **Update dokumentasi** -- Jika ada pattern baru, update dokumentasi AI
5. **Report issues** -- Jika AI sering membuat kesalahan tertentu, catat di sini
