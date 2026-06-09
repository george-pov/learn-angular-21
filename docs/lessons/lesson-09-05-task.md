# Lesson 09-05 Task: Test Routing and Deferred UI

## Feature to build

Add an E2E test that opens a topic details route and then opens the deferred notes panel.

## Files to edit

- `e2e/dashboard.spec.ts`

## Steps

1. Add this test:

   ```ts
   test('opens topic details and deferred notes', async ({ page }) => {
     await page.goto('/');

     await page.getByRole('link', { name: 'Standalone components' }).click();

     await expect(page).toHaveURL(/\/topics\/1$/);
     await expect(
       page.getByRole('heading', { name: 'Topic 1' }),
     ).toBeVisible();

     await page.getByRole('button', { name: 'Open notes' }).click();

     await expect(
       page.getByRole('heading', { name: 'Topic notes' }),
     ).toBeVisible();
     await expect(
       page.getByText('Deferred notes for topic 1'),
     ).toBeVisible();
   });
   ```

2. Run:

   ```powershell
   npm run e2e
   ```

3. If the route test fails, run the single test in UI mode and inspect each step:

   ```powershell
   npx playwright test -g "opens topic details" --ui
   ```

## Prediction

Before running the test, predict which assertion fails if the topic link uses a normal `href` that reloads to the wrong path.

## Verify

- The route test passes.
- The URL changes to `/topics/1`.
- The details heading renders.
- The notes panel appears only after clicking `Open notes`.
- The test does not import Angular route config directly.

## Reflection

- Why does this test click the link instead of navigating directly to `/topics/1`?
- What does the URL assertion prove?
- Why is deferred content tested after the interaction rather than immediately after page load?
