# Lesson 3 Concept: Routing And Feature Pages

## Goal

Turn the current one-screen Angular tracker into a small routed application with:

- A dashboard page at `/`.
- A topic details page at `/topics/:id`.
- Links between pages without a full browser reload.

This lesson introduces Angular Router in the modern standalone application style.

## Current project context

Right now, the app already has router setup in place:

```ts
// src/app/app.config.ts
provideRouter(routes)
```

But the route table is still empty:

```ts
// src/app/app.routes.ts
export const routes: Routes = [];
```

The root `App` component still acts as the whole application screen. It owns the `topics` signal, the computed progress values, the reset behavior, and the main page layout.

That was fine for Lessons 1 and 2. In Lesson 3, the root component should become an application shell, and the tracker should become a route-level page.

## The Angular v21 concept

Angular Router maps URL paths to components.

At a high level:

```ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: 'topics/:id',
    loadComponent: () =>
      import('./topic-details/topic-details-page').then(
        (m) => m.TopicDetailsPage,
      ),
  },
];
```

The route with `path: ''` handles the home page.

The route with `path: 'topics/:id'` handles URLs like:

```txt
/topics/1
/topics/2
/topics/3
```

The `:id` part is a route parameter. It means that this segment of the URL is dynamic.

## RouterOutlet

The root component needs a place where the active route component can render. That place is `RouterOutlet`.

```ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
```

Then the root template can become a shell:

```html
<header>
  <a routerLink="/" routerLinkActive="active-link">Dashboard</a>
</header>

<router-outlet />
```

`<router-outlet />` is the placeholder where Angular renders the component for the current route.

## RouterLink

Use `routerLink` instead of plain `href` for internal app navigation.

```html
<a [routerLink]="['/topics', topic.id]">
  {{ topic.title }}
</a>
```

That tells Angular Router to change the route inside the single-page app.

With a plain `href`, the browser would perform a normal page navigation. With `routerLink`, Angular updates the displayed route component without restarting the app.

## Lazy route components

This lesson uses `loadComponent`.

```ts
{
  path: 'topics/:id',
  loadComponent: () =>
    import('./topic-details/topic-details-page').then(
      (m) => m.TopicDetailsPage,
    ),
}
```

That means Angular does not need to put every route page in the first bundle. It can load the page component when the route is visited.

For a tiny app, the performance difference is not important. The learning value is the pattern: route-level pages can be loaded independently.

## Route parameters as component inputs

Angular Router can bind route parameters to component inputs when `withComponentInputBinding()` is enabled:

```ts
import { provideRouter, withComponentInputBinding } from '@angular/router';

provideRouter(routes, withComponentInputBinding())
```

Then a route like this:

```ts
{
  path: 'topics/:id',
  loadComponent: () =>
    import('./topic-details/topic-details-page').then(
      (m) => m.TopicDetailsPage,
    ),
}
```

Can feed `id` into a component input:

```ts
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-topic-details-page',
  templateUrl: './topic-details-page.html',
})
export class TopicDetailsPage {
  readonly id = input.required<string>();

  protected readonly numericId = computed(() => Number(this.id()));
}
```

Notice that `id` is read as `this.id()` because modern Angular inputs created with `input()` are signal inputs.

## Angular v15 comparison

In Angular v15, you probably saw route components declared in an `NgModule`:

```ts
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'topics/:id', component: TopicDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

That still explains the same router idea, but modern Angular usually puts routing providers in `app.config.ts`:

```ts
provideRouter(routes)
```

And route-level standalone components can be lazy-loaded directly with `loadComponent`.

## React comparison

In React, you might use React Router:

```tsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/topics/:id" element={<TopicDetails />} />
</Routes>
```

Angular's `Routes` array is the same kind of route map. `RouterOutlet` is similar to the place where React Router renders the matched route element.

## Vue comparison

In Vue Router, you might write:

```ts
const routes = [
  { path: '/', component: Dashboard },
  { path: '/topics/:id', component: TopicDetails },
];
```

And the app shell would use:

```vue
<RouterView />
```

Angular's `<router-outlet />` plays the same role as Vue's `<RouterView />`.

## Mental model

Think of the app in three layers:

```txt
App shell
  Owns layout that stays visible across routes.
  Contains <router-outlet />.

Routes
  Map URL paths to route-level components.

Pages
  Components loaded by the router.
  Own page-specific UI and behavior.
```

For this project, Lesson 3 should end with this shape:

```txt
App
  shell header/navigation
  router outlet

DashboardPage
  owns topics signal
  owns completedCount/completedPercent/allTopicsComplete
  owns resetProgress and toggleTopic
  renders TopicsList

TopicsList
  receives topics input
  emits toggle event
  links each topic to its details route

TopicDetailsPage
  reads topic id from the route
  shows detail for one topic
```

## What not to do yet

Do not introduce a state service in this lesson. A shared service will be a later lesson.

For now, it is okay if the topic details page reads from a small shared topic data file while the dashboard keeps local signal state for progress. This keeps Lesson 3 focused on routing instead of global state management.
