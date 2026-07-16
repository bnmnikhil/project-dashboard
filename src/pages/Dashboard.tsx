import  { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects } from '../utils/dataLoader';
import { Card, StatusBadge, ProgressBar, cn } from '../components/UI';
import { Search, Clock, AlertCircle, PlayCircle, Terminal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const navigate = useNavigate();
  const projects = getAllProjects();

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesFilter = filter === 'All' || p.statusData.status === filter;
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        p.statusData.projectName.toLowerCase().includes(searchLower) ||
        p.statusData.currentTask.toLowerCase().includes(searchLower) ||
        p.statusData.tags.some(t => t.toLowerCase().includes(searchLower));
      return matchesFilter && matchesSearch;
    });
  }, [projects, search, filter]);

  // Stats
  const activeCount = projects.filter(p => p.statusData.status === 'In Progress').length;
  const blockedCount = projects.filter(p => p.statusData.status === 'Blocked').length;
  const avgProgress = Math.round(projects.reduce((acc, p) => acc + p.statusData.progress, 0) / (projects.length || 1));

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header & Stats */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-6">Command Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><PlayCircle size={24} /></div>
            <div><p className="text-sm text-slate-400">Active Projects</p><p className="text-2xl font-semibold">{activeCount}</p></div>
          </Card>
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/10 rounded-lg text-red-400"><AlertCircle size={24} /></div>
            <div><p className="text-sm text-slate-400">Blocked</p><p className="text-2xl font-semibold">{blockedCount}</p></div>
          </Card>
          <Card className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><Clock size={24} /></div>
            <div><p className="text-sm text-slate-400">Avg Progress</p><p className="text-2xl font-semibold">{avgProgress}%</p></div>
          </Card>
        </div>
      </div>

      {/* Resume Widget */}
      {projects[0] && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <div className="flex items-start space-x-3">
            <Terminal className="text-blue-400 mt-1" size={20} />
            <div>
              <h3 className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-1">Next Session Focus</h3>
              <p className="text-lg">
                <span className="font-semibold text-white">{projects[0].statusData.projectName}:</span> {projects[0].statusData.nextSessionPrompt}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search projects, tasks, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'In Progress', 'Waiting', 'Blocked', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-colors border", filter === f ? "bg-slate-800 text-white border-slate-700" : "bg-transparent text-slate-400 border-transparent hover:bg-surfaceHover")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Card key={project.id} onClick={() => navigate(`/project/${project.id}`)} className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{project.statusData.projectName}</h3>
                <StatusBadge status={project.statusData.status} />
              </div>
              <span className="text-xs text-slate-500">{formatDistanceToNow(new Date(project.statusData.lastUpdated))} ago</span>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Task</p>
                <p className="text-sm font-medium">{project.statusData.currentTask}</p>
              </div>
              {project.statusData.blockers.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-md p-2">
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                    <AlertCircle size={12} /> {project.statusData.blockers.length} Blocker(s)
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progress</span>
                <span>{project.statusData.progress}%</span>
              </div>
              <ProgressBar progress={project.statusData.progress} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}