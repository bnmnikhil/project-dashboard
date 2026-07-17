# Instructions for AI coding agents

You are working inside one of my software projects. When you finish a work
session, **update this project's status in my dashboard repo** so my
"second brain" always reflects reality. This is a read-only dashboard — it
only reads the two files below. There is no API and no database.

## What to update

Each project has a folder in the dashboard repo at
`src/projects/<slug>/` containing exactly two files:

| File | Purpose |
|------|---------|
| `status.json` | Structured state (progress, tasks, blockers, commits…). |
| `context.md`  | Long-form Markdown: architecture, decisions, roadmap, sprint. |

`<slug>` is the folder name and becomes the URL (`/project/<slug>`).

## Rules for `status.json`

- Conform to `src/projects/status.schema.json` (all fields required).
- `status` must be one of: `In Progress`, `Waiting`, `Blocked`, `Completed`.
- `priority` must be one of: `High`, `Medium`, `Low`.
- `progress` is an integer 0–100.
- **Always set `lastUpdated` to the current time in ISO-8601** (e.g.
  `2026-07-17T14:30:00Z`). The dashboard sorts the timeline and computes
  "updated this week" from this field — stale timestamps break it.
- `nextSessionPrompt` is the most important field: write the exact
  instruction that tells the next session where to start. Be specific.
- Keep `recentCommits` / `modifiedFiles` to the latest handful, newest first.

## Rules for `context.md`

Standard GitHub-flavoured Markdown. Recommended sections (all optional, but
keep them consistent so the detail page reads well):

`Overview` · `Current Context` · `Architecture Notes` · `Recent Decisions` ·
`Blockers` · `Open Questions` · `Roadmap` · `Current Sprint` ·
`Known Issues` · `Useful Commands` · `Next Session Prompt` · `Timeline`

Supported: headings, lists, task lists, tables, code blocks, blockquotes.

## The update loop

1. Edit `src/projects/<slug>/status.json` and `context.md`.
2. Commit and push to the dashboard repo's default branch.
3. Cloudflare Pages / GitHub Pages rebuilds automatically (~1 min).
4. The dashboard now shows the new state. Done.

> If the project doesn't exist yet, create the folder and both files — it
> appears in the dashboard automatically on the next build. No code changes.

### Two common ways agents write here

- **Monorepo:** the dashboard lives beside the projects; the agent edits the
  files directly and pushes.
- **Separate repos:** the agent (or a CI step in the project repo) commits the
  two files into the dashboard repo via a bot token, or opens a PR. Only these
  two files ever change — safe to automate.
