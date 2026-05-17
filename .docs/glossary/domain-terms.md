# Glossary: Contribution Hub Domain Terms

> Istilah dan definisi spesifik domain Contribution Hub.

---

## A

### Activity

**Kategori:** Domain

Setiap aksi yang tercatat di platform, termasuk commit, pull request, issue, code review, release, dan aktivitas GitHub lainnya. Setiap activity memiliki tipe, timestamp, repository, dan metadata.

### Activity Log

**Kategori:** Domain

Daftar kronologis semua aktivitas yang pernah dilakukan pengguna. Bisa difilter, dicari, dan diekspor.

### Activity Sync

**Kategori:** Technical

Proses sinkronisasi data aktivitas dari GitHub API ke database lokal. Dilakukan secara periodik (default: setiap 15 menit).

### Automation Level

**Kategori:** Domain

Tingkat otomatisasi yang dipilih pengguna: Manual (pencatatan manual), Semi-Automatic (sistem mendeteksi, user mengonfirmasi), atau Automatic (sistem mencatat otomatis).

---

## B

### Badge

**Kategori:** Domain

Lencana digital yang diberikan sebagai pengakuan atas pencapaian tertentu (streak milestones, kategori aktivitas, dll). Bisa ditampilkan di GitHub profile.

---

## C

### Coding Streak

**Kategori:** Domain

Jumlah hari berturut-turut di mana pengguna memiliki aktivitas coding yang meaningful. Berbeda dengan commit streak karena mempertimbangkan kualitas aktivitas.

### Contribution

**Kategori:** Domain

Aktivitas yang memberikan nilai pada ekosistem pengembangan perangkat lunak. Tidak semua aktivitas GitHub otomatis dianggap contribution -- harus memenuhi kriteria meaningful.

### Contribution Hub

**Kategori:** Domain

Nama produk. Platform personal developer activity assistant untuk membantu konsistensi, dokumentasi, dan personal branding developer.

---

## D

### Daily Goal

**Kategori:** Domain

Target aktivitas yang ditetapkan pengguna per hari (misal: minimal 1 commit meaningful dan 1 PR review). Bisa dikustomisasi per hari (weekday vs weekend).

### Daily Summary

**Kategori:** Domain

Ringkasan aktivitas harian yang di-generate otomatis setiap pukul 23:59. Berisi highlight, metrik, dan narasi aktivitas hari itu.

---

## G

### Grace Period

**Kategori:** Domain

Periode toleransi di mana streak tidak putus meskipun tidak ada aktivitas. Default: 1 hari per minggu. Memberikan fleksibilitas tanpa menghancurkan motivasi.

---

## H

### Habit System

**Kategori:** Domain

Sistem inti produk yang membantu developer membangun kebiasaan coding konsisten melalui goals, streaks, insight, dan positive reinforcement.

### Heatmap

**Kategori:** Domain / UI

Visualisasi aktivitas berbasis grid (seperti GitHub contribution graph) yang menunjukkan intensitas aktivitas per hari dalam periode tertentu.

---

## M

### Meaningful Contribution

**Kategori:** Domain

Aktivitas yang memenuhi kriteria autentisitas, konteks, progresi, dan dampak. Lihat [ADR-002: Meaningful Contribution Philosophy](../adr/adr-002-meaningful-contribution-philosophy.md).

### Milestone

**Kategori:** Domain

Tonggak pencapaian dalam streak system (7, 14, 30, 60, 100, 365 hari). Setiap milestone memberikan badge dan pengakuan.

---

## O

### Overall Streak

**Kategori:** Domain

Streak gabungan dari semua tipe aktivitas (coding, review, learning, management). Representasi paling komprehensif dari konsistensi developer.

---

## P

### Profile Enhancer

**Kategori:** Domain

Fitur untuk meningkatkan kualitas tampilan GitHub profile secara meaningful, termasuk smart README generator, badges, dan activity visualization.

---

## R

### Review Streak

**Kategori:** Domain

Jumlah hari berturut-turut dengan aktivitas code review. Memotivasi developer untuk aktif mereview kode rekan tim/komunitas.

---

## S

### Smart Deduplication

**Kategori:** Technical

Algoritma untuk memastikan aktivitas yang sama tidak tercatat dua kali. Contoh: commit dalam satu push digabung menjadi satu entry, PR updates tidak membuat entry baru.

### Streak

**Kategori:** Domain

Jumlah hari berturut-turut di mana pengguna memenuhi kriteria aktivitas minimum. Tipe streak: coding, review, learning, overall.

### Streak Freeze

**Kategori:** Domain

Fitur yang memungkinkan pengguna "membekukan" streak maksimal 3 hari per bulan. Untuk situasi darurat ketika benar-benar tidak bisa coding.

---

## W

### Weekly Report

**Kategori:** Domain

Laporan mingguan yang di-generate otomatis. Berisi overview, metrik agregat, insight, dan rekomendasi untuk minggu depan.

---

## Related Documents

- [Glossary Utama](./README.md)
- [Product Definition](../product/definition.md)
- [ADR-002: Meaningful Contribution Philosophy](../adr/adr-002-meaningful-contribution-philosophy.md)
