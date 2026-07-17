/**
 * Canonical data contract for a project.
 *
 * This is the shape of every `src/projects/<slug>/status.json`.
 * AI agents (or you) write to that file; the dashboard reads it.
 * Keep this in sync with the JSON — it is the single source of truth
 * for typing across the whole app.
 */

export type ProjectStatus =
  | 'In Progress'
  | 'Waiting'
  | 'Blocked'
  | 'Completed';

export type ProjectPriority = 'High' | 'Medium' | 'Low';

export interface Commit {
  hash: string;
  message: string;
}

/** Raw JSON as authored in status.json. */
export interface ProjectStatusFile {
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  /** 0–100 */
  progress: number;
  currentGoal: string;
  currentTask: string;
  nextTask: string;
  estimatedHoursRemaining: number;
  currentBranch: string;
  /** ISO 8601 date-time string. */
  lastUpdated: string;
  blockers: string[];
  recentDecisions: string[];
  modifiedFiles: string[];
  recentCommits: Commit[];
  tags: string[];
  nextSessionPrompt: string;
}

/** A fully-loaded project: status + its markdown context + derived slug. */
export interface Project extends ProjectStatusFile {
  /** Folder name under src/projects — used as the route param. */
  slug: string;
  /** Raw contents of context.md (rendered by MarkdownViewer). */
  context: string;
}

export interface DashboardStats {
  total: number;
  active: number;
  blocked: number;
  waiting: number;
  completed: number;
  averageProgress: number;
  hoursRemaining: number;
  updatedThisWeek: number;
}

export type FilterKey =
  | 'All'
  | ProjectStatus
  | 'High Priority'
  | 'Medium Priority'
  | 'Low Priority';
