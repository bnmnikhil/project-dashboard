import { Calendar } from 'lucide-react';
import { longDate } from '../utils/format';

/**
 * Page header used on the Dashboard. Named TopNavigation to match the
 * component spec; it hosts the title, subtitle and today's date.
 */
export default function TopNavigation({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-[26px] flex items-end justify-between gap-5">
      <div>
        <h1 className="m-0 text-[26px] font-semibold tracking-tight">{title}</h1>
        <p className="mt-1.5 text-sm text-ink-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-[7px] font-mono text-[12.5px] text-ink-500">
        <Calendar className="h-3.5 w-3.5" /> {longDate()}
      </div>
    </div>
  );
}
