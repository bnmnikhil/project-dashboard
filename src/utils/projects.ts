import type {
  Project,
  ProjectStatusFile,
} from '../types/project';

/**
 * Dynamically load every project at build time.
 *
 * `import.meta.glob` is Vite's static-glob API: it discovers all matching
 * files under src/projects and inlines them into the bundle. Nothing is
 * hardcoded here — drop a new folder with status.json + context.md and it
 * appears automatically after the next build.
 *
 * This is what makes the "agents update files -> Cloudflare rebuilds ->
 * dashboard reflects it" loop work with zero backend.
 */
const statusModules = import.meta.glob<ProjectStatusFile>(
  '../projects/*/status.json',
  { eager: true, import: 'default' },
);

const contextModules = import.meta.glob<string>(
  '../projects/*/context.md',
  { eager: true, query: '?raw', import: 'default' },
);

/** Extract the folder name ("slug") from a glob path. */
function slugFromPath(path: string): string {
  const match = path.match(/\/projects\/([^/]+)\//);
  return match ? match[1] : path;
}

function buildContextMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [path, md] of Object.entries(contextModules)) {
    map[slugFromPath(path)] = md;
  }
  return map;
}

let cache: Project[] | null = null;

/** All projects, sorted by most-recently-updated first. */
export function loadProjects(): Project[] {
  if (cache) return cache;

  const contextMap = buildContextMap();

  cache = Object.entries(statusModules)
    .map(([path, status]) => {
      const slug = slugFromPath(path);
      return { slug, context: contextMap[slug] ?? '', ...status };
    })
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
    );

  return cache;
}

/** Look up a single project by its slug (route param). */
export function getProject(slug: string): Project | undefined {
  return loadProjects().find((p) => p.slug === slug);
}
