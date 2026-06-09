# AGENTS.md

Root instructions for AI agents working in this Angular learning project.

## Purpose

This file is the root navigation and operating policy for agents. It points to
durable learner-facing documentation and to local-only workflow records.

This repository is not a production application. Treat it as a guided learning
workspace for exploring modern Angular, currently targeting Angular 21. Optimize
changes for small runnable examples, clear teaching value, and accurate mental
models.

Use this hierarchy:

1. `AGENTS.md`: root agent policy, document map, and task routing.
2. `README.md`: durable learner-facing project context, teaching style, lesson
   format, and project commands.
3. `docs/angular-21-teaching-plan.md`: durable lesson roadmap.
4. `docs/lessons/`: durable concept and task pages for numbered lessons.
5. `docs/agents/`: durable skill integration notes for local issue tracking and
   domain documentation.
6. `.work/`: local-only agent workflow support for plans, tasks, ADRs,
   validation notes, reviews, and transient artifacts.

## Read Order

Before code changes:

1. Read `README.md`.
2. Read the relevant lesson files under `docs/lessons/` when the work touches a
   lesson or exercise.
3. Inspect the relevant source files and project files.
4. Read the required `.work/agents/*` workflow files for the task.
5. Check the current worktree with `git status --short`.

For narrow documentation-only edits, read only the files being changed plus this
root file and any referenced workflow file.

## Task Routing

Use this routing table to avoid re-reading every local workflow file for every
task:

- Feature or lesson planning: `.work/agents/process.md` and
  `.work/agents/feature-records.md`.
- Angular implementation: `.work/agents/process.md`,
  `.work/agents/coding-standards.md`, `.work/agents/testing.md`, and
  `.work/agents/validation.md`.
- Lesson documentation: `README.md`, `docs/angular-21-teaching-plan.md`,
  `.work/agents/process.md`, and `.work/agents/validation.md`.
- Domain or vocabulary-sensitive changes: `README.md` and
  `.work/agents/domain.md`.
- Reviews: `.work/agents/review.md`.
- Commits or PRs: `.work/agents/commits-and-prs.md`.
- Local generated files: `.work/agents/local-artifacts.md`.


## Repository Boundaries

Keep repository facts in the right place:

- Durable learner-facing project truth belongs in `README.md` or tracked
  `docs/`.
- Lesson concepts and exercises belong in `docs/lessons/`.
- Agent workflow belongs in `.work/`.
- Feature plans, task lists, validation notes, review notes, and ADRs belong in
  `.work/`.
- Generated diagnostics, screenshots, build output, and temporary analysis
  outputs belong in `dist/`, `.angular/`, or another ignored local output
  location appropriate to the tool.

Do not reference `.work/` from durable learner documentation under `docs/`.
Do not present this project as a production app unless the user explicitly
changes its purpose.

## Core Agent Rules

- Preserve user changes. Do not revert unrelated modified files.
- Prefer small vertical slices that keep the app runnable and teach one concept
  at a time.
- Do not perform broad rewrites unless the user explicitly asks for them.
- Prefer examples that fit the current Angular 21 workspace and installed
  dependencies.
- When version-specific Angular behavior matters, verify it against installed
  package versions or official Angular documentation.
- Explain notable Angular patterns briefly when making code changes, especially
  when they differ from Angular 15, React, or Vue.
- Keep lessons consistent with the `README.md` lesson format.
- Do not add backend, persistence, authentication, deployment, or production
  architecture unless the user asks for that learning topic.

## Communication And Tone

- No em dashes.
- Use direct, concise, peer-level language.
- Use headings and lists when they make the answer easier to scan.
- Flag assumptions and uncertainties.
- Provide concrete next steps and validation results.
- Use only standard ASCII characters when editing repository files unless an
  existing file requires otherwise.

## Reasoning Framework

Use Goal-Driven Problem Solving:

1. State assessment: current state, constraints, target state, and gap.
2. Action decomposition: ordered actions, preconditions, expected effects, and
   risk.
3. Path planning: lowest-cost path that satisfies the target and preserves
   rollback options.
4. Adaptive execution: replan when preconditions fail and keep user changes
   intact.
5. Reflection loop: record validation, accepted risk, reusable decisions, and
   follow-up work in the appropriate `.work/` record when one exists.

## File Operations

Use fast read-only tools for repo-wide discovery, search, and inspection. Keep
PowerShell as the orchestration shell for path-safe Windows operations.

- Search file contents with `rg`; prefer `rg -n "pattern" path`.
- List files with `rg --files`; use `git ls-files` when only tracked files
  should be considered.
- Avoid `Get-ChildItem -Recurse` for repo-wide discovery unless ignored,
  generated, or untracked files are required.
- Use PowerShell-native cmdlets for mutating filesystem operations so paths,
  quoting, and errors stay explicit.
- Be explicit when command names collide with PowerShell aliases or Windows
  tools. Use `where.exe` when the executable is intended.

## Validation

After code changes, run the smallest validation that covers the changed surface.
Use `.work/agents/validation.md` for the validation decision tree.

Record skipped validation with the reason, risk, and recovery path.
