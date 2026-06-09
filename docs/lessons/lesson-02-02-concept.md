# Lesson 02-02 Concept: Render a List With `@for` and `track`

## Goal

Replace the manual counter with a real list of three topics rendered with `@for`. The progress label now derives from the array.

## The single new concept

`@for` is the template block for rendering arrays:

```html
@for (topic of topics(); track topic.id) {
  <li>{{ topic.title }}</li>
}
```

Two new pieces:

- `topic of topics()` — the iteration. `topics()` is the signal call returning the array.
- `track topic.id` — **required**. Tells Angular how to identify each row across updates.

Why `track` is required: when the array changes (a topic toggled, a topic added), Angular needs to know which DOM nodes correspond to which items. Without `track`, every update would tear down and rebuild every row. With `track topic.id`, Angular keeps the row whose id stayed the same.

## Prior knowledge assumed

- Lesson 01-02 to 01-06: signals, computed, template control flow.
- Lesson 02-01: the `Topic` type.

## Comparison callout

`track` is the Angular equivalent of React's `key` prop:

```jsx
{topics.map(topic => <li key={topic.id}>{topic.title}</li>)}
```

Both serve the same job: a stable identity for each row so the framework can do minimal DOM work. In Angular v15 you would have written `*ngFor="let topic of topics; trackBy: trackById"` and added a method on the class. The `track` expression in v21 replaces the indirection.

## Why remove the button?

The "Mark one complete" button from Lesson 01-03 no longer makes sense — there are real topics now, and Lesson 02-03 introduces per-topic toggling. Removing the button here is part of the layered cleanup.
