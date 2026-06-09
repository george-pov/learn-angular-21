# Lesson 08-05 Task: Test a Signal-Driven Computed

## Feature to build

Inject `TopicStore`, toggle a topic, and assert `completedCount`.

## Files to create

- `src/app/topic-store.spec.ts`

## Steps

1. Create a store spec with these providers:

   ```ts
   providers: [
     provideHttpClient(),
     provideHttpClientTesting(),
     { provide: STORAGE_KEY, useValue: 'store-test-topics' },
   ]
   ```

2. Inject `TopicStore`.

3. Use `HttpTestingController` to flush any startup API requests with a test error so the store keeps its seed data.

4. Assert the computed value before and after toggling:

   ```ts
   expect(store.completedCount()).toBe(1);

   store.toggleTopic(2);

   expect(store.completedCount()).toBe(2);
   ```

5. Run `npm test`.

## Prediction

Before running the test, predict why the test should not use the real local API.

## Verify

- The store spec passes.
- Dashboard specs still pass.
- The test does not require `npm run api`.
- `completedCount()` changes after `toggleTopic(2)`.
- The computed signal is read directly with `()`.

## Reflection

- Why test `TopicStore` without rendering `Dashboard`?
- Why does the store test still use TestBed?
- Why does `completedCount()` update after `toggleTopic(2)`?

## End-of-module checkpoint

After this lesson the project has component tests for dashboard rendering and form behavior, plus a direct store test for signal-derived state.
