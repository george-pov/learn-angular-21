# Lesson 09-04 Concept: Test a Form Workflow

## Goal

Drive the dashboard form like a user and assert that the submitted topic appears.

## The single new concept

An E2E test interacts with the browser, not with Angular component methods:

```ts
await page.getByLabel('New topic title').fill('Playwright E2E');
await page.getByLabel('Description').fill('Drive the app through a browser.');
await page.getByRole('button', { name: 'Add topic' }).click();

await expect(
  page.getByRole('link', { name: 'Playwright E2E' }),
).toBeVisible();
```

The test does not call `Dashboard.addTopic()` and does not inject `TopicStore`.

## Prior knowledge assumed

- Lesson 04-06: the dashboard form adds topics.
- Lesson 09-03: Playwright can find controls with user-facing locators.

## Workflow mental model

The test should follow the user's path:

1. Navigate to the dashboard.
2. Fill the title field.
3. Fill the description field.
4. Click the submit button.
5. Assert the new topic is visible.

That path exercises several pieces together:

- real browser input events
- Angular reactive forms
- the `(ngSubmit)` handler
- the injected store
- template re-rendering

## Why not call methods

This would skip the browser workflow:

```ts
// Not an E2E test.
component.addTopic();
```

That kind of direct call belongs in smaller Angular tests. In Playwright, the useful signal is that the user can complete the workflow through the page.

## Handling async behavior

The app may update after an HTTP attempt or signal update. Let the assertion wait for the final visible state:

```ts
await expect(page.getByRole('link', { name: 'Playwright E2E' })).toBeVisible();
```

Do not guess timing with sleeps.

## API note

Keep `npm run api` stopped for this lesson. The app's fallback path can still add the topic locally. Lesson 09-06 shows how to control API data explicitly.

## Comparison callout

Module 08 simulated form input inside an Angular fixture. This lesson uses a real browser page. Both test the same user-facing behavior, but the E2E test covers more app wiring and gives less direct access to Angular internals.

## Vocabulary checkpoint

- **Workflow test:** a test that follows a user task from start to visible result.
- **Browser event:** the event produced by real page interaction.
- **Visible result:** the page state a user can observe after the action.
