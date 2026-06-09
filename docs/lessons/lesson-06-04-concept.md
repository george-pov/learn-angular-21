# Lesson 06-04 Concept: Handle a Load Error

## Goal

Surface API load failures in the dashboard instead of only logging an error in the browser console.

## The single new concept

An HTTP subscription can handle `next` and `error` separately:

```ts
readonly loadError = signal<string | null>(null);

loadFromApi(): void {
  this.http.get<Topic[]>(API_URL).subscribe({
    next: (topics) => {
      this.loadError.set(null);
      this.topicsSignal.set(topics);
    },
    error: () => {
      this.loadError.set('Could not load topics. Start the API with npm run api.');
    },
  });
}
```

The error callback writes a message into a signal. The template reads that signal with `@if`.

## Prior knowledge assumed

- Lesson 01-05: conditional rendering with `@if`.
- Lesson 06-03: `loadFromApi()` subscribes to `http.get<Topic[]>()`.

## Why a signal for the error?

The dashboard template already reacts to store signals. A nullable error signal fits the same pattern:

```html
@if (store.loadError(); as message) {
  <p>{{ message }}</p>
}
```

`null` means no error to show. A string means show that message.

## What happens to existing topics?

This lesson does not clear the current topic list when loading fails. The list can continue showing the local `localStorage` or seed data while the page also explains that the API failed.

## Comparison callout

In React or Vue, you might keep `error` beside `data` in component or store state. The Angular idea is the same, but the state here is a signal owned by the injectable store.
