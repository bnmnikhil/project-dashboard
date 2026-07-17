import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Clock,
  FileCode,
  FileText,
  FolderGit2,
  GitBranch,
  GitCommitHorizontal,
  LayoutDashboard,
  OctagonAlert,
  Rocket,
  Target,
} from 'lucide-react';
import { getProject } from '../utils/projects';
import { statusTheme, PRIORITY_COLOR } from '../utils/status';
import { hoursLabel, relativeTime } from '../utils/format';
import StatusBadge from '../components/StatusBadge';
import MarkdownViewer from '../components/MarkdownViewer';
import NotFound from './NotFound';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  const theme = statusTheme(project.status);
  const blockerCount = project.blockers.length;

  return (
    <div className="animate-fadeup">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 border-b border-ink-700 bg-ink-900/90 backdrop-blur">
        <div className="mx-auto max-w-[1080px] px-10 pb-5 pt-[22px]">
          <Link
            to="/"
            className="mb-3.5 inline-flex items-center gap-1.5 text-[12.5px] text-ink-400 hover:text-ink-100"
          >
            <ArrowLeft className="h-[13px] w-[13px]" /> Dashboard
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="m-0 text-2xl font-semibold tracking-tight">
                  {project.name}
                </h1>
                <StatusBadge status={project.status} />
              </div>
              <p className="m-0 max-w-[640px] text-sm leading-relaxed text-ink-400">
                {project.description}
              </p>
              <div className="mt-[13px] flex flex-wrap gap-[7px]">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-ink-700 px-[9px] py-[3px] font-mono text-[11.5px] text-ink-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-[9px]">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-ink-400">
                  {project.progress}%
                </span>
                <div className="h-[7px] w-[120px] overflow-hidden rounded-[4px] bg-ink-700">
                  <div
                    className="h-full rounded-[4px]"
                    style={{ width: `${project.progress}%`, background: theme.color }}
                  />
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-400">
                <GitBranch className="h-[13px] w-[13px]" />
                {project.currentBranch}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-start gap-8 px-10 pb-[70px] pt-[26px] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col gap-[26px]">
          {/* Overview */}
          <Section icon={<LayoutDashboard className="h-4 w-4 text-ink-300" />} title="Overview">
            <div className="grid grid-cols-1 gap-[11px] sm:grid-cols-2">
              <OverviewCard icon={<Target className="h-[13px] w-[13px]" />} label="Current Goal" value={project.currentGoal} />
              <OverviewCard icon={<CircleDashed className="h-[13px] w-[13px]" style={{ color: 'oklch(0.72 0.15 150)' }} />} label="Current Task" value={project.currentTask} />
              <OverviewCard icon={<ArrowRight className="h-[13px] w-[13px]" />} label="Next Task" value={project.nextTask} />
              <OverviewCard icon={<Clock className="h-[13px] w-[13px]" />} label="Est. Remaining" value={`${hoursLabel(project.estimatedHoursRemaining)} · ${project.priority} priority`} />
            </div>
          </Section>

          {/* Current Context (markdown) */}
          <Section icon={<FileText className="h-4 w-4 text-ink-300" />} title="Current Context">
            <div className="rounded-[13px] border border-ink-700 bg-ink-850 px-[26px] py-[22px]">
              <MarkdownViewer source={project.context} />
            </div>
          </Section>

          {/* Blockers */}
          <Section icon={<OctagonAlert className="h-4 w-4" style={{ color: 'oklch(0.68 0.18 25)' }} />} title="Blockers">
            {blockerCount > 0 ? (
              <div className="flex flex-col gap-[9px]">
                {project.blockers.map((b, i) => (
                  <div
                    key={i}
                    className="flex gap-[11px] rounded-[10px] border p-[13px] px-[15px]"
                    style={{ background: 'oklch(0.21 0.02 25)', borderColor: 'oklch(0.35 0.06 25)' }}
                  >
                    <OctagonAlert className="mt-px h-[15px] w-[15px] flex-none" style={{ color: 'oklch(0.7 0.18 25)' }} />
                    <div className="text-[13.5px] leading-normal" style={{ color: 'oklch(0.86 0.02 25)' }}>
                      {b}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="flex items-center gap-2.5 rounded-[10px] border p-[13px] px-[15px] text-[13.5px]"
                style={{ background: 'oklch(0.2 0.02 150)', borderColor: 'oklch(0.32 0.05 150)', color: 'oklch(0.82 0.05 150)' }}
              >
                <CheckCircle2 className="h-[15px] w-[15px]" /> No active blockers — clear runway.
              </div>
            )}
          </Section>

          {/* Recent Decisions */}
          <Section icon={<GitCommitHorizontal className="h-4 w-4 text-ink-300" />} title="Recent Decisions">
            <div className="flex flex-col gap-0.5">
              {project.recentDecisions.map((d, i) => {
                const last = i === project.recentDecisions.length - 1;
                return (
                  <div key={i} className="flex gap-3 px-1 py-[11px]">
                    <div className="flex flex-col items-center">
                      <span className="mt-[5px] h-2 w-2 rounded-full" style={{ background: 'oklch(0.6 0.13 250)' }} />
                      {!last && <span className="mt-1 w-px flex-1 bg-ink-700" />}
                    </div>
                    <div className="pb-1 text-[13.5px] leading-normal text-ink-100/90">{d}</div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Commits + files */}
          <Section icon={<FolderGit2 className="h-4 w-4 text-ink-300" />} title="Recent Commits & Modified Files">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <Panel title="Recent Commits">
                <div className="flex flex-col gap-[9px]">
                  {project.recentCommits.map((c) => (
                    <div key={c.hash} className="flex items-baseline gap-[9px]">
                      <span className="flex-none font-mono text-[11px]" style={{ color: 'oklch(0.68 0.1 285)' }}>
                        {c.hash}
                      </span>
                      <span className="text-[12.5px] leading-snug text-ink-100/80">{c.message}</span>
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel title="Modified Files">
                <div className="flex flex-col gap-[7px]">
                  {project.modifiedFiles.map((f) => (
                    <div key={f} className="flex items-center gap-2 font-mono text-xs text-ink-300">
                      <FileCode className="h-3 w-3 text-ink-500" /> {f}
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </Section>
        </div>

        {/* Right rail */}
        <aside className="sticky top-[150px] flex flex-col gap-4">
          <div
            className="rounded-[13px] border p-4 px-[17px]"
            style={{
              background: 'linear-gradient(150deg, oklch(0.22 0.03 265), oklch(0.2 0.02 285))',
              borderColor: 'oklch(0.32 0.04 270)',
            }}
          >
            <div className="mb-[11px] flex items-center gap-2">
              <Rocket className="h-[15px] w-[15px]" style={{ color: 'oklch(0.78 0.13 285)' }} />
              <span className="text-xs font-semibold" style={{ color: 'oklch(0.85 0.02 285)' }}>
                Next Session Prompt
              </span>
            </div>
            <div
              className="rounded-[9px] border p-[13px] font-mono text-[11.5px] leading-relaxed"
              style={{ background: 'oklch(0.13 0.004 265)', borderColor: 'oklch(0.28 0.01 270)', color: 'oklch(0.82 0.02 200)' }}
            >
              {project.nextSessionPrompt}
            </div>
          </div>

          <div className="rounded-[13px] border border-ink-700 bg-ink-800 p-4 px-[17px]">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-500">
              Snapshot
            </div>
            <div className="flex flex-col gap-[11px] text-[12.5px]">
              <SnapshotRow label="Priority" value={project.priority} color={PRIORITY_COLOR[project.priority]} />
              <SnapshotRow label="Progress" value={`${project.progress}%`} mono />
              <SnapshotRow label="Est. remaining" value={hoursLabel(project.estimatedHoursRemaining)} mono />
              <SnapshotRow label="Blockers" value={String(blockerCount)} mono color={blockerCount ? 'oklch(0.72 0.16 25)' : undefined} />
              <SnapshotRow label="Branch" value={project.currentBranch} mono />
              <SnapshotRow label="Updated" value={relativeTime(project.lastUpdated)} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3.5 flex items-center gap-2">
        {icon}
        <h2 className="m-0 text-[15px] font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function OverviewCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[11px] border border-ink-700 bg-ink-800 px-[15px] py-3.5">
      <div className="mb-[7px] flex items-center gap-[7px] text-[11.5px] text-ink-400">
        {icon}
        {label}
      </div>
      <div className="text-[13.5px] leading-snug text-ink-100/90">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[11px] border border-ink-700 bg-ink-800 px-4 py-3.5">
      <div className="mb-[11px] text-[11px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        {title}
      </div>
      {children}
    </div>
  );
}

function SnapshotRow({
  label,
  value,
  mono,
  color,
}: {
  label: string;
  value: string;
  mono?: boolean;
  color?: string;
}) {
  return (
    <div className="flex justify-between gap-2.5">
      <span className="text-ink-400">{label}</span>
      <span className={mono ? 'font-mono' : 'font-medium'} style={color ? { color } : undefined}>
        {value}
      </span>
    </div>
  );
}
