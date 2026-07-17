import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CircleDashed,
  Clock,
  Flag,
  History,
  OctagonAlert,
  Target,
} from 'lucide-react';
import type { Project } from '../types/project';
import { statusTheme, PRIORITY_COLOR } from '../utils/status';
import { hoursLabel, relativeTime } from '../utils/format';
import ProgressBar from './ProgressBar';
import StatusBadge from './StatusBadge';

export default function ProjectCard({ project }: { project: Project }) {
  const theme = statusTheme(project.status);
  const blockerCount = project.blockers.length;

  return (
    <Link
      to={`/project/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 px-[18px] pb-4 pt-[18px] transition-all hover:-translate-y-0.5 hover:border-ink-600"
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ background: theme.color }}
      />

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 text-base font-semibold tracking-tight">
            {project.name}
          </div>
          <p className="line-clamp-2 text-[12.5px] leading-snug text-ink-400">
            {project.description}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="mb-3.5 flex items-center gap-[9px]">
        <ProgressBar value={project.progress} color={theme.color} />
        <span className="min-w-[34px] text-right font-mono text-xs font-semibold text-ink-100">
          {project.progress}%
        </span>
      </div>

      <div className="mb-3.5 flex flex-col gap-2">
        <Row icon={<Target className="h-3.5 w-3.5" style={{ color: 'oklch(0.6 0.006 265)' }} />} label="Goal" value={project.currentGoal} />
        <Row icon={<CircleDashed className="h-3.5 w-3.5" style={{ color: 'oklch(0.72 0.15 150)' }} />} label="Current" value={project.currentTask} />
        <Row icon={<ArrowRight className="h-3.5 w-3.5" style={{ color: 'oklch(0.6 0.006 265)' }} />} label="Next" value={project.nextTask} muted />
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-ink-700 pt-[13px] text-[11.5px] text-ink-400">
        <span className="inline-flex items-center gap-[5px]" style={{ color: PRIORITY_COLOR[project.priority] }}>
          <Flag className="h-3 w-3" /> {project.priority}
        </span>
        <span className="inline-flex items-center gap-[5px]">
          <Clock className="h-3 w-3" /> {hoursLabel(project.estimatedHoursRemaining)}
        </span>
        {blockerCount > 0 && (
          <span className="inline-flex items-center gap-[5px]" style={{ color: 'oklch(0.68 0.18 25)' }}>
            <OctagonAlert className="h-3 w-3" /> {blockerCount}{' '}
            {blockerCount === 1 ? 'blocker' : 'blockers'}
          </span>
        )}
        <span className="ml-auto inline-flex items-center gap-[5px]">
          <History className="h-3 w-3" /> {relativeTime(project.lastUpdated)}
        </span>
      </div>
    </Link>
  );
}

function Row({
  icon,
  label,
  value,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start gap-[9px]">
      <span className="mt-0.5 flex-none">{icon}</span>
      <div className="min-w-0">
        <span className="text-[11px] uppercase tracking-[0.04em] text-ink-500">
          {label}
        </span>
        <div
          className={`text-[13px] leading-snug ${muted ? 'text-ink-300' : 'text-ink-100/90'}`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
