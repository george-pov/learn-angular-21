# Lesson 06-02 Task: Register `HttpClient`

## Feature to build

Add `provideHttpClient()` to application providers.

## Files to edit

- `src/app/app.config.ts`

## Steps

1. In `app.config.ts`, import `provideHttpClient`:

   ```ts
   import { provideHttpClient } from '@angular/common/http';
   ```

2. Add `provideHttpClient()` to the providers array:

   ```ts
   export const appConfig: ApplicationConfig = {
     providers: [
       provideBrowserGlobalErrorListeners(),
       provideRouter(routes, withComponentInputBinding()),
       provideHttpClient(),
       // existing DI providers stay here
     ],
   };
   ```

3. Keep the existing router, logger, storage, and build-label providers.

4. Do not inject `HttpClient` yet.

## Prediction

Before running the app, predict whether registering a provider changes the dashboard UI.

## Verify

- The app compiles.
- The dashboard behavior is unchanged.
- `provideHttpClient()` is listed in `app.config.ts`.
- No HTTP request is made yet.

## Reflection

- Why is `HttpClient` registered in `app.config.ts` instead of `Dashboard.imports`?
- What would fail if `TopicStore` injected `HttpClient` before this provider existed?
- How does this differ from Angular v15's `HttpClientModule` setup?
