# Lesson 09-06 Concept: Control the API Boundary

## Goal

Make E2E data deterministic by choosing and controlling the API boundary.

## The single new concept

Playwright can intercept browser network requests before the app sees the response:

```ts
await page.route('http://localhost:3000/topics', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      {
        id: 10,
        title: 'Controlled API topic',
        description: 'Loaded from a Playwright route.',
        done: false,
      },
    ]),
  });
});
```

The route must be registered before `page.goto('/')` because the app requests topics during startup.

## Prior knowledge assumed

- Module 06: the store loads topics from `http://localhost:3000/topics`.
- Lesson 09-02: Playwright starts the Angular app.
- Lesson 09-03: assertions should target visible state.

## Why the API boundary matters

E2E tests need stable data. If a test depends on whatever happens to be in `db.json`, the result can change because another lesson, another test, or a manual browser session changed the file.

For this learning project, there are three reasonable boundaries:

- Keep the API stopped and use the app's local fallback. This is simple, but it does not test API loading.
- Start `json-server` as another Playwright `webServer`. This is closer to full-stack local E2E, but tests must reset data.
- Intercept the browser request with `page.route`. This keeps the browser workflow real while making the API response deterministic.

This lesson uses request routing because it introduces the boundary clearly and avoids mutating `db.json`.

## Is this still E2E?

It is an E2E test of the browser and Angular app with a controlled network boundary. It is not a full backend integration test.

That distinction is useful. A small frontend project can have:

- component tests for Angular pieces
- store tests for state logic
- E2E tests with controlled API responses
- a separate API integration test if backend behavior becomes a learning topic

Do not pretend one test layer proves everything.

## What to assert

Assert the visible result of the controlled response:

```ts
await expect(
  page.getByRole('link', { name: 'Controlled API topic' }),
).toBeVisible();
```

Avoid asserting implementation details such as the private `topicsSignal`. The browser only knows what the page renders.

## Comparison callout

React and Vue E2E tests face the same data-boundary question. The framework changes the app internals, but the browser still requests URLs and renders responses.

## Vocabulary checkpoint

- **Network route:** a Playwright rule for handling matching browser requests.
- **Fulfill:** respond to a matching request with test-controlled data.
- **Deterministic data:** test data that does not depend on previous manual state.
- **Boundary:** the line between what the test covers and what it controls.
