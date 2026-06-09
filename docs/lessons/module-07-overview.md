# Module 07 Overview: Deferrable Views

## Topic area

Lazy-render parts of a template with `@defer`.

## Prior modules

Modules 01-06.

The learner should already understand standalone components, signal inputs, routes, lazy route components, the topic details route, and the HTTP-backed topic store. This module does not add new data behavior. It focuses on when a piece of UI is loaded and rendered.

## Angular v15, React, and Vue framing

Angular v15 did not have template-level deferrable views. In Angular v15, lazy loading usually meant route-level lazy loading, manual dynamic imports, or hiding content with `*ngIf` after some state changed. Those patterns are still useful, but they are not the same as a deferrable view.

`@defer` gives modern Angular a template-native way to say: this part of the template exists, but Angular can delay loading and rendering it until a trigger happens.

React learners can compare this with `React.lazy` and Suspense, especially when a component is loaded only after interaction. Vue learners can compare it with async components. Angular's distinctive teaching point is that the trigger, loading UI, placeholder UI, and error UI all live in the template beside the deferred content.

## Mental model for the module

There are three different ideas that can look similar:

- Conditional rendering asks whether UI should exist.
- Route lazy loading asks whether a routed page bundle should load.
- Deferrable views ask when a block inside an already rendered template should load and render.

Module 07 uses the topic details page because the page already exists from Module 03. The deferred content is a small notes panel. That keeps the lesson focused on `@defer`, not on data fetching, routing, or a new app feature.

## Micro-lessons

- 07-01 Defer a panel on interaction: `@defer` with an interaction trigger.
- 07-02 Add placeholder, loading, and error blocks: `@placeholder`, `@loading`, and `@error`.

## End-of-module shape

By the end of Module 07, `/topics/:id` still shows the route id immediately. The notes panel appears only after the learner interacts with an `Open notes` placeholder. The template also names the loading and error states for that deferred block.
