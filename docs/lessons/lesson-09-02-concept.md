# Lesson 09-02 Concept: Launch the App for E2E Tests

## Goal

Configure Playwright to start the Angular dev server and write the first browser smoke test.

## The single new concept

Playwright can start a local web server before tests run:

```ts
webServer: {
  command: 'npm start -- --port 4200',
  url: 'http://localhost:4200',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

Then `baseURL` lets tests navigate with relative URLs:

```ts
use: {
  baseURL: 'http://localhost:4200',
}
```

With that config, this goes to the Angular app:

```ts
await page.goto('/');
```

## Prior knowledge assumed

- Lesson 09-01: Playwright Test is installed.
- Lesson 03-02: the dashboard route is served at `/`.
- Module 08: tests should verify observable behavior.

## Why use `webServer`

An E2E test needs a running app. You could manually run `npm start` in another terminal, but that makes the test command depend on hidden setup.

The `webServer` config makes the dependency explicit:

- start the Angular app if needed
- wait until the configured URL responds
- run the tests
- reuse an existing server locally when allowed

That makes `npm run e2e` closer to a one-command workflow.

## Why the first test is a smoke test

The first E2E assertion should be tiny:

```ts
await expect(page.getByRole('heading', { name: 'Angular 22 Learning Tracker' })).toBeVisible();
```

This proves:

- Playwright can launch a browser.
- The Angular dev server starts.
- The root route loads.
- The dashboard heading is visible.

It does not try to test forms, HTTP, routes, and deferred views all at once.

## API note

For this first test, do not start `npm run api`. The app can still render from its local fallback data when the local API is unavailable. Lesson 09-06 teaches how to control the API boundary deliberately.

## Comparison callout

In a component test, `TestBed.createComponent(Dashboard)` creates the component directly. In an E2E test, the browser navigates to `/` and Angular creates the component through the real router and app bootstrap path.

## Vocabulary checkpoint

- **`webServer`:** Playwright config that starts a local server before tests.
- **`baseURL`:** the default origin used for relative navigation.
- **Smoke test:** a small test that proves the basic test environment works.
- **Headless:** browser mode without a visible browser window.
