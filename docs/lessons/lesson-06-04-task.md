# Lesson 06-04 Task: Handle a Load Error

## Feature to build

Set `loadError` when the API load fails and render that message in `Dashboard`.

## Files to edit

- `src/app/topic-store.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `topic-store.ts`, add a nullable error signal:

   ```ts
   readonly loadError = signal<string | null>(null);
   ```

2. Update `loadFromApi()`:

   ```ts
   loadFromApi(): void {
     this.http.get<Topic[]>(API_URL).subscribe({
       next: (topics) => {
         this.loadError.set(null);
         this.topicsSignal.set(topics);
       },
       error: () => {
         this.loadError.set(
           'Could not load topics. Start the API with npm run api.',
         );
       },
     });
   }
   ```

3. In `dashboard.html`, render the error near the progress label:

   ```html
   @if (store.loadError(); as message) {
     <p class="notice">{{ message }}</p>
   }
   ```

4. Do not add retry buttons or loading spinners yet.

## Prediction

Before running the app, stop `npm run api` and refresh the browser. What should the dashboard show? What should happen to the existing topic list?

## Verify

- With `npm run api` stopped, refreshing the app shows `Could not load topics. Start the API with npm run api.`
- The local topic list still renders from stored or seed data.
- Restarting `npm run api` and refreshing clears the error.
- The successful GET still updates the topic list from `db.json`.

## Reflection

- Why does `loadError` use `string | null`?
- Why does the success path clear the error?
- Why is this better than leaving the failure only in the browser console?
