import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ProjectStatus } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const styles = {
    'In Progress': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Waiting': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'Blocked': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Completed': 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[status])}>
      {status}
    </span>
  );
};

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-border rounded-full h-1.5 mt-2">
    <div 
      className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
      style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }} 
    />
  </div>
);

export const Card = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-surface border border-border rounded-xl p-5 shadow-sm",
      onClick && "cursor-pointer hover:border-slate-600 transition-colors duration-200",
      className
    )}
  >
    {children}
  </div>
);

export const MarkdownViewer = ({ content }: { content: string }) => (
  <div className="prose prose-invert prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-400">
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
);