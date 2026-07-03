# Domain Docs

How engineering skills should consume this repo's project and learning context
when exploring the codebase.

## Before exploring, read these

- `README.md` at the repo root
- `docs/angular-22-teaching-plan.md`
- The relevant files under `docs/lessons/`
- `.work/adr/` for local decisions that touch the area being changed

If any optional files do not exist, proceed silently. Do not suggest creating
them upfront unless a decision or unresolved term actually needs to be recorded.

## File structure

Single-context learning repo:

```txt
/
├── README.md
├── docs/
│   ├── angular-22-teaching-plan.md
│   ├── agents/
│   └── lessons/
├── .work/
│   └── adr/
└── src/
```

## Use the repo's vocabulary

When your output names an Angular or learning concept in an issue title,
refactor proposal, hypothesis, lesson, test name, or implementation note, use
the terms already established in `README.md`, the teaching plan, and the lesson
files. Do not drift between multiple names for the same concept.

If the concept you need is not named yet, use the closest existing codebase term
and note the gap in the active `.work` record when one exists.

## Flag decision conflicts

If your output contradicts an existing `.work/adr/` decision or the durable
teaching direction in `README.md`, surface it explicitly rather than silently
overriding it.
