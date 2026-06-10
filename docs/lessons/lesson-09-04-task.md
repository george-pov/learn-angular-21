# Lesson 09-04 Task: Test a Form Workflow

## Feature to build

Add an E2E test that fills the dashboard form, submits it, and verifies the new topic appears.

## Files to edit

- `e2e/dashboard.spec.ts`

## Steps

1. Add this test:

   ```ts
   test('adds a topic through the form', async ({ page }) => {
     await page.goto('/');

     await page.getByLabel('New topic title').fill('Playwright E2E');
     await page
       .getByLabel('Description')
       .fill('Drive the app through a browser.');
     await page.getByRole('button', { name: 'Add topic' }).click();

     await expect(
       page.getByRole('link', { name: 'Playwright E2E' }),
     ).toBeVisible();
     await expect(
       page.getByText('Drive the app through a browser.'),
     ).toBeVisible();
   });
   ```

2. Run:

   ```powershell
   npm run e2e
   ```

3. If the test fails, run in headed mode to watch the browser:

   ```powershell
   npm run e2e:headed
   ```

## Prediction

Before running the test, predict what happens if the title field is left empty. Does the Signal Forms submission action run?

## Verify

- The form workflow test passes.
- The new topic link appears after submit.
- The new description appears after submit.
- The test does not call Angular component methods.
- The test does not mutate `db.json`.

## Reflection

- Which Angular features are exercised by this one browser workflow?
- Why is this test broader than the Module 08 form test?
- Why should this test still stay small instead of checking every dashboard feature?
