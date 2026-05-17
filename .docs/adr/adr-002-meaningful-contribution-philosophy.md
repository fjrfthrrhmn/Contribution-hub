# ADR-002: Meaningful Contribution Philosophy

## Status

**Accepted**

## Context

Salah satu risiko terbesar dalam membangun tools yang berhubungan dengan GitHub contributions adalah insentif yang salah. Banyak tools dan layanan yang secara tidak sengaja (atau sengaja) mendorong perilaku spam:

- Commit kosong untuk mempertahankan streak
- Repository boilerplate yang tidak bermakna
- Automated activity yang tidak merepresentasikan pekerjaan nyata
- "GitHub grass" farming tools

Kami harus mendefinisikan secara eksplisit apa arti "meaningful contribution" dalam konteks produk kami dan bagaimana memastikan produk tidak disalahgunakan.

## Decision

Kami mengadopsi **Meaningful Contribution Philosophy** sebagai prinsip desain inti produk. Filosofi ini memiliki empat pilar:

### Pilar 1: Authenticity

Setiap aktivitas yang tercatat di Contribution Hub harus merepresentasikan pekerjaan developer yang autentik. Kami mendefinisikan aktivitas autentik sebagai:

- **Kode yang ditulis**: Commit yang mengandung perubahan kode berarti (bukan whitespace, rename file tanpa perubahan, atau template boilerplate)
- **Kode yang direview**: PR review dengan komentar substantif
- **Diskusi teknis**: Issue/PR discussion yang mengandung kontribusi pemikiran
- **Dokumentasi**: Perubahan dokumentasi yang menambah nilai

### Pilar 2: Context

Setiap aktivitas harus memiliki konteks yang jelas:

- Commit message yang deskriptif (bukan "update" atau "fix")
- PR dengan deskripsi yang jelas tentang apa dan mengapa
- Issue dengan reproduksi langkah atau proposal yang jelas

### Pilar 3: Progression

Aktivitas harus menunjukkan progression:

- Kode yang berkembang (bukan rewrite berulang)
- Fitur yang selesai (bukan setengah jadi)
- Bug yang diperbaiki (bukan introduced)
- Pengetahuan yang bertambah (learning commits)

### Pilar 4: Impact

Aktivitas harus memiliki impact:

- Digunakan oleh orang lain (downloads, stars, forks)
- Membantu orang lain (answer, review, mentoring)
- Membangun sesuatu yang berguna (bukan tutorial copy-paste)

## Implementation Rules

### What We Count

| Aktivitas                    | Dihitung?   | Syarat                                |
| ---------------------------- | ----------- | ------------------------------------- |
| Commit dengan perubahan kode | Ya          | > 5 lines changed, meaningful message |
| Commit dokumentasi           | Ya          | Menambah/memperbaiki dokumentasi      |
| PR dibuat                    | Ya          | Dengan deskripsi meaningful           |
| PR review                    | Ya          | Dengan komentar substantif            |
| Issue dibuat                 | Ya          | Dengan deskripsi jelas                |
| Code review comment          | Ya          | Substantif, bukan "LGTM" saja         |
| Release                      | Ya          | Dengan release notes                  |
| Commit "fix typo"            | Conditional | Hanya jika ada perubahan berarti      |
| Fork repository              | Tidak       | Tidak menunjukkan aktivitas           |
| Star repository              | Tidak       | Tidak menunjukkan aktivitas           |
| Commit di repository kosong  | Tidak       | Tidak meaningful                      |
| Force push                   | Tidak       | Sering untuk rewrite history          |

### Anti-Gaming Mechanisms

1. **Minimum threshold**: Aktivitas harus melewati threshold minimum untuk dihitung (misal: commit harus mengubah minimal 5 baris kode)

2. **Rate limiting**: Maksimum aktivitas yang bisa dicatat per jam untuk mencegah spam

3. **Anomaly detection**: Deteksi pola mencurigakan (misal: 50 commit dalam 5 menit)

4. **Manual flagging**: Pengguna bisa melaporkan aktivitas yang mencurigakan

5. **Streak freeze, not streak hack**: Grace period untuk streak, bukan cara untuk memperpanjang streak artifisial

### What We Never Do

- Tidak pernah membuat commit atas nama pengguna
- Tidak pernah generate aktivitas palsu
- Tidak pernah memanipulasi statistik GitHub
- Tidak pernah mendorong pengguna untuk membuat kontribusi artifisial
- Tidak pernah menyembunyikan atau memfilter data untuk membuat profile terlihat lebih baik dari kenyataan

## Consequences

### Positive

- Produk memiliki diferensiasi yang jelas dari GitHub automation tools lain
- Membangun trust dengan pengguna yang peduli kualitas
- Menarik pengguna yang tepat (quality-seekers, bukan spammer)
- Fondasi etis yang kuat untuk pengembangan jangka panjang

### Negative

- Batasan ini mengurangi potensi pertumbuhan jumlah pengguna
- Beberapa pengguna potensial akan memilih tools lain yang lebih "relaxed"
- Perlu investasi lebih dalam deteksi dan filtering aktivitas
- Kompleksitas teknis untuk membedakan meaningful vs non-meaningful activity

### Neutral

- Perlu edukasi pengguna tentang filosofi ini
- Beberapa metrik engagement akan lebih rendah secara numerik
- Tapi metrik kualitas (retensi, satisfaksi) seharusnya lebih tinggi

## Alternatives Considered

### Alternative 1: Tidak ada filter (hitung semua aktivitas)

- Pros: Implementasi lebih sederhana, lebih banyak aktivitas tercatat
- Cons: Rentan spam, tidak membedakan kualitas
- **Ditolak** karena bertentangan dengan value produk

### Alternative 2: Filter ketat (hanya commit kode)

- Pros: Kualitas terjamin
- Cons: Dokumentasi dan review tidak dihitung, tidak merepresentasikan aktivitas developer holistik
- **Ditolak** karena terlalu sempit

### Alternative 3: User-defined filters

- Pros: Fleksibel untuk setiap pengguna
- Cons: Kompleksitas tinggi, sulit konsisten antar pengguna
- **Ditolak** karena akan menyebabkan inkonsistensi dan potensi penyalahgunaan

## References

- [ADR-001: Product Pivot](./adr-001-product-pivot-contribution-hub.md)
- [Product Definition](../product/definition.md)
- [Product Vision](../product/vision.md)
- [Habit System Feature Spec](../product/features/habit-system.md)
