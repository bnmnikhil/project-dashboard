import { useMemo, useState } from 'react';
import type { FilterKey, Project } from '../types/project';

const FILTERS: FilterKey[] = [
  'All',
  'In Progress',
  'Blocked',
  'Waiting',
  'Completed',
  'High Priority',
  'Medium Priority',
  'Low Priority',
];

function matchesFilter(p: Project, f: FilterKey): boolean {
  switch (f) {
    case 'All':
      return true;
    case 'High Priority':
      return p.priority === 'High';
    case 'Medium Priority':
      return p.priority === 'Medium';
    case 'Low Priority':
      return p.priority === 'Low';
    default:
      return p.status === f;
  }
}

function matchesSearch(p: Project, q: string): boolean {
  if (!q.trim()) return true;
  const needle = q.toLowerCase();
  const haystack = [
    p.name,
    p.currentTask,
    p.currentGoal,
    p.nextTask,
    p.description,
    ...p.tags,
    ...p.recentDecisions,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
}

/** Search + filter state and the derived visible list. */
export function useProjectFilters(projects: Project[]) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterKey>('All');

  const visible = useMemo(
    () =>
      projects.filter(
        (p) => matchesFilter(p, filter) && matchesSearch(p, search),
      ),
    [projects, filter, search],
  );

  return {
    search,
    setSearch,
    filter,
    setFilter,
    filters: FILTERS,
    visible,
  };
}
