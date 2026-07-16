export type ProjectStatus = 'In Progress' | 'Waiting' | 'Blocked' | 'Completed';
export type ProjectPriority = 'High' | 'Medium' | 'Low';

export interface StatusData {
  projectName: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  currentGoal: string;
  currentTask: string;
  nextTask: string;
  estimatedHoursRemaining: number;
  currentBranch: string;
  lastUpdated: string;
  blockers: string[];
  recentDecisions: string[];
  modifiedFiles: string[];
  recentCommits: string[];
  tags: string[];
  nextSessionPrompt: string;
}

export interface Project {
  id: string; // derived from folder name
  statusData: StatusData;
  contextMd: string;
}