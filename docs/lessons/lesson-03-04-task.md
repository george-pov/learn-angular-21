# Lesson 03-04 Task: Add a Second Route

## Feature to build

Create a `TopicDetails` page, register `/topics/:id`, add a wildcard redirect, and link each topic title to its details route.

## Files to create

- `src/app/topic-details/topic-details.ts`
- `src/app/topic-details/topic-details.html`
- `src/app/topic-details/topic-details.scss`

## Files to edit

- `src/app/app.routes.ts`
- `src/app/topics-list/topics-list.ts`
- `src/app/topics-list/topics-list.html`

## Steps

1. Create `topic-details.scss` empty.

2. Create `topic-details.html`:

   ```html
   <h2>Topic details placeholder</h2>
   ```

3. Create `topic-details.ts`:

   ```ts
   import { Component } from '@angular/core';

   @Component({
     selector: 'app-topic-details',
     templateUrl: './topic-details.html',
     styleUrl: './topic-details.scss',
   })
   export class TopicDetails {}
   ```

4. In `app.routes.ts`, import `TopicDetails` and add the second route plus wildcard fallback:

   ```ts
   import { Routes } from '@angular/router';
   import { Dashboard } from './dashboard/dashboard';
   import { TopicDetails } from './topic-details/topic-details';

   export const routes: Routes = [
     { path: '', component: Dashboard },
     { path: 'topics/:id', component: TopicDetails },
     { path: '**', redirectTo: '' },
   ];
   ```

5. In `topics-list.ts`, import `RouterLink` and add it to component imports:

   ```ts
   import { RouterLink } from '@angular/router';

   @Component({
     selector: 'app-topics-list',
     templateUrl: './topics-list.html',
     styleUrl: './topics-list.scss',
     imports: [RouterLink],
   })
   ```

6. In `topics-list.html`, replace the visible title text with a router link:

   ```html
   <a [routerLink]="['/topics', topic.id]">{{ topic.title }}</a>
   ```

   Keep the existing checkbox binding and toggle output unchanged.

## Prediction

Before running the app, predict what happens when you click the `Signals` topic title. What URL should the browser show?

## Verify

- Visiting `/` still shows the dashboard.
- Clicking a topic title navigates to `/topics/1`, `/topics/2`, or `/topics/3`.
- The details page shows `Topic details placeholder`.
- Visiting an unknown URL redirects back to `/`.
- The topic checkboxes still toggle from the dashboard.

## Reflection

- Why does the wildcard route belong last?
- Why does `TopicsList` need `RouterLink` in its imports?
- What part of `/topics/2` is static, and what part is a parameter?
