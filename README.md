# Project Tracker Dashboard

A read-only **"second brain"** for your software projects. It shows — at a
glance — what each project is, its progress, the current task, the next task,
blockers, recent decisions, when it was last touched, and a **Next Session
Prompt** telling you exactly where to pick up.

No backend. No database. No auth. **Completely static** — every project's data
lives in plain files that are bundled at build time, so it deploys anywhere
static (Cloudflare Pages, GitHub Pages) and rebuilds whenever those files
change.

- **Stack:** React 18 · Vite · TypeScript · TailwindCSS · React Router ·
  lucide-react · react-markdown + remark-gfm
- **Theme:** dark by default, minimal, keyboard-fast — Linear × GitHub × Notion.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Build & preview a production bundle:

```bash
npm run build
npm run preview
```

---

## How the data works

There is **no hardcoded project list**. Every project is a folder:

```
src/projects/
  perqsy/     status.json   context.md
  thingz/     status.json   context.md
  trading/    status.json   context.md
  interview/  status.json   context.md
  status.schema.json        # JSON Schema for status.json
```

At build time, `src/utils/projects.ts` uses Vite's `import.meta.glob` to
discover and inline every `status.json` (structured state) and `context.md`
(long-form Markdown). **To add a project, drop in a new folder with those two
files** — it appears automatically after the next build. Nothing else to wire.

- `status.json` → the cards, stats, badges, timeline, snapshot. Schema:
  `src/projects/status.schema.json`.
- `context.md` → the "Current Context" Markdown on the detail page (GFM:
  headings, tables, task lists, code, quotes).

The route param is the folder name: `/project/perqsy`.

---

## Letting AI agents keep it up to date

This is the intended workflow: **an agent working in each project writes that
project's two files into this repo, then pushes.** Cloudflare/GitHub Pages
rebuilds and the dashboard reflects the new state — no manual step.

See **[`AGENTS.md`](./AGENTS.md)** for the exact instructions to give your
agents (drop that file into each project, or reference it in your agent's
system prompt). In short:

1. Agent finishes a session.
2. Agent updates `src/projects/<slug>/status.json` + `context.md`
   (must set `lastUpdated` to now, ISO-8601; write a precise
   `nextSessionPrompt`).
3. Agent commits & pushes to this repo.
4. Auto-rebuild → dashboard updated.

Monorepo (dashboard beside your projects) → the agent edits files directly.
Separate repos → the agent, or a CI step in the project repo, commits the two
files into this repo with a bot token (or opens a PR). Only those two files
ever change, so it's safe to automate.

---

## Deploy to Cloudflare Pages

**Dashboard (recommended):**

1. Push this repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo, then set:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18 or newer (set env var `NODE_VERSION=20` if needed).
4. **Save and Deploy.** Every push to the production branch rebuilds and
   redeploys automatically.

SPA routing (`/project/:slug` on refresh/deep-link) is handled by
`public/_redirects` (`/* /index.html 200`), which Cloudflare Pages honours out
of the box — no extra config.

**CLI alternative (Wrangler):**

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist --project-name project-dashboard
```

Because `base` defaults to `/`, no path config is needed on Cloudflare Pages
(root domain or `*.pages.dev`).

---

## Deploy to GitHub Pages

GitHub Pages serves from a sub-path (`https://<user>.github.io/<repo>/`), so
build with a matching `base`:

```bash
VITE_BASE=/<repo>/ npm run build
```

Then either:

- **GitHub Actions:** add a workflow that runs the build above and deploys
  `dist` with `actions/deploy-pages`, **or**
- **Manual:** push `dist` to a `gh-pages` branch (e.g. via the `gh-pages`
  package) and set Pages → Source to that branch.

SPA fallback on GitHub Pages: copy `dist/index.html` to `dist/404.html` after
building so deep links resolve:

```bash
cp dist/index.html dist/404.html
```

`basename={import.meta.env.BASE_URL}` in `src/main.tsx` keeps React Router
correct under the sub-path.

---

## Project structure

```
project-dashboard/
├─ public/
│  └─ _redirects              # SPA fallback for Cloudflare Pages
├─ src/
│  ├─ components/             # ProjectCard, ProgressBar, StatusBadge,
│  │                          # SearchBar, StatisticsPanel, Timeline,
│  │                          # MarkdownViewer, Sidebar, TopNavigation, FilterBar,
│  │                          # ResumeWidget
│  ├─ pages/                  # Dashboard, ProjectDetails, NotFound
│  ├─ hooks/                  # useProjects, useProjectFilters
│  ├─ utils/                  # projects (glob loader), status theme, format
│  ├─ types/                  # project.ts — the data contract
│  ├─ projects/               # ← your data lives here (status.json + context.md)
│  ├─ App.tsx                 # routes
│  ├─ main.tsx                # entry + router
│  └─ index.css               # Tailwind + Markdown styles
├─ AGENTS.md                  # instructions for AI agents
├─ tailwind.config.js
├─ vite.config.ts
└─ package.json
```

---

## Architecture notes — built to extend

The data layer is deliberately isolated behind `useProjects()` /
`loadProjects()` so future features slot in without touching the UI:

- **Git integration** — swap the glob loader for a git-log reader; commits &
  `modifiedFiles` already model it.
- **AI summaries** — add a `summary` field to the schema and a card section.
- **Weekly reports** — `updatedThisWeek` + timeline data are already computed.
- **Activity heatmaps** — feed `lastUpdated` history into a heatmap component.
- **Project dependencies** — add a `dependsOn: string[]` field and a graph view.
- **Cross-project search** — `useProjectFilters` already searches all fields.
- **Notifications** — derive from status transitions between builds.

The sidebar shows "Activity" and "AI Summaries" as `soon` placeholders to mark
these extension points. None are implemented yet — the architecture just keeps
them cheap to add.
