import { Search } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative min-w-[240px] flex-1">
      <Search className="pointer-events-none absolute left-[13px] top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink-500" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects, tasks, goals, tags, decisions…"
        className="w-full rounded-[10px] border border-ink-700 bg-ink-800 py-2.5 pl-[38px] pr-3.5 text-[13.5px] text-ink-100 outline-none focus:border-[oklch(0.55_0.13_250)]"
      />
    </div>
  );
}
