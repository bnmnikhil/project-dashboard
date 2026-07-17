import type { ProjectStatus } from '../types/project';
import { statusTheme } from '../utils/status';

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { color, bg } = statusTheme(status);
  return (
    <span
      className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full px-[9px] py-1 text-[11px] font-semibold"
      style={{ background: bg, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}
