import type { Project, StatusData } from '../types';

// Vite specific: Eagerly load all JSON and Markdown files in the projects directory
const statusFiles = import.meta.glob('../projects/*/status.json', { eager: true });
const contextFiles = import.meta.glob('../projects/*/context.md', { query: '?raw', import: 'default', eager: true });

export const getAllProjects = (): Project[] => {
  const projects: Project[] = [];

  for (const path in statusFiles) {
    // Extract the folder name, e.g., "../projects/perqsy/status.json" -> "perqsy"
    const id = path.split('/')[2];
    const statusData = (statusFiles[path] as any).default as StatusData;
    
    const contextPath = `../projects/${id}/context.md`;
    const contextMd = (contextFiles[contextPath] as string) || '# No context provided.';

    projects.push({
      id,
      statusData,
      contextMd
    });
  }

  // Sort by lastUpdated descending
  return projects.sort((a, b) => {
    return new Date(b.statusData.lastUpdated).getTime() - new Date(a.statusData.lastUpdated).getTime();
  });
};

export const getProjectById = (id: string): Project | undefined => {
  return getAllProjects().find(p => p.id === id);
};