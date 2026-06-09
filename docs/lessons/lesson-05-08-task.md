# Lesson 05-08 Task: Build a Value With `useFactory`

## Feature to build

Add an `APP_BUILD_LABEL` token, provide it with `useFactory`, inject it in `App`, and render it in the footer.

## Files to edit

- `src/app/app-tokens.ts`
- `src/app/app.config.ts`
- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app-tokens.ts`, add another token:

   ```ts
   export const APP_BUILD_LABEL = new InjectionToken<string>('APP_BUILD_LABEL');
   ```

2. In `app.config.ts`, import `APP_BUILD_LABEL` and provide it:

   ```ts
   import { APP_BUILD_LABEL, STORAGE_KEY } from './app-tokens';

   {
     provide: APP_BUILD_LABEL,
     useFactory: () => `built-at-${new Date().toISOString()}`,
   }
   ```

3. In `app.ts`, import `inject` and the token:

   ```ts
   import { Component, inject } from '@angular/core';
   import { APP_BUILD_LABEL } from './app-tokens';
   ```

4. Inject the value in `App`:

   ```ts
   protected readonly buildLabel = inject(APP_BUILD_LABEL);
   ```

5. In `app.html`, render a footer below the outlet:

   ```html
   <footer>{{ buildLabel }}</footer>
   ```

## Prediction

Before running the app, predict whether the footer value changes while the app is open. What happens after a full browser refresh?

## Verify

- The footer renders a value starting with `built-at-`.
- The dashboard route still renders inside `<router-outlet />`.
- Refreshing the browser creates a new timestamp.
- Navigating between dashboard and details does not recompute the label.
- `APP_BUILD_LABEL` uses `useFactory`, not `useValue`.

## Reflection

- Why is this a factory provider instead of a value provider?
- Which component injects the build label?
- Why does routing within the app not recompute the label?
