# ADR-001: Product Pivot ke Contribution Hub

## Status

**Accepted**

## Context

Project ini awalnya dimulai sebagai starter foundation project untuk Next.js 16 dengan FSD architecture. ROADMAP.md sebelumnya menyebutkan visi sebagai "platform referensi film modern." Namun, setelah evaluasi lebih lanjut, beberapa faktor mendorong perubahan arah:

1. **Market terlalu kompetitif** untuk platform referensi film (TMDB, IMDb, MyDramaList sudah dominan)
2. **Tidak ada diferensiasi kuat** yang bisa dibangun di area tersebut dengan sumber daya terbatas
3. **Tim/Founder memiliki latar belakang dan passion di developer tooling**
4. **Kebutuhan nyata** di ekosistem developer Indonesia: tools untuk membantu konsistensi coding dan dokumentasi progress
5. **Foundation project sudah solid** secara teknis dan bisa diarahkan ke domain apapun

## Decision

Kami memutuskan untuk mengubah arah produk dari "platform referensi film" menjadi **Contribution Hub: Developer Activity Assistant**.

## Rationale

1. **Market need validation**: Banyak developer Indonesia mengalami masalah konsistensi coding, dokumentasi progress, dan personal branding di GitHub. Produk ini menyelesaikan masalah nyata.

2. **Teknologi alignment**: Tech stack yang sudah ada (Next.js, React Query, Zustand, Zod) sangat cocok untuk membangun developer tooling. GitHub API integration adalah use case yang natural.

3. **Differentiation**: Tidak ada produk Indonesia yang secara spesifik membahas "developer activity assistant" dengan fokus pada meaningful contribution.

4. **Scalability**: Produk bisa tumbuh dari personal tool ke team platform ke ecosystem.

5. **Developer empathy**: Kami memahami masalah ini karena kami juga mengalaminya sebagai developer.

6. **Foundation preservation**: Struktur FSD, coding standards, dan dokumentasi yang sudah dibangun tetap relevan dan bisa digunakan langsung.

## Consequences

### Positive

- Market niche yang jelas dan underserved
- Developer tooling memiliki recurring usage pattern (harian)
- Potensi community building yang kuat (developer-centric)
- Teknologi stack yang ada sangat cocok
- Bisa dimonetisasi dengan freemium model yang jelas

### Negative

- Target pasar lebih kecil dibanding platform referensi film
- Membutuhkan integrasi dengan GitHub API (dependency eksternal)
- Developer tools butuh trust building yang lebih lama
- Kompetisi dengan tools internasional (WakaTime, GitClear)

### Neutral

- Nama project (next-app) dan domain perlu diubah
- Dokumentasi produk harus ditulis ulang (dilakukan di ADR ini)
- Branding perlu dibangun dari awal

## Alternatives Considered

### Alternative 1: Tetap dengan platform referensi film

- Pros: Market besar, banyak yang bisa dipelajari
- Cons: Kompetisi ketat, tidak ada diferensiasi, butuh data konten yang besar
- **Ditolak** karena tidak ada competitive advantage

### Alternative 2: Productivity tool general

- Pros: Market sangat luas
- Cons: Terlalu generic, susah positioning, banyak kompetitor
- **Ditolak** karena terlalu broad

### Alternative 3: Coding bootcamp platform

- Pros: Tren edtech sedang naik
- Cons: Butuh konten edukasi, operasional berat, business model kompleks
- **Ditolak** karena terlalu berat untuk solo developer

## References

- [Product Definition](../product/definition.md)
- [Product Vision](../product/vision.md)
- [Execution Roadmap](../../ROADMAP.md)
- [ADR-002: Meaningful Contribution Philosophy](./adr-002-meaningful-contribution-philosophy.md)
