# Module 03: Routing

## Topic

Turn the single-page tracker into a small routed app: a dashboard at `/`, a topic-details page at `/topics/:id`, lazy-loaded routes, and route params bound as signal inputs.

## Prior modules required

Modules 01–02.

## Angular v15 comparison

In Angular v15 you typically had:

- An `AppRoutingModule` that called `RouterModule.forRoot(routes)`.
- Route components declared in feature modules.
- Lazy loading via `loadChildren: () => import('...').then(m => m.FeatureModule)`.
- Route parameters read via `ActivatedRoute.params` (an `Observable<Params>`) and `paramMap`.

In Angular v22 the same pieces live in `app.config.ts` as `provideRouter(routes)`. Routes point to standalone components. `loadComponent` lazy-loads a single component without a wrapper module. Route parameters can be bound directly into a component's signal `input()` via `withComponentInputBinding()` — no `ActivatedRoute` subscription needed for the common case.

## React comparison

`Routes` array maps to React Router's `<Route>` elements. `RouterOutlet` is React Router's `<Outlet />`. `RouterLink` is `<Link to=...>`. Route params via `withComponentInputBinding()` is the Angular equivalent of React's `useParams()` — except the value is a signal you can pass into `computed()`.

## Vue comparison

`Routes` is Vue Router's `routes` array. `<router-outlet />` is `<RouterView />`. `routerLink` is `<router-link>`. Vue 3's `useRoute().params` is similar to component input binding, but Angular's signal-input version composes natively into the rest of the reactive graph.

## Micro-lessons in this module

1. [03-01 Add an empty router outlet](./lesson-03-01-concept.md)
2. [03-02 Move the tracker into a routed page](./lesson-03-02-concept.md)
3. [03-03 Navigate with `RouterLink`](./lesson-03-03-concept.md)
4. [03-04 Add a second route](./lesson-03-04-concept.md)
5. [03-05 Read a route param via signal input](./lesson-03-05-concept.md)
6. [03-06 Lazy-load a routed component](./lesson-03-06-concept.md)

End-of-module state: `App` is a shell with a header and `<router-outlet />`. `/` shows the dashboard. `/topics/:id` shows a details page bound to the route id. Both route components are lazy-loaded.
