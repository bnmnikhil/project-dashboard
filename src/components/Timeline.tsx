import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import type { Project } from '../types/project';
import { statusTheme } from '../utils/status';
import { relativeTime } from '../utils/format';

/**
 * Recently-updated feed. `projects` is expected pre-sorted by
 * lastUpdated desc (loadProjects guarantees this).
 */
export default function Timeline({ projects }: { projects: Project[] }) {
  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-800 px-[18px] py-[17px]">
      <div className="mb-3.5 flex items-center gap-2">
        <Activity className="h-[15px] w-[15px] text-ink-300" />
        <span className="text-xs font-semibold tracking-wide text-ink-300">
          Recently Updated
        </span>
      </div>
      <div className="flex flex-col">
        {projects.map((p, i) => {
          const theme = statusTheme(p.status);
          const last = i === projects.length - 1;
          return (
            <Link
              key={p.slug}
              to={`/project/${p.slug}`}
              className={`flex gap-[11px] py-[9px] ${last ? '' : 'border-b border-ink-700'}`}
            >
              <div className="flex flex-col items-center pt-[3px]">
                <span
                  className="h-[9px] w-[9px] rounded-full"
                  style={{ background: theme.color, boxShadow: `0 0 0 3px ${theme.bg}` }}
                />
                {!last && <span className="mt-1 w-px flex-1 bg-ink-700" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[13px] font-medium">{p.name}</span>
                  <span className="whitespace-nowrap text-[11px] text-ink-500">
                    {relativeTime(p.lastUpdated)}
                  </span>
                </div>
                <div className="mt-0.5 truncate text-[11.5px] leading-snug text-ink-400">
                  {p.currentTask}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
