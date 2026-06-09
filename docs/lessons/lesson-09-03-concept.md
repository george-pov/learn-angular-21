# Lesson 09-03 Concept: Use Locators and Web-First Assertions

## Goal

Assert user-visible dashboard state with Playwright locators and assertions that wait for the UI.

## The single new concept

Playwright locators describe how to find elements on the page:

```ts
page.getByRole('link', { name: 'Signals' })
```

Web-first assertions wait until the expected state is true:

```ts
await expect(page.getByRole('link', { name: 'Signals' })).toBeVisible();
```

This is different from reading the DOM once and immediately comparing strings.

## Prior knowledge assumed

- Lesson 09-02: Playwright can open the dashboard.
- Lesson 02-02: topics render as a list.
- Lesson 02-03: topics can be toggled with checkboxes.

## Locator mental model

A locator is not the element itself. It is a reusable query for the element.

```ts
const signalsLink = page.getByRole('link', { name: 'Signals' });
```

Playwright resolves that query when an action or assertion runs. That helps with modern UI because the element may appear after Angular renders, after a route changes, or after async state updates.

## Prefer user-facing locators

Start with locators that match how a user experiences the page:

- `getByRole('heading', { name: ... })`
- `getByRole('button', { name: ... })`
- `getByRole('link', { name: ... })`
- `getByLabel(...)`
- `getByText(...)`

Use CSS selectors when the page has no useful accessible name or when the lesson is specifically checking a styled element. Avoid fragile selectors based on Angular internals.

## Why assertions wait

This assertion can wait for Angular to render the expected element:

```ts
await expect(page.getByText(/topics complete/)).toBeVisible();
```

Do not add arbitrary sleeps:

```ts
// Avoid this.
await page.waitForTimeout(1000);
```

Waiting for the expected UI state is clearer and less flaky than waiting for a fixed amount of time.

## API note

Keep `npm run api` stopped for this lesson. These assertions are about the browser UI, not the API boundary. If a previously running API has different data, the visible topic list may not match the lesson examples.

## Comparison callout

Module 08 used `fixture.nativeElement.querySelector(...)` because the component fixture exposes a DOM node. Playwright uses locators because the browser page can change over time and because actions and assertions can auto-wait.

## Vocabulary checkpoint

- **Locator:** a query Playwright can use for actions and assertions.
- **Accessible name:** the name a control exposes to users and assistive technology.
- **Web-first assertion:** an assertion that waits for browser UI state.
- **Flaky test:** a test that sometimes fails without a real behavior change.
