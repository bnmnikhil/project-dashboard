## What Interview Prep is

A **spaced-repetition trainer** for coding interviews. Log a problem, grade how it went, and the app schedules the next review.

## Current Context

**Shipped.** v1 is deployed and I'm using it daily. This project is in maintenance mode.

## Architecture Notes

- Scheduling uses the classic **SM-2** algorithm.
- Everything lives in `localStorage`; JSON export/import for backup.
- Problems are tagged by **pattern** to enable future analytics.

```ts
function sm2(grade: number, prev: Card): Card {
  // grade 0-5 -> next interval
}
```

## Open Questions

- Is SM-2 too aggressive for interview cramming timelines?

## Roadmap

| Phase | Scope | State |
|-------|-------|-------|
| v1 | Log + schedule + review | done |
| v2 | Pattern heatmap analytics | backlog |

## Current Sprint

- [x] SM-2 scheduler
- [x] Export / import
- [x] Deploy to GitHub Pages

## Known Issues

- None known in v1.

## Useful Commands

```bash
npm run dev
npm run build && npm run deploy
```

> Come back for the heatmap once there's real review history to visualize.
