import {
  CheckCircle2,
  Clock,
  Folders,
  Gauge,
  Hourglass,
  OctagonAlert,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { DashboardStats } from '../types/project';

interface Stat {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

export default function StatisticsPanel({ stats }: { stats: DashboardStats }) {
  const items: Stat[] = [
    { label: 'Projects', value: stats.total, icon: Folders, color: 'oklch(0.72 0.006 265)' },
    { label: 'Active', value: stats.active, icon: Zap, color: 'oklch(0.75 0.16 150)' },
    { label: 'Blocked', value: stats.blocked, icon: OctagonAlert, color: 'oklch(0.68 0.19 25)' },
    { label: 'Waiting', value: stats.waiting, icon: Hourglass, color: 'oklch(0.82 0.14 85)' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'oklch(0.72 0.13 250)' },
    { label: 'Avg Progress', value: `${stats.averageProgress}%`, icon: Gauge, color: 'oklch(0.7 0.12 285)' },
    { label: 'Hours Left', value: `${stats.hoursRemaining}h`, icon: Clock, color: 'oklch(0.72 0.006 265)' },
    { label: 'Updated / wk', value: stats.updatedThisWeek, icon: TrendingUp, color: 'oklch(0.7 0.12 285)' },
  ];

  return (
    <div className="mb-[26px] grid grid-cols-[repeat(auto-fit,minmax(148px,1fr))] gap-3">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-xl border border-ink-700 bg-ink-800 px-4 py-[15px]"
        >
          <div className="mb-[9px] flex items-center gap-[7px]" style={{ color }}>
            <Icon className="h-[15px] w-[15px]" />
            <span className="text-[11.5px] font-medium text-ink-400">{label}</span>
          </div>
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
        </div>
      ))}
    </div>
  );
}
