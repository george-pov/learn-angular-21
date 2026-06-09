# Lesson 08-05 Concept: Test a Signal-Driven Computed

## Goal

Test `TopicStore` directly and assert that a computed signal updates after a store method changes signal state.

## The single new concept

Not every test needs a component fixture. Services can be tested directly through TestBed:

```ts
const store = TestBed.inject(TopicStore);

expect(store.completedCount()).toBe(1);

store.toggleTopic(2);

expect(store.completedCount()).toBe(2);
```

The computed signal is read with `()`, just like in the template.

## Prior knowledge assumed

- Lesson 05-04: `TopicStore` owns `completedCount`.
- Lesson 06-03: `TopicStore` injects `HttpClient`.
- Lesson 08-02: TestBed can provide dependencies.

## Why use HTTP testing providers?

By the end of Module 06, `TopicStore` makes HTTP requests when it is created. The store test should not call the real local API. Angular's HTTP testing provider replaces real network requests with test-controlled requests.

That keeps the test:

- fast
- deterministic
- runnable without `npm run api`
- focused on store behavior

## Component test versus store test

The dashboard tests ask: does the user-facing UI behave correctly?

The store test asks: does the state owner compute and update correctly?

Both are useful, but they protect different boundaries. A failing dashboard test might mean the template is broken. A failing store test might mean the state transition is broken.

## Comparison callout

React and Vue projects often test stores, composables, or reducers directly when the logic is not primarily DOM behavior. This Angular version still uses TestBed because the store receives dependencies from Angular DI.
