# engineering/ -- Dokumentasi Engineering

> Engineering practices, code review, workflow, dan standar coding.

---

## Tujuan

Folder ini berisi dokumentasi tentang praktik engineering yang digunakan:

- Coding standards dan style guide
- Code review process
- Git workflow dan branch strategy
- Commit conventions
- Pull request checklist
- Refactoring guidelines
- Code ownership
- Definition of Done

---

## Struktur yang Direkomendasikan

```txt
engineering/
├── README.md              # File ini -- panduan folder
├── coding-standards.md    # TypeScript, React, styling standards
├── code-review.md         # Code review checklist dan process
├── git-workflow.md        # Branch strategy, commit convention
├── refactoring.md         # Refactoring guidelines dan triggers
├── definition-of-done.md  # Apa arti "selesai" untuk sebuah task
└── errors-and-learning.md # Catatan error yang pernah terjadi dan solusinya
```

---

## Template Coding Standard

```markdown
# [Topik] Standard

## Rule

[Aturan yang harus diikuti]

## Good Example

\`\`\`typescript
// Contoh yang benar
\`\`\`

## Bad Example

\`\`\`typescript
// Contoh yang salah
\`\`\`

## Rationale

[Mengapa aturan ini penting]

## Enforcement

[Bagaimana aturan ini ditegakkan -- ESLint, Prettier, manual review]
```

---

## Engineering Principles

1. **Boy Scout Rule** -- Selalu tinggalkan kode lebih bersih dari sebelumnya
2. **YAGNI** -- You Ain't Gonna Need It. Jangan tambahkan fitur yang belum dibutuhkan
3. **DRY** -- Don't Repeat Yourself. Tapi lebih baik duplikasi daripada premature abstraction
4. **KISS** -- Keep It Simple. Solusi sederhana lebih baik daripada solusi clever
5. **Single Responsibility** -- Satu function/component/module untuk satu tanggung jawab
6. **Fail Fast** -- Deteksi error sedini mungkin, jangan biarkan silent failure

---

## Definition of Done Checklist

- [ ] Kode sudah di-review
- [ ] Tidak ada TypeScript error
- [ ] Semua test passing
- [ ] Tidak ada TODO/FIXME baru tanpa issue tracker
- [ ] Dokumentasi di-update
- [ ] Tidak ada breaking changes tanpa approval
- [ ] Performance tidak regresi
- [ ] Aksesibilitas tetap terjaga
