import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-5 text-center">
      <div
        className="text-6xl font-bold tracking-tight text-transparent"
        style={{
          background:
            'linear-gradient(120deg, oklch(0.68 0.15 265), oklch(0.6 0.16 300))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        404
      </div>
      <div className="mt-1.5 text-[17px] font-semibold">Project not found</div>
      <div className="mt-[7px] max-w-[340px] text-[13.5px] leading-relaxed text-ink-400">
        That project doesn&rsquo;t exist or hasn&rsquo;t been added to your
        tracker yet.
      </div>
      <Link
        to="/"
        className="mt-[22px] inline-flex items-center gap-[7px] rounded-[9px] border px-4 py-[9px] text-[13px] font-medium text-ink-100"
        style={{ background: 'oklch(0.25 0.03 265)', borderColor: 'oklch(0.35 0.04 270)' }}
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
      </Link>
    </div>
  );
}
