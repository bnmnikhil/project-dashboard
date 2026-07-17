import { useProjects } from '../hooks/useProjects';
import { useProjectFilters } from '../hooks/useProjectFilters';
import TopNavigation from '../components/TopNavigation';
import StatisticsPanel from '../components/StatisticsPanel';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProjectCard from '../components/ProjectCard';
import ResumeWidget from '../components/ResumeWidget';
import Timeline from '../components/Timeline';
import { SearchX } from 'lucide-react';

export default function Dashboard() {
  const { projects, stats } = useProjects();
  const { search, setSearch, filter, setFilter, filters, visible } =
    useProjectFilters(projects);

  // "Resume" = most recent project still in flight (projects are pre-sorted).
  const resume = projects.find((p) => p.status !== 'Completed') ?? projects[0];

  return (
    <div className="mx-auto max-w-[1360px] animate-fadeup px-10 pb-16 pt-[34px]">
      <TopNavigation
        title="Dashboard"
        subtitle="Everything you're building, at a glance."
      />

      <StatisticsPanel stats={stats} />

      <div className="mb-[18px] flex flex-wrap items-center gap-3">
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <FilterBar filters={filters} active={filter} onChange={setFilter} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2.15fr)_minmax(0,1fr)]">
        <div>
          {visible.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4">
              {visible.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <div className="py-[70px] text-center text-ink-500">
              <SearchX className="mx-auto mb-3.5 h-[34px] w-[34px]" />
              <div className="text-[15px] font-medium text-ink-300">
                No projects match your filters
              </div>
              <div className="mt-1.5 text-[13px]">
                Try a different search term or filter.
              </div>
            </div>
          )}
        </div>

        <div className="sticky top-0 flex flex-col gap-4">
          {resume && <ResumeWidget project={resume} />}
          <Timeline projects={projects} />
        </div>
      </div>
    </div>
  );
}
