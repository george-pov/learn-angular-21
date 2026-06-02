# Lesson 3 Task: Add Routing And A Topic Details Page

## Feature to build

Add routing to the learning tracker:

- The dashboard should live at `/`.
- Each topic title should link to `/topics/:id`.
- A topic details page should show the selected topic.
- The root `App` component should become a shell with navigation and `<router-outlet />`.

## Files to create

- [ ] `src/app/topics.ts`
- [ ] `src/app/dashboard/dashboard-page.ts`
- [ ] `src/app/dashboard/dashboard-page.html`
- [ ] `src/app/dashboard/dashboard-page.scss`
- [ ] `src/app/topic-details/topic-details-page.ts`
- [ ] `src/app/topic-details/topic-details-page.html`
- [ ] `src/app/topic-details/topic-details-page.scss`

## Files to edit

- [ ] `src/app/app.ts`
- [ ] `src/app/app.html`
- [ ] `src/app/app.scss`
- [ ] `src/app/app.config.ts`
- [ ] `src/app/app.routes.ts`
- [ ] `src/app/topics-list/topics-list.ts`
- [ ] `src/app/topics-list/topics-list.html`
- [ ] `src/app/topics-list/topics-list.scss`

## Step 1: Extract the starter topics

- [X] Create `src/app/topics.ts`.
- [X] Move the starter topic array out of `App` and into this file.
- [X] Export it as `INITIAL_TOPICS`.
- [X] Keep the existing `Topic` type in `src/app/topic.ts`.

Suggested shape:

```ts
import { Topic } from './topic';

export const INITIAL_TOPICS: Topic[] = [
  {
    id: 1,
    title: 'Standalone components',
    description: 'Build components without NgModules as the default app structure.',
    done: true,
  },
  // Keep the rest of the current topics here.
];
```

Why: the dashboard and details page both need topic data, but this lesson should not introduce a service yet.

## Step 2: Create `DashboardPage`

- [ ] Create `src/app/dashboard/dashboard-page.ts`.
- [ ] Move the tracker state and behavior from `App` into `DashboardPage`.
- [ ] Import `INITIAL_TOPICS`.
- [ ] Create the `topics` signal from `INITIAL_TOPICS`.
- [ ] Keep `completedCount`, `completedPercent`, `allTopicsComplete`, `resetProgress`, and `toggleTopic`.
- [ ] Import `TopicsList` in the `DashboardPage` component.

Suggested class outline:

```ts
import { Component, computed, signal } from '@angular/core';
import { Topic } from '../topic';
import { TopicsList } from '../topics-list/topics-list';
import { INITIAL_TOPICS } from '../topics';

@Component({
  selector: 'app-dashboard-page',
  imports: [TopicsList],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly topics = signal<Topic[]>(
    INITIAL_TOPICS.map((topic) => ({ ...topic })),
  );

  // Move the computed values and methods from App here.
}
```

The `.map((topic) => ({ ...topic }))` creates a fresh copy for local dashboard state.

## Step 3: Move the dashboard template

- [ ] Create `src/app/dashboard/dashboard-page.html`.
- [ ] Move the current tracker page markup from `app.html` into `dashboard-page.html`.
- [ ] Keep the `<app-topics-list>` usage inside the dashboard page.
- [ ] Change the intro label from `Lesson 1` to `Lesson 3`.
- [ ] Update the intro copy so it mentions routing.

Suggested `<app-topics-list>` usage:

```html
<app-topics-list
  [topics]="topics()"
  (toggle)="toggleTopic($event)"
/>
```

## Step 4: Move dashboard styles

- [ ] Create `src/app/dashboard/dashboard-page.scss`.
- [ ] Move shell/page styles from `app.scss` into `dashboard-page.scss`.
- [ ] Keep only app-shell navigation styles in `app.scss`.

If `.topic-list` and `.topic-item` styles are still in `app.scss`, move them to `topics-list.scss`. The list markup now belongs to `TopicsList`, and Angular component styles are scoped.

## Step 5: Turn `App` into a router shell

- [ ] Remove tracker state from `App`.
- [ ] Import `RouterLink`, `RouterLinkActive`, and `RouterOutlet`.
- [ ] Add them to the `imports` array.

Suggested `App` shape:

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

- [ ] Replace `app.html` with shell navigation and a router outlet.

Suggested template:

```html
<header class="app-header">
  <a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{ exact: true }">
    Dashboard
  </a>
</header>

<router-outlet />
```

## Step 6: Configure routes

- [ ] Edit `src/app/app.routes.ts`.
- [ ] Add a dashboard route for `/`.
- [ ] Add a topic details route for `/topics/:id`.
- [ ] Add a fallback redirect.
- [ ] Use `loadComponent` for both route-level pages.

Suggested route table:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard-page').then((m) => m.DashboardPage),
    title: 'Angular 21 Learning Tracker',
  },
  {
    path: 'topics/:id',
    loadComponent: () =>
      import('./topic-details/topic-details-page').then(
        (m) => m.TopicDetailsPage,
      ),
    title: 'Topic details',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
```

## Step 7: Enable route params as inputs

- [ ] Edit `src/app/app.config.ts`.
- [ ] Import `withComponentInputBinding`.
- [ ] Pass it to `provideRouter`.

Suggested shape:

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
```

Why: this lets the `:id` route parameter become an `id` input on `TopicDetailsPage`.

## Step 8: Create `TopicDetailsPage`

- [ ] Create `src/app/topic-details/topic-details-page.ts`.
- [ ] Read the route `id` with `input.required<string>()`.
- [ ] Convert the id to a number inside a `computed`.
- [ ] Find the matching topic from `INITIAL_TOPICS`.
- [ ] Import `RouterLink` so the page can link back to the dashboard.

Suggested class outline:

```ts
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INITIAL_TOPICS } from '../topics';

@Component({
  selector: 'app-topic-details-page',
  imports: [RouterLink],
  templateUrl: './topic-details-page.html',
  styleUrl: './topic-details-page.scss',
})
export class TopicDetailsPage {
  readonly id = input.required<string>();

  protected readonly topicId = computed(() => Number(this.id()));

  protected readonly topic = computed(() =>
    INITIAL_TOPICS.find((topic) => topic.id === this.topicId()),
  );
}
```

## Step 9: Add the topic details template

- [ ] Create `src/app/topic-details/topic-details-page.html`.
- [ ] Show the topic title and description when found.
- [ ] Show a friendly fallback if the topic id is unknown.
- [ ] Add a link back to `/`.

Suggested template:

```html
<main class="details-page">
  <a routerLink="/">Back to dashboard</a>

  @if (topic(); as topic) {
    <h1>{{ topic.title }}</h1>
    <p>{{ topic.description }}</p>
    <p>Topic id: {{ topic.id }}</p>
  } @else {
    <h1>Topic not found</h1>
    <p>No topic exists for id {{ id() }}.</p>
  }
</main>
```

## Step 10: Link topics to details

- [ ] Edit `src/app/topics-list/topics-list.ts`.
- [ ] Import `RouterLink`.
- [ ] Add `RouterLink` to the component `imports`.

Suggested change:

```ts
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topics-list',
  imports: [RouterLink],
  templateUrl: './topics-list.html',
  styleUrl: './topics-list.scss',
})
```

- [ ] Edit `topics-list.html`.
- [ ] Wrap each topic title in a router link.

Suggested markup:

```html
<a [routerLink]="['/topics', topic.id]">
  {{ topic.title }}
</a>
```

Keep the checkbox behavior unchanged:

```html
<input
  type="checkbox"
  [checked]="topic.done"
  (change)="toggleTopic(topic.id)"
/>
```

## Prediction prompt

Before running the app, answer these:

- [X] If the URL is `/`, which component should render inside `<router-outlet />`?
- [X] If the URL is `/topics/2`, which component should render?
- [X] What value should `TopicDetailsPage.id()` return for `/topics/2`?
- [X] Why should the dashboard checkbox state reset if you navigate away and come back?

## Verification checklist

- [ ] The app builds successfully.
- [ ] Visiting `/` shows the learning tracker dashboard.
- [ ] Clicking a topic title navigates to `/topics/{id}`.
- [ ] The details page shows the correct topic title and description.
- [ ] The details page has a working link back to the dashboard.
- [ ] The reset button still resets dashboard progress.
- [ ] Checkboxes still update `completedCount()` and `completedPercent()`.
- [ ] Visiting an unknown route redirects back to `/`.
- [ ] Visiting an unknown topic id, such as `/topics/999`, shows the fallback message.

## Reflection questions

- [X] What is the job of `App` after this refactor?
- [X] What is the job of `DashboardPage`?
- [X] Why did we use `RouterOutlet`?
- [X] Why did we use `RouterLink` instead of `href`?
- [X] How is `loadComponent` different from importing a component directly into `App`?
- [X] How does `withComponentInputBinding()` make route params feel similar to normal component inputs?
- [X] How does this compare with React Router's `<Routes>` and Vue Router's `<RouterView />`?

## Stretch task

- [ ] Add a visible active state to the dashboard navigation link with `routerLinkActive`.
- [X] Add one short "What you will learn next" line to each topic detail page.
- [ ] Add route titles that mention the selected topic name. This may require a different approach than static `title` strings, so treat it as research rather than required work.
