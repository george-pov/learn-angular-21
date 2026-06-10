# Lesson 03-05 Task: Read a Route Param Via Signal Input

## Feature to build

Render the route id on `TopicDetails`.

## Files to edit

- `src/app/app.config.ts`
- `src/app/topic-details/topic-details.ts`
- `src/app/topic-details/topic-details.html`

## Steps

1. In `app.config.ts`, import `withComponentInputBinding`:

   ```ts
   import { provideRouter, withComponentInputBinding } from '@angular/router';
   ```

2. Pass it to `provideRouter`:

   ```ts
   provideRouter(routes, withComponentInputBinding()),
   ```

3. In `topic-details.ts`, import `input`:

   ```ts
   import { Component, input } from '@angular/core';
   ```

4. Add the route input to `TopicDetails`:

   ```ts
   export class TopicDetails {
     readonly id = input.required<string>();
   }
   ```

5. Render the id in `topic-details.html`:

   ```html
   <h2>Topic details</h2>
   <p>Route id: {{ id() }}</p>
   ```

## Prediction

Before running the app, predict what `/topics/2` renders. Is the id a number or a string?

## Verify

- Navigating to `/topics/1` renders `Route id: 1`.
- Navigating to `/topics/2` renders `Route id: 2`.
- Refreshing a details URL still works.
- The dashboard route still works.

## Reflection

- Why does the input name have to match `:id`?
- Why does the template read `id()` instead of `id`?
- How does this avoid an `ActivatedRoute` subscription?
