# Lesson 03-06 Concept: Lazy-Load a Routed Component

## Goal

Change route records so Angular loads route components only when their route is visited.

## The single new concept

`loadComponent` lazy-loads a standalone component:

```ts
{
  path: 'topics/:id',
  loadComponent: () =>
    import('./topic-details/topic-details').then((m) => m.TopicDetails),
}
```

The route still renders `TopicDetails`. The difference is when the code is loaded.

## Prior knowledge assumed

- Lesson 03-04: multiple routes are configured.
- Lesson 03-05: the details route reads the `id` parameter.
- Lesson 01-01: standalone components can be imported directly.

## Loading mental model

A normal route with `component` imports the component eagerly:

```ts
import { TopicDetails } from './topic-details/topic-details';
{ path: 'topics/:id', component: TopicDetails }
```

A route with `loadComponent` imports it on demand:

```ts
{ path: 'topics/:id', loadComponent: () => import(...).then(...) }
```

Angular can put that route component in a separate JavaScript chunk. The user downloads it when navigation needs it.

## What does not change

The URL does not change. The template does not change. Route input binding still works. The visible behavior should be identical.

This lesson is about loading strategy, not about route behavior.

## Comparison callout

Angular v15 often lazy-loaded feature NgModules with `loadChildren`. Standalone Angular can lazy-load a single routed component with `loadComponent`. React and Vue have similar route-level code splitting patterns with dynamic imports.

## Vocabulary checkpoint

- **Eager route:** a route whose component is imported up front.
- **Lazy route:** a route whose component is imported when needed.
- **Chunk:** a JavaScript file produced by the build for part of the app.
