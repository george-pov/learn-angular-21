# Lesson 03-06 Task: Lazy-Load a Routed Component

## Feature to build

Switch the dashboard and topic details routes from eager `component` references to lazy `loadComponent` functions.

## Files to edit

- `src/app/app.routes.ts`

## Steps

1. Remove the static imports for `Dashboard` and `TopicDetails` from `app.routes.ts`.

2. Replace the route records with `loadComponent`:

   ```ts
   import { Routes } from '@angular/router';

   export const routes: Routes = [
     {
       path: '',
       loadComponent: () =>
         import('./dashboard/dashboard').then((m) => m.Dashboard),
     },
     {
       path: 'topics/:id',
       loadComponent: () =>
         import('./topic-details/topic-details').then(
           (m) => m.TopicDetails,
         ),
     },
     { path: '**', redirectTo: '' },
   ];
   ```

3. Do not change `app.config.ts`.

4. Do not change `Dashboard`, `TopicDetails`, or `TopicsList`.

## Prediction

Before running the app, predict whether any visible behavior changes. Where would you look to see lazy-loaded chunks?

## Verify

- Visiting `/` still renders the dashboard.
- Clicking a topic still navigates to the details page.
- The route id still renders on the details page.
- Unknown URLs still redirect to `/`.
- In browser DevTools, route chunks load when their route is visited.

## Reflection

- Why can `loadComponent` work without an NgModule wrapper?
- Why is the visible behavior unchanged?
- When might route-level lazy loading be useful in a larger app?
