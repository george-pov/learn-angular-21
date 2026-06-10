# Lesson 06-05 Concept: POST a New Topic

## Goal

Send new topics to the API, append the topic returned by the server, and keep a local fallback when the API is unavailable.

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
    error: () => {
      const nextId = Math.max(
        0,
        ...this.topicsSignal().map((topic) => topic.id),
      ) + 1;
      this.topicsSignal.update((current) => [
        ...current,
        { id: nextId, ...body },
      ]);
      this.loadError.set('Saved locally because the API is not running.');
    },
  });
}
```

The success path no longer computes the next id. The API assigns the id and returns the complete `Topic`. The error path computes a local id only as a fallback so the learning app remains usable when the local API is stopped.

## Prior knowledge assumed

- Lesson 04-08: the Signal Forms submission action submits the topic draft.
- Lesson 05-03: form submission delegates to `store.addTopic(...)`.
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

## Error path and local fallback

This lesson reuses `loadError` for save failures, but it still appends the topic locally:

```ts
error: () => {
  const nextId = Math.max(0, ...this.topicsSignal().map((topic) => topic.id)) + 1;
  this.topicsSignal.update((current) => [...current, { id: nextId, ...body }]);
  this.loadError.set('Saved locally because the API is not running.');
}
```

This is not a production offline-sync design. It is a learning-project fallback that keeps later component and E2E tests independent from `json-server`.

## Comparison callout

React and Vue code often uses `fetch(..., { method: 'POST' })` and then updates local state from the JSON response. Angular's `HttpClient.post<T>()` does the same job with typed observables.
