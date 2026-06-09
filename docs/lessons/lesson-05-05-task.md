# Lesson 05-05 Task: Scope a Service at the Component Level

## Feature to build

Add `LoggerService`, inject it in `Dashboard` and `TopicDetails`, then provide a local logger instance on `TopicDetails`.

## Starting point

`TopicStore` owns topic state and derived progress state. `Dashboard` injects `TopicStore`. `TopicDetails` already receives the route `id` through a signal input.

## Files to create

- `src/app/logger.ts`

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/topic-details/topic-details.ts`
- `src/app/topic-details/topic-details.html`

## Steps

1. Create `src/app/logger.ts`:

   ```ts
   import { Injectable } from '@angular/core';

   let nextLoggerId = 1;

   @Injectable({ providedIn: 'root' })
   export class LoggerService {
     private readonly instanceId = nextLoggerId++;

     readonly label = `Logger instance ${this.instanceId}`;

     log(message: string): void {
       console.log(`[${this.label}] ${message}`);
     }
   }
   ```

2. In `dashboard.ts`, inject the logger:

   ```ts
   import { inject } from '@angular/core';
   import { LoggerService } from '../logger';

   private readonly logger = inject(LoggerService);

   constructor() {
     this.logger.log('Dashboard created');
   }
   ```

   If `dashboard.ts` already imports `inject` for `TopicStore`, add only the `LoggerService` import and the new field.

3. In `topic-details.ts`, inject the logger and add a local provider:

   ```ts
   import { Component, inject, input } from '@angular/core';
   import { LoggerService } from '../logger';

   @Component({
     selector: 'app-topic-details',
     templateUrl: './topic-details.html',
     styleUrl: './topic-details.scss',
     providers: [LoggerService],
   })
   export class TopicDetails {
     readonly id = input.required<string>();
     protected readonly logger = inject(LoggerService);

     constructor() {
       this.logger.log('TopicDetails created');
     }
   }
   ```

   Keep any existing imports required by `TopicDetails`.

4. In `topic-details.html`, render the local logger label:

   ```html
   <p>{{ logger.label }}</p>
   ```

5. Do not change `TopicStore`.

6. Do not add `LoggerService` to `app.config.ts`. Its root provider comes from `providedIn: 'root'`.

## Prediction

Before running the app, predict whether the dashboard and details page use the same logger instance. Which component creates the local provider?

## Verify

- The dashboard still works.
- Navigating to `/topics/1` still shows the topic id.
- The details page renders a logger label.
- The console shows a dashboard log and a topic-details log.
- The details page logger has its own instance because `TopicDetails` has `providers: [LoggerService]`.
- The dashboard does not need a local `providers` array for the logger.
- Removing `providers: [LoggerService]` from `TopicDetails` would make it use the root logger.

## Reflection

- What changed when `LoggerService` was added to `TopicDetails.providers`?
- Why does this not replace the root logger for the whole app?
- How is this similar to providing a different context value in a React subtree?
