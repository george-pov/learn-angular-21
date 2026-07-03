# Lesson 03-02 Task: Extract a `Dashboard` Routed Page

## Feature to build

A new `Dashboard` component that holds the entire tracker UI from Module 02. The router serves it at `/`. `App` becomes a shell with only `<router-outlet />`.

## Files to create

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`
- `src/app/dashboard/dashboard.scss`

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`
- `src/app/app.routes.ts`

## Steps

1. Create `src/app/dashboard/dashboard.scss` empty.

2. Create `src/app/dashboard/dashboard.html` with the dashboard markup moved from `app.html`:

   ```html
   <h1>Angular 22 Learning Tracker</h1>
   <p>A tiny app for learning modern Angular 22 one concept at a time.</p>

   <p>{{ progressLabel() }}</p>

   @if (topics().every((topic) => topic.done)) {
   <p>All topics complete.</p>
   } @else {
   <p>Keep going.</p>
   }

   <app-topics-list [topics]="topics()" (toggle)="toggleTopic($event)" />

   <label>
     New topic title:
     <input
       type="text"
       [value]="currentTitle()"
       (input)="currentTitle.set($any($event.target).value)"
     />
   </label>
   <p>You typed: {{ currentTitle() }}</p>
   ```

3. Create `src/app/dashboard/dashboard.ts`:

   ```ts
   import { Component, computed, signal } from '@angular/core';
   import { Topic } from '../topic';
   import { TopicsList } from '../topics-list/topics-list';

   @Component({
     selector: 'app-dashboard',
     templateUrl: './dashboard.html',
     styleUrl: './dashboard.scss',
     imports: [TopicsList],
   })
   export class Dashboard {
     protected readonly currentTitle = signal('');

     protected readonly topics = signal<Topic[]>([
       {
         id: 1,
         title: 'Standalone components',
         description: 'Understand component metadata and standalone imports.',
         done: true,
       },
       {
         id: 2,
         title: 'Signals',
         description: 'Use signals for local reactive state.',
         done: false,
       },
       {
         id: 3,
         title: 'Template control flow',
         description: 'Render branches and lists with modern template syntax.',
         done: false,
       },
     ]);

     protected readonly progressLabel = computed(() => {
       const total = this.topics().length;
       const done = this.topics().filter((topic) => topic.done).length;
       return `${done} of ${total} topics complete`;
     });

     protected toggleTopic(id: number): void {
       this.topics.update((current) =>
         current.map((topic) => (topic.id === id ? { ...topic, done: !topic.done } : topic)),
       );
     }
   }
   ```

4. Replace `app.ts` so `App` is a shell:

   ```ts
   import { Component } from '@angular/core';
   import { RouterOutlet } from '@angular/router';

   @Component({
     selector: 'app-root',
     templateUrl: './app.html',
     styleUrl: './app.scss',
     imports: [RouterOutlet],
   })
   export class App {}
   ```

5. Replace `app.html` with just the outlet:

   ```html
   <router-outlet />
   ```

6. Register the route in `app.routes.ts`:

   ```ts
   import { Routes } from '@angular/router';
   import { Dashboard } from './dashboard/dashboard';

   export const routes: Routes = [{ path: '', component: Dashboard }];
   ```

## Prediction

After this lesson, what URL renders the dashboard? What happens if you visit `/topics/1`?

## Verify

- Visiting `/` shows the same UI as the end of Module 02.
- All interactions (toggle, text input) still work.
- Visiting an unknown URL like `/topics/1` shows nothing (the outlet stays empty — no route matches).

## Reflect

- What is the role of `App` after this refactor?
- What is the role of `Dashboard`?
- Why does `App` no longer need `TopicsList` in its `imports`?
- How does this layering compare with how a React Router app separates a root layout from a page?
