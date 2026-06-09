# Lesson 06-06 Task: Bridge an Observable to a Signal With `toSignal`

## Feature to build

Expose one `HttpClient` observable as a signal and render an API preview count.

## Files to edit

- `src/app/topic-store.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `topic-store.ts`, import `toSignal`:

   ```ts
   import { toSignal } from '@angular/core/rxjs-interop';
   ```

2. Add a read-only API preview signal to `TopicStore`:

   ```ts
   readonly apiPreview = toSignal(this.http.get<Topic[]>(API_URL), {
     initialValue: [] as Topic[],
   });
   ```

   Keep the existing `loadFromApi()` method. This lesson is demonstrating interop, not replacing the store's main writable state.

3. In `dashboard.html`, render the preview count near the progress label:

   ```html
   <p>API preview count: {{ store.apiPreview().length }}</p>
   ```

4. Keep `npm run api` running while testing this lesson.

## Prediction

Before running the app, predict the first value of `store.apiPreview().length` before the HTTP response arrives and the value after the response arrives.

## Verify

- The dashboard first has an initial preview count of `0`.
- After the API responds, the preview count matches the number of topics in `db.json`.
- The main topic list still comes from `store.topics()`.
- Adding a topic still uses the POST flow from Lesson 06-05.
- No broad RxJS refactor has been introduced.

## Reflection

- Why does `toSignal()` need an `initialValue` here?
- Why keep `loadFromApi()` instead of replacing the whole store with `apiPreview`?
- When would you choose a manual subscription over `toSignal()`?

## End-of-module checkpoint

After this lesson the dashboard loads topics from a local API, shows API load failures, posts new topics to `json-server`, and demonstrates a narrow observable-to-signal bridge. The app still uses `TopicStore` as the state owner. Module 07 will introduce deferrable views.
