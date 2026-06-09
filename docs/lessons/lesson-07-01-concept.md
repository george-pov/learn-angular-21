# Lesson 07-01 Concept: Defer a Panel on Interaction

## Goal

Add a notes panel to the topic details page, but render it only after the learner clicks `Open notes`.

## The single new concept

`@defer` delays a block of template until a trigger fires:

```html
<button #openNotes type="button">Open notes</button>

@defer (on interaction(openNotes)) {
  <app-topic-notes [topicId]="id()" />
}
```

Two pieces matter:

- `@defer { ... }` marks the delayed template block.
- `on interaction(openNotes)` tells Angular to render it after the referenced button is interacted with.

The notes component is still an ordinary standalone Angular component. The new idea is not how to build the panel. The new idea is when Angular creates it.

## Prior knowledge assumed

- Lesson 03-05: `TopicDetails` receives `id` through a signal input.
- Lesson 03-06: route components can be lazy-loaded with `loadComponent`.
- Lesson 06-06: the app already has its HTTP-backed dashboard flow.

## Deferring is not hiding

`@if` decides whether a block should exist based on state you control:

```html
@if (store.loadError(); as message) {
  <p>{{ message }}</p>
}
```

`@defer` decides when Angular should load and render a block based on a trigger:

```html
@defer (on interaction(openNotes)) {
  <app-topic-notes [topicId]="id()" />
}
```

The deferred block is part of the template, but Angular can postpone the work. This is useful for content that is helpful but not needed for the first view of the page.

## Why use interaction here?

The topic details page should show the route id immediately. Notes are secondary. An interaction trigger matches that priority:

- First render: show the page heading and route-param explanation.
- User asks for more: render the notes panel.

That keeps the example small and avoids teaching viewport, idle, timer, or custom triggers too early.

## Standalone dependency rule

The component inside a deferred block should be standalone and should not be referenced outside the deferred block in the same template file. `TopicNotes` is a good fit because it is small, standalone, and used only by `TopicDetails`.

## Comparison callout

React learners can compare this to rendering a lazy component after a button interaction. Vue learners can compare it to an async component. Angular's distinctive piece is that the trigger is written directly in the template with the deferred block.
