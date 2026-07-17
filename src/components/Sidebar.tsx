import { NavLink } from 'react-router-dom';
import {
  Activity,
  CircleDot,
  GitBranch,
  Home,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { statusTheme } from '../utils/status';

/**
 * Left navigation: brand, primary nav, and a live list of projects.
 * "Activity" / "AI Summaries" are stubbed with a `soon` chip — the
 * architecture is designed for these extensions (see README).
 */
export default function Sidebar() {
  const { projects } = useProjects();

  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-none flex-col border-r border-ink-700 bg-ink-900">
      <div className="flex items-center gap-3 border-b border-ink-700 px-[22px] py-[18px] pt-[22px]">
        <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-lg"
          style={{
            background:
              'linear-gradient(140deg, oklch(0.68 0.15 265), oklch(0.6 0.16 300))',
            boxShadow: '0 2px 10px oklch(0.5 0.15 280 / 0.4)',
          }}
        >
          <LayoutGrid className="h-4 w-4 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">Second Brain</div>
          <div className="text-[11px] text-ink-400">Project Tracker</div>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 p-3 px-3 py-[14px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-[11px] rounded-lg px-3 py-[9px] text-[13.5px] font-medium ${
              isActive
                ? 'bg-ink-700/60 text-ink-100'
                : 'text-ink-300 hover:bg-ink-800'
            }`
          }
        >
          <Home className="h-4 w-4" /> Dashboard
        </NavLink>
        <ComingSoon icon={<GitBranch className="h-4 w-4" />} label="Activity" />
        <ComingSoon icon={<Sparkles className="h-4 w-4" />} label="AI Summaries" />
      </nav>

      <div className="px-5 py-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-500">
        Projects
      </div>
      <div className="flex flex-col gap-px overflow-y-auto px-3">
        {projects.map((p) => {
          const theme = statusTheme(p.status);
          return (
            <NavLink
              key={p.slug}
              to={`/project/${p.slug}`}
              className={({ isActive }) =>
                `flex items-center gap-[10px] rounded-md px-3 py-2 text-[13px] ${
                  isActive
                    ? 'bg-ink-700/60 text-ink-100'
                    : 'text-ink-300 hover:bg-ink-800'
                }`
              }
            >
              <span
                className="h-[7px] w-[7px] flex-none rounded-full"
                style={{ background: theme.color }}
              />
              <span className="truncate">{p.name}</span>
              <span className="ml-auto font-mono text-[11px] text-ink-500">
                {p.progress}%
              </span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-ink-700 px-5 py-4 text-[11px] text-ink-500">
        <CircleDot className="h-[13px] w-[13px]" style={{ color: 'oklch(0.72 0.15 150)' }} />{' '}
        Read-only · Static
      </div>
    </aside>
  );
}

function ComingSoon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex cursor-default items-center gap-[11px] rounded-lg px-3 py-[9px] text-[13.5px] font-medium text-ink-500">
      {icon} {label}
      <span className="ml-auto rounded-md bg-ink-700 px-1.5 py-px text-[10px] text-ink-500">
        soon
      </span>
    </div>
  );
}
