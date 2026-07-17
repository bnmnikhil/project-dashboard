export default function ProgressBar({
  value,
  color,
  className = '',
}: {
  value: number;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`h-1.5 flex-1 overflow-hidden rounded-[4px] bg-ink-700 ${className}`}
    >
      <div
        className="h-full rounded-[4px]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  );
}
