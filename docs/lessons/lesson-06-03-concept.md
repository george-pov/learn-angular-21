# Lesson 06-03 Concept: GET the Topic List

## Goal

Load the topic list from the local API and put the response into `TopicStore`'s topic signal.

## The single new concept

`HttpClient.get<T>()` returns an RxJS `Observable<T>`:

```ts
private readonly http = inject(HttpClient);

loadFromApi(): void {
  this.http.get<Topic[]>('http://localhost:3000/topics').subscribe({
    next: (topics) => {
      this.topicsSignal.set(topics);
    },
  });
}
```

Two important pieces:

- `get<Topic[]>()` tells TypeScript what shape the response should have.
- `subscribe(...)` starts the request and receives the emitted response.

## Prior knowledge assumed

- Lesson 05-03: `TopicStore` owns `topicsSignal`.
- Lesson 06-02: `HttpClient` is available through DI.

## Observable mental model

An `HttpClient` observable is cold. Creating it does not make the request:

```ts
const request$ = this.http.get<Topic[]>(API_URL);
```

Subscribing starts the request:

```ts
request$.subscribe({ next: ... });
```

For a one-shot GET, the observable emits the response and completes.

## Local storage after this lesson

Module 05 added local persistence. This lesson does not remove that fallback. The store can still initialize from `localStorage`, then replace the list with the API response when the API succeeds.

## Comparison callout

React learners can compare this with `fetch('/topics').then(...)` followed by `setState`. Vue learners can compare it with a composable that fetches data and writes into a `ref`. Angular's `HttpClient` uses observables, so `subscribe` is the first bridge from the HTTP stream into signal state.
