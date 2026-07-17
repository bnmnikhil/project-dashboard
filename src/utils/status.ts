import type {
  ProjectPriority,
  ProjectStatus,
} from '../types/project';

/**
 * Status / priority -> theme tokens. Centralised so ProjectCard,
 * StatusBadge, Sidebar and Timeline stay perfectly consistent.
 * Colors are OKLCH for perceptual uniformity.
 */

export interface StatusTheme {
  /** foreground / dot color */
  color: string;
  /** subtle filled background for badges */
  bg: string;
}

export const STATUS_THEME: Record<ProjectStatus, StatusTheme> = {
  'In Progress': { color: 'oklch(0.75 0.16 150)', bg: 'oklch(0.28 0.06 150)' },
  Waiting: { color: 'oklch(0.82 0.14 85)', bg: 'oklch(0.3 0.06 85)' },
  Blocked: { color: 'oklch(0.68 0.19 25)', bg: 'oklch(0.3 0.08 25)' },
  Completed: { color: 'oklch(0.72 0.13 250)', bg: 'oklch(0.28 0.06 250)' },
};

export const PRIORITY_COLOR: Record<ProjectPriority, string> = {
  High: 'oklch(0.72 0.16 25)',
  Medium: 'oklch(0.8 0.13 85)',
  Low: 'oklch(0.62 0.006 265)',
};

export function statusTheme(status: ProjectStatus): StatusTheme {
  return STATUS_THEME[status] ?? { color: 'oklch(0.7 0.006 265)', bg: 'oklch(0.26 0.006 265)' };
}
