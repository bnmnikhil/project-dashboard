//import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../utils/dataLoader';
import { Card, StatusBadge, ProgressBar, MarkdownViewer } from '../components/UI';
import { ArrowLeft, GitBranch, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center mt-20">
        <h2 className="text-2xl font-bold text-white mb-2">Project not found</h2>
        <button onClick={() => navigate('/')} className="text-blue-400 hover:underline">Return to Dashboard</button>
      </div>
    );
  }

  const { statusData, contextMd } = project;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <button onClick={() => navigate('/')} className="flex items-center text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{statusData.projectName}</h1>
          <p className="text-slate-400 text-lg">{statusData.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={statusData.status} />
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-slate-800 border-slate-700 text-slate-300">
            {statusData.priority} Priority
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Status Data */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="font-semibold text-white mb-4">Sprint Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white">{statusData.progress}%</span>
                </div>
                <ProgressBar progress={statusData.progress} />
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-xs text-slate-500 uppercase">Current Goal</span>
                <p className="text-sm font-medium mt-1">{statusData.currentGoal}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-xs text-slate-500 uppercase">Next Task</span>
                <p className="text-sm mt-1">{statusData.nextTask}</p>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock size={16} className="text-slate-500" />
              <span>{statusData.estimatedHoursRemaining}h remaining</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <GitBranch size={16} className="text-slate-500" />
              <span className="font-mono text-xs bg-slate-800 px-2 py-0.5 rounded">{statusData.currentBranch}</span>
            </div>
            <div className="text-xs text-slate-500 pt-2 border-t border-border">
              Last updated: {format(new Date(statusData.lastUpdated), 'MMM d, yyyy h:mm a')}
            </div>
          </Card>

          {statusData.blockers.length > 0 && (
            <Card className="border-red-500/20 bg-red-500/5">
              <h3 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle size={18} /> Active Blockers
              </h3>
              <ul className="space-y-2">
                {statusData.blockers.map((blocker, i) => (
                  <li key={i} className="text-sm text-red-200 flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    {blocker}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Right Column: Markdown Context */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Project Context & Architecture</h2>
            <MarkdownViewer content={contextMd} />
          </Card>

          {statusData.recentDecisions.length > 0 && (
            <Card>
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-400" /> Recent Decisions
              </h3>
              <ul className="space-y-3">
                {statusData.recentDecisions.map((decision, i) => (
                  <li key={i} className="text-sm text-slate-300 pl-4 border-l-2 border-slate-700">{decision}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}