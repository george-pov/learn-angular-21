# Lesson 03-02 Concept: Move the Tracker Into a Routed Page

## Goal

Move the dashboard UI out of `App` into a new `Dashboard` component, and serve it at `/`. The visible UI is unchanged, but the markup now comes through the router.

## The single new concept

A route entry maps a URL path to a component:

```ts
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Dashboard },
];
```

When the URL matches `path: ''`, the router renders `Dashboard` into `App`'s `<router-outlet />`.

`App` becomes a **shell**: it has no business logic of its own. The dashboard's signals, computed, and methods move to `Dashboard`.

## Prior knowledge assumed

- Lesson 02-04 to 02-06: standalone child components, `input()`, `output()`.
- Lesson 03-01: `<router-outlet />`.

## What stays in `App`

Just `<router-outlet />`. Lesson 03-03 adds a header link above the outlet.

## What moves to `Dashboard`

Everything else from `App`: `currentTitle`, `topics`, `progressLabel`, `toggleTopic`, the template markup, and the `TopicsList` import.

## Why move it now?

The dashboard is one of two pages we will have. Keeping page-level UI in `App` would make it harder to add the topic-details page in Lesson 03-04. Splitting concerns ("App = shell, Dashboard = page") matches how every routed Angular app is structured.
