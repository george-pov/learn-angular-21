# Lesson 06-05 Task: POST a New Topic

## Feature to build

Post new topics to the API, append the response from `json-server`, and fall back to a local append when the API is unavailable.

## Files to edit

- `src/app/topic-store.ts`

## Steps

1. In `topic-store.ts`, replace the local id generation in `addTopic()` with a POST:

   ```ts
   addTopic(title: string, description: string): void {
     const body = { title, description, done: false };

     this.http.post<Topic>(API_URL, body).subscribe({
       next: (topic) => {
         this.loadError.set(null);
         this.topicsSignal.update((current) => [...current, topic]);
       },
       error: () => {
         const nextId =
           Math.max(0, ...this.topicsSignal().map((topic) => topic.id)) + 1;
         this.topicsSignal.update((current) => [
           ...current,
           { id: nextId, ...body },
         ]);
         this.loadError.set('Saved locally because the API is not running.');
       },
     });
   }
   ```

2. Leave the Signal Forms submission action calling `this.store.addTopic(value.title, value.description)`.

3. Do not compute the next id on the client in the success path. The local id calculation belongs only to the fallback path.

4. Do not add PUT or PATCH for checkbox toggles yet. Toggling can remain local for this lesson.

## Prediction

Before running the app, predict what happens in `db.json` after submitting a valid topic. Where does the new id come from?

## Verify

- `npm run api` is running.
- Submitting a valid topic adds a new row to the dashboard list.
- The new row has an id assigned by `json-server`.
- `db.json` now contains the submitted topic.
- Stopping the API and submitting still adds a row locally.
- Stopping the API and submitting shows `Saved locally because the API is not running.`
- Checkbox toggling still works locally.

## Known limitation

The Signal Forms action still resets immediately after calling `store.addTopic(...)`. The POST happens inside a subscription, so the form does not wait for server confirmation. Handling "reset only after a successful save" would require returning an observable, promise, or result signal from the store. That is useful later, but it is not the new concept in this lesson.

## Reflection

- Why append the response instead of the request body?
- Why should the server assign the id?
- Why is the local fallback useful for later browser tests?
- What tradeoff did this lesson accept around form reset timing?
