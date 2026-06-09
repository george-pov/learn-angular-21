# Lesson 07-02 Concept: Add Placeholder, Loading, and Error Blocks

## Goal

Give the deferred notes panel clear UI for every state: before interaction, while loading, after successful render, and if loading fails.

## The single new concept

`@defer` can have sibling blocks:

```html
@defer (on interaction(openNotes)) {
  <app-topic-notes [topicId]="id()" />
} @placeholder {
  <button #openNotes type="button">Open notes</button>
} @loading {
  <p>Loading notes...</p>
} @error {
  <p>Could not load notes.</p>
}
```

Each block has a distinct job:

- `@placeholder`: shown before the trigger fires.
- `@loading`: shown while Angular loads deferred dependencies.
- `@error`: shown if Angular cannot load or render the deferred block.
- Main `@defer` block: shown after the deferred content is ready.

## Prior knowledge assumed

- Lesson 07-01: `@defer` with `on interaction(openNotes)`.
- Lesson 01-05: Angular template blocks can have sibling branches.

## Why move the button into `@placeholder`?

In Lesson 07-01, the trigger button can sit outside the deferred block while the learner focuses only on the interaction trigger. This lesson improves that model.

The button is not permanent page content. It is the UI shown before the notes panel exists. That makes it a placeholder:

```html
@placeholder {
  <button #openNotes type="button">Open notes</button>
}
```

Once the user interacts and the notes render, Angular replaces the placeholder with the deferred content. The template now reads as a small state machine:

- Before interaction: show the button.
- During loading: show the loading message.
- After success: show the notes.
- After failure: show the error message.

## Loading may be quick

In this learning app, `Loading notes...` may flash too quickly to notice because the deferred component is tiny and local. That does not make the block useless. The point is to learn the shape that matters when deferred content is heavier or split into a separate downloaded chunk.

## Error is not form or HTTP error

The `@error` block belongs to the deferred view. It is not the same as the HTTP error signal from Module 06. It handles failure to load or render the deferred block itself.

## Comparison callout

React Suspense has a fallback for loading lazy content. Angular splits the deferrable-view states into explicit template blocks. Vue async components can define loading and error components; Angular expresses those states inline with `@loading` and `@error`.
