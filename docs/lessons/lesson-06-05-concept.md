# Lesson 06-05 Concept: POST a New Topic

## Goal

Send new topics to the API and append the topic returned by the server.

## The single new concept

`HttpClient.post<T>()` sends a request body and emits the response:

```ts
addTopic(title: string, description: string): void {
  const body = { title, description, done: false };

  this.http.post<Topic>(API_URL, body).subscribe({
    next: (topic) => {
      this.loadError.set(null);
      this.topicsSignal.update((current) => [...current, topic]);
    },
  });
}
```

The client no longer computes the next id. The API assigns the id and returns the complete `Topic`.

## Prior knowledge assumed

- Lesson 04-06: form submission calls `store.addTopic(...)`.
- Lesson 06-03: HTTP responses are handled with `subscribe`.
- Lesson 06-04: errors can be surfaced through `loadError`.

## Why append the response?

The response is the source of truth after a POST because it includes the server-assigned id:

```json
{
  "id": 4,
  "title": "HTTP",
  "description": "Load data from an API.",
  "done": false
}
```

Appending the original request body would miss the id.

## Error path

This lesson can reuse `loadError` for save failures:

```ts
error: () => {
  this.loadError.set('Could not save topic. Make sure npm run api is running.');
}
```

Do not add optimistic updates yet. The visible list should change only after the API confirms the new topic.

## Comparison callout

React and Vue code often uses `fetch(..., { method: 'POST' })` and then updates local state from the JSON response. Angular's `HttpClient.post<T>()` does the same job with typed observables.
