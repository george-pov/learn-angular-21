# Lesson 09-03 Task: Use Locators and Web-First Assertions

## Feature to build

Extend the dashboard E2E spec with assertions for progress text, a topic link, and a checkbox.

## Files to edit

- `e2e/dashboard.spec.ts`

## Steps

1. Add a test for the rendered dashboard state:

   ```ts
   test('shows the initial topic state', async ({ page }) => {
     await page.goto('/');

     await expect(page.getByText(/topics complete/)).toBeVisible();
     await expect(
       page.getByRole('link', { name: 'Standalone components' }),
     ).toBeVisible();
     await expect(page.getByRole('link', { name: 'Signals' })).toBeVisible();
   });
   ```

2. Add a checkbox interaction test:

   ```ts
   test('toggles a topic checkbox', async ({ page }) => {
     await page.goto('/');

     const signalsCheckbox = page.getByRole('checkbox', { name: /Signals/ });

     await expect(signalsCheckbox).not.toBeChecked();
     await signalsCheckbox.check();
     await expect(signalsCheckbox).toBeChecked();
   });
   ```

3. Run:

   ```powershell
   npm run e2e
   ```

## Prediction

Before running the tests, predict why `getByRole('checkbox', { name: /Signals/ })` can find the checkbox even though the visible topic title is a link.

## Verify

- The smoke test still passes.
- The topic-state test passes.
- The checkbox test passes.
- The tests do not use `waitForTimeout`.
- The tests use user-facing locators instead of Angular component internals.

## Reflection

- Why is a locator better than storing a raw DOM element?
- Why should most E2E assertions use `await expect(...)`?
- What page markup makes the checkbox discoverable by accessible name?
