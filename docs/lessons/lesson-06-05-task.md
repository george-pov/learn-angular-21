# Lesson 06-05 Task: POST a New Topic

## Feature to build

Post new topics to the API, then append the response from `json-server`.

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
         this.loadError.set(
           'Could not save topic. Make sure npm run api is running.',
         );
       },
     });
   }
   ```

2. Leave `Dashboard.addTopic()` calling `this.store.addTopic(value.title, value.description)`.

3. Do not compute the next id on the client anymore.

4. Do not add PUT or PATCH for checkbox toggles yet. Toggling can remain local for this lesson.

## Prediction

Before running the app, predict what happens in `db.json` after submitting a valid topic. Where does the new id come from?

## Verify

- `npm run api` is running.
- Submitting a valid topic adds a new row to the dashboard list.
- The new row has an id assigned by `json-server`.
- `db.json` now contains the submitted topic.
- Stopping the API and submitting shows `Could not save topic. Make sure npm run api is running.`
- Checkbox toggling still works locally.

## Known limitation

The form still resets immediately after calling `store.addTopic(...)` because that behavior lives in `Dashboard` from Module 04. Handling "reset only after a successful save" would require returning an observable, promise, or result signal from the store. That is useful later, but it is not the new concept in this lesson.

## Reflection

- Why append the response instead of the request body?
- Why should the server assign the id?
- What tradeoff did this lesson accept around form reset timing?
