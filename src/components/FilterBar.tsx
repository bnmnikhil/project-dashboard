import type { FilterKey } from '../types/project';

export default function FilterBar({
  filters,
  active,
  onChange,
}: {
  filters: FilterKey[];
  active: FilterKey;
  onChange: (f: FilterKey) => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-[7px]">
      {filters.map((f) => {
        const on = f === active;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`rounded-lg border px-[13px] py-1.5 text-[12.5px] font-medium transition-colors ${
              on
                ? 'border-ink-100 bg-ink-100 text-ink-950'
                : 'border-ink-700 bg-ink-800 text-ink-300 hover:border-ink-600'
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
