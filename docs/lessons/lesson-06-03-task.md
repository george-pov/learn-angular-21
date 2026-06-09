# Lesson 06-03 Task: GET the Topic List

## Feature to build

Load topics from `http://localhost:3000/topics` into `TopicStore`.

## Files to edit

- `src/app/topic-store.ts`

## Steps

1. In `topic-store.ts`, import `HttpClient`:

   ```ts
   import { HttpClient } from '@angular/common/http';
   ```

2. Add an API URL constant near `SEED_TOPICS`:

   ```ts
   const API_URL = 'http://localhost:3000/topics';
   ```

3. Inject `HttpClient` in `TopicStore`:

   ```ts
   private readonly http = inject(HttpClient);
   ```

4. Add a `loadFromApi()` method:

   ```ts
   loadFromApi(): void {
     this.http.get<Topic[]>(API_URL).subscribe({
       next: (topics) => {
         this.topicsSignal.set(topics);
       },
     });
   }
   ```

5. Call it from the constructor after the persistence effect:

   ```ts
   constructor() {
     effect(() => {
       localStorage.setItem(
         this.storageKey,
         JSON.stringify(this.topicsSignal()),
       );
     });

     this.loadFromApi();
   }
   ```

6. Keep `SEED_TOPICS` and `loadTopics()` for now. They still provide the initial local fallback before the API response arrives.

## Prediction

Before running the app, start `npm run api` and predict what happens on refresh. Will the list come from `db.json` or from `localStorage` after the GET succeeds?

## Verify

- `npm run api` is running.
- Refreshing `/` shows the topics from `db.json`.
- Editing a title in `db.json` and refreshing the browser updates the displayed title.
- The progress label still derives from the store signal.
- No error message UI has been added yet.

## Reflection

- Why does `http.get<Topic[]>()` need `subscribe()`?
- What does the `<Topic[]>` type argument do?
- Why does the store write the response into `topicsSignal` instead of returning it to `Dashboard`?
