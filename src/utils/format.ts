/** Small, dependency-free formatting helpers. */

/** Human relative time, e.g. "today", "yesterday", "3d ago", "2w ago". */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  const days = Math.round((now.getTime() - then.getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  if (days < 365) return `${Math.round(days / 30)}mo ago`;
  return `${Math.round(days / 365)}y ago`;
}

/** True if the ISO date is within the last 7 days. */
export function isThisWeek(iso: string, now: Date = new Date()): boolean {
  return (now.getTime() - new Date(iso).getTime()) / 86_400_000 <= 7;
}

/** "Done" when zero, else "22h left". */
export function hoursLabel(hours: number): string {
  return hours <= 0 ? 'Done' : `${hours}h left`;
}

/** Long human date, e.g. "Fri, Jul 17, 2026". */
export function longDate(now: Date = new Date()): string {
  return now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
