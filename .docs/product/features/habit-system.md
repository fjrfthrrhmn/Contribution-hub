# Feature: Developer Habit System

> Sistem pembangun kebiasaan coding yang konsisten dan meaningful.

---

## Deskripsi

Habit System adalah inti dari Contribution Hub. Bukan sekadar streak counter biasa, sistem ini dirancang untuk membantu developer membangun kebiasaan coding jangka panjang dengan pendekatan yang realistis dan memotivasi.

## User Story

Sebagai developer, saya ingin memiliki sistem yang membantu saya tetap konsisten coding setiap hari, dengan target yang realistis dan feedback yang memotivasi, sehingga coding menjadi kebiasaan alami bukan paksaan.

## Acceptance Criteria

### Streak System

- [ ] Multiple streak types (bukan hanya commit streak):
  - **Coding Streak**: Hari berturut-turut dengan aktivitas coding
  - **Review Streak**: Hari berturut-turut dengan code review
  - **Learning Streak**: Hari berturut-turut dengan aktivitas belajar
  - **Overall Streak**: Gabungan semua aktivitas meaningful
- [ ] Grace period: 1 hari "sakit" per minggu (streak tidak putus)
- [ ] Streak freeze: Pengguna bisa freeze streak maksimal 3 hari/bulan
- [ ] Visual progress bar menuju milestone berikutnya
- [ ] Milestone achievements (7, 14, 30, 60, 100, 365 hari)

### Daily Goals

- [ ] Pengguna dapat set daily goals (minimal aktivitas per hari)
- [ ] Goal types:
  - Minimal 1 commit meaningful (bukan "fix typo")
  - Minimal 1 PR review
  - Minimal 1 issue/PR dibuat
  - Waktu coding minimal (X menit)
- [ ] Goals bisa dikustomisasi per hari (weekday vs weekend)
- [ ] Progress tracking real-time terhadap goals
- [ ] Smart suggestions untuk goal yang belum tercapai

### Progress Tracking

- [ ] Daily overview: aktivitas hari ini vs target
- [ ] Weekly summary: total aktivitas, streak status, insight
- [ ] Monthly report: tren, pola, area improvement
- [ ] Yearly heatmap (seperti GitHub contribution graph)
- [ ] Category breakdown (coding vs review vs management)

### Motivational System

- [ ] Positive reinforcement (bukan punishment):
  - "You've coded for 14 days straight! Great consistency."
  - "This week you reviewed 5 PRs -- that's helping the community."
- [ ] Insight yang actionable:
  - "You tend to code more on weekends. Try to balance it out."
  - "Your best coding hours are 8-10 PM."
- [ ] No negative messaging (tidak ada "streak anda hilang" -- gunakan "ayo mulai lagi")
- [ ] Customizable notification preferences

### Gamification Elements

- [ ] Badges untuk pencapaian spesifik
- [ ] Level system berdasarkan total aktivitas
- [ ] Unlockable themes/avatars (opsional)
- [ ] Weekly challenges (opsional, non-binding)

### Anti-Gaming

- [ ] Aktivitas harus meaningful untuk dihitung:
  - Tidak menghitung commit "update README" berulang
  - Tidak menghitung force push ke branch yang sama
  - Tidak menghitung aktivitas di repository kosong
- [ ] Minimum threshold untuk setiap tipe aktivitas
- [ ] Anomaly detection untuk aktivitas mencurigakan

## Technical Notes

### Streak Calculation Algorithm

```
Initialize current_streak = 0
Initialize longest_streak = 0
Initialize last_active_date = null

For each day in descending order (from today):
  If day has qualifying activity:
    If last_active_date is null or last_active_date == yesterday:
      current_streak++
      last_active_date = day
    Else if last_active_date > yesterday:
      Skip (already counted)
    Else:
      Break (streak ended)
  Else:
    If grace_available and grace_not_used:
      Use grace (continue streak)
    Else:
      Break (streak ended)

longest_streak = max(longest_streak, current_streak)
```

### Data Model

```typescript
interface HabitConfig {
	userId: string
	dailyGoal: {
		minCommits: number
		minReviews: number
		minCodingMinutes: number
	}
	weekdayGoal: GoalConfig // Senin-Jumat
	weekendGoal: GoalConfig // Sabtu-Minggu
	graceDaysUsed: number
	streakFreezeUsed: number
	notifications: {
		dailyDigest: boolean
		streakWarning: boolean
		goalReminder: boolean
	}
}

interface Streak {
	userId: string
	type: "coding" | "review" | "learning" | "overall"
	currentStreak: number
	longestStreak: number
	lastActiveDate: Date
	milestoneReached: number[] // [7, 14, 30, ...]
}
```

### Database Tables

- `habit_configs` -- Konfigurasi goals per pengguna
- `streaks` -- Data streak per tipe
- `daily_logs` -- Log aktivitas harian (denormalized untuk performa)
- `achievements` -- Badges dan milestones yang sudah diraih

## Dependencies

- TanStack React Query (daily stats)
- Zustand (UI state untuk habit config)
- date-fns (date manipulation untuk streak calculation)
- Vitest (unit test untuk streak calculation algorithm)

## Related Documents

- [Activity Tracking](./activity-tracking.md)
- [Auto Documentation](./auto-documentation.md)
- [Product Roadmap](../roadmap.md)
