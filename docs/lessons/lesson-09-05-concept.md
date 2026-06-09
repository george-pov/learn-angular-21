# Lesson 09-05 Concept: Test Routing and Deferred UI

## Goal

Navigate from the dashboard to a topic details route and open the deferred notes panel.

## The single new concept

Playwright can assert browser navigation and then wait for UI that appears after interaction:

```ts
await page.getByRole('link', { name: 'Standalone components' }).click();
await expect(page).toHaveURL(/\/topics\/1$/);

await page.getByRole('button', { name: 'Open notes' }).click();
await expect(page.getByRole('heading', { name: 'Topic notes' })).toBeVisible();
```

This tests the router and the deferred view from the user's point of view.

## Prior knowledge assumed

- Module 03: topic links navigate to `/topics/:id`.
- Module 07: the notes panel is deferred until interaction.
- Lesson 09-03: Playwright assertions wait for visible state.

## Routing mental model

The test should not instantiate `TopicDetails` directly. It should let the router do that:

1. Start on `/`.
2. Click a topic link.
3. Assert the browser URL changed.
4. Assert the routed page heading changed.

That gives confidence that links, route configuration, lazy loading, and route input binding work together.

## Deferred UI mental model

The notes panel is intentionally not present immediately. The test should perform the trigger:

```ts
await page.getByRole('button', { name: 'Open notes' }).click();
```

Then it should assert the deferred content:

```ts
await expect(page.getByRole('heading', { name: 'Topic notes' })).toBeVisible();
```

Do not assert private Angular state. The user only knows whether the notes panel appeared.

## Why URL assertions help

This assertion checks the browser-level navigation result:

```ts
await expect(page).toHaveURL(/\/topics\/1$/);
```

If the details heading appears but the URL is wrong, the route behavior is still suspect. Checking both URL and visible content gives a clearer E2E signal.

## Comparison callout

Module 03 taught route configuration by editing Angular files. This lesson verifies routing from outside Angular by clicking a real link and observing the browser URL.

## Vocabulary checkpoint

- **Navigation assertion:** an assertion about the browser's current URL.
- **Deferred content:** UI rendered later by `@defer`.
- **Trigger:** the interaction that causes deferred content to load.
- **Lazy route:** a route whose component is loaded on demand.
