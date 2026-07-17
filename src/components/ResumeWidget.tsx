import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import type { Project } from '../types/project';
import { relativeTime } from '../utils/format';

/**
 * Surfaces the Next Session Prompt of the project you should pick up next
 * (most-recently-updated project that isn't Completed). This is the
 * "where do I start?" answer the dashboard exists to give.
 */
export default function ResumeWidget({ project }: { project: Project }) {
  return (
    <div
      className="rounded-2xl border p-[17px]"
      style={{
        background:
          'linear-gradient(150deg, oklch(0.22 0.03 265), oklch(0.2 0.02 285))',
        borderColor: 'oklch(0.32 0.04 270)',
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Rocket className="h-[15px] w-[15px]" style={{ color: 'oklch(0.78 0.13 285)' }} />
        <span className="text-xs font-semibold tracking-wide" style={{ color: 'oklch(0.85 0.02 285)' }}>
          Resume Where You Left Off
        </span>
      </div>
      <div className="mb-0.5 text-[13.5px] font-semibold">{project.name}</div>
      <div className="mb-[11px] text-[11.5px] text-ink-400">
        Updated {relativeTime(project.lastUpdated)}
      </div>
      <div
        className="rounded-[9px] border p-[13px] font-mono text-xs leading-relaxed"
        style={{
          background: 'oklch(0.13 0.004 265)',
          borderColor: 'oklch(0.28 0.01 270)',
          color: 'oklch(0.82 0.02 200)',
        }}
      >
        {project.nextSessionPrompt}
      </div>
      <Link
        to={`/project/${project.slug}`}
        className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium"
        style={{ color: 'oklch(0.78 0.13 285)' }}
      >
        Open project <ArrowRight className="h-[13px] w-[13px]" />
      </Link>
    </div>
  );
}
