# Lesson 05-07 Task: Provide a Plain Value With `useValue`

## Feature to build

Add a `STORAGE_KEY` injection token, provide it at the root, inject it in `TopicStore`, and render it as a small diagnostic.

## Starting point

`TopicStore` owns topic state. `app.config.ts` already contains router providers and the root logger provider from Lesson 05-06.

## Files to create

- `src/app/app-tokens.ts`

## Files to edit

- `src/app/app.config.ts`
- `src/app/topic-store.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. Create `src/app/app-tokens.ts`:

   ```ts
   import { InjectionToken } from '@angular/core';

   export const STORAGE_KEY = new InjectionToken<string>('STORAGE_KEY');
   ```

2. In `app.config.ts`, provide the value:

   ```ts
   import { STORAGE_KEY } from './app-tokens';

   export const appConfig: ApplicationConfig = {
     providers: [
       provideBrowserGlobalErrorListeners(),
       provideRouter(routes, withComponentInputBinding()),
       { provide: Logger, useClass: ConsoleLogger },
       { provide: STORAGE_KEY, useValue: 'learn-angular-22-topics' },
     ],
   };
   ```

   Keep the existing logger and router providers.

3. In `topic-store.ts`, import `inject` and `STORAGE_KEY`:

   ```ts
   import { computed, inject, Injectable, signal } from '@angular/core';
   import { STORAGE_KEY } from './app-tokens';
   ```

4. Inject the value in `TopicStore`:

   ```ts
   readonly storageKey = inject(STORAGE_KEY);
   ```

   This can be readonly and public for this lesson because the dashboard renders it as a diagnostic. Later, once persistence is working, it can be made private again.

5. In `dashboard.html`, render the key near the bottom of the dashboard:

   ```html
   <p>Storage key: {{ store.storageKey }}</p>
   ```

6. Do not add `localStorage` persistence yet.

7. Do not replace the string token with a raw string in `inject()`. Always inject the `STORAGE_KEY` token:

   ```ts
   inject(STORAGE_KEY);
   ```

## Prediction

Before running the app, predict what string the dashboard will render for the storage key. What file controls that value?

## Verify

- The dashboard renders `Storage key: learn-angular-22-topics`.
- Topic toggling and form submission still work.
- `STORAGE_KEY` is an `InjectionToken<string>`.
- `app.config.ts` provides the value with `useValue`.
- No persistence code has been added yet.
- Changing the `useValue` string changes the diagnostic text after refresh.
- `TopicStore` does not hardcode `'learn-angular-22-topics'`.

## Reflection

- Why does a plain string need an `InjectionToken`?
- What would change if the storage key value changed in `app.config.ts`?
- Why is this setup useful before adding `localStorage`?
