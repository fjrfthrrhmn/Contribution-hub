# adr/ -- Architecture Decision Records

> Mencatat keputusan arsitektur penting beserta konteks dan konsekuensinya.

---

## Tujuan

ADR (Architecture Decision Record) adalah dokumentasi **keputusan arsitektur** yang mencakup:

- Konteks mengapa keputusan diambil
- Alternatif yang dipertimbangkan
- Keputusan final yang diambil
- Konsekuensi dari keputusan tersebut
- Status keputusan (proposed, accepted, deprecated, superseded)

---

## Format ADR (Y-Statements)

Setiap ADR menggunakan format **Y-Statement**:

```markdown
# ADR-[nomor]: [Judul Keputusan]

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-NNN]

## Context

[Jelaskan konteks dan problem yang mendorong keputusan ini]

## Decision

[Gunakan format "We will..." atau "Kami memutuskan untuk..."]

## Rationale

[Jelaskan alasan di balik keputusan]

## Consequences

### Positive

- [Dampak positif]

### Negative

- [Dampak negatif]

### Neutral

- [Dampak netral]

## Alternatives Considered

### Alternative 1: [Nama]

- Pros: ...
- Cons: ...

### Alternative 2: [Nama]

- Pros: ...
- Cons: ...

## References

- [Link ke dokumentasi terkait]
- [Link ke issue/PR]
```

---

## Template ADR (Simple)

```markdown
# ADR-001: [Judul]

**Status:** Proposed

**Context:**
[Problem dan latar belakang]

**Decision:**
Kami akan [keputusan]

**Rationale:**
[Alasan]

**Consequences:**

- Positif: [...]
- Negatif: [...]

**Alternatives:**

1. [Alternatif 1] -- ditolak karena [...]
2. [Alternatif 2] -- ditolak karena [...]
```

---

## Kapan Harus Membuat ADR

Buat ADR ketika:

- Mengadopsi teknologi/library baru
- Mengubah struktur folder atau arsitektur
- Memutuskan design pattern yang signifikan
- Mengubah data model atau schema
- Memutuskan strategi caching, state management, API design
- Mengubah konfigurasi infrastruktur

---

## Best Practices

1. **Buat sebelum implementasi** -- ADR adalah keputusan, bukan catatan setelah coding
2. **Satu ADR per keputusan** -- Jangan campur beberapa keputusan dalam satu ADR
3. **Nomor berurutan** -- ADR-001, ADR-002, dst.
4. **Immutable setelah accepted** -- Jika berubah, buat ADR baru yang supersede
5. **Kaitkan dengan kode** -- Referensikan ADR di commit messages dan PR descriptions
6. **Review berkala** -- Pastikan ADR yang deprecated ditandai dengan jelas
