import { useMemo } from 'react';
import { loadProjects } from '../utils/projects';
import { isThisWeek } from '../utils/format';
import type { DashboardStats, Project } from '../types/project';

/**
 * Central data hook. Wraps the static loader so components never import
 * the loader directly — the day this becomes async (real API, git integration)
 * only this hook changes.
 */
export function useProjects(): { projects: Project[]; stats: DashboardStats } {
  return useMemo(() => {
    const projects = loadProjects();

    const total = projects.length;
    const by = (s: Project['status']) =>
      projects.filter((p) => p.status === s).length;

    const stats: DashboardStats = {
      total,
      active: by('In Progress'),
      blocked: by('Blocked'),
      waiting: by('Waiting'),
      completed: by('Completed'),
      averageProgress: total
        ? Math.round(projects.reduce((a, p) => a + p.progress, 0) / total)
        : 0,
      hoursRemaining: projects.reduce(
        (a, p) => a + p.estimatedHoursRemaining,
        0,
      ),
      updatedThisWeek: projects.filter((p) => isThisWeek(p.lastUpdated)).length,
    };

    return { projects, stats };
  }, []);
}
