# Lesson 09-06 Task: Control the API Boundary

## Feature to build

Add an E2E test that fulfills the topics API request with deterministic test data.

## Files to edit

- `e2e/dashboard.spec.ts`

## Steps

1. Add this test:

   ```ts
   test('renders topics from a controlled API response', async ({ page }) => {
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

     await page.goto('/');

     await expect(
       page.getByRole('link', { name: 'Controlled API topic' }),
     ).toBeVisible();
     await expect(
       page.getByText('Loaded from a Playwright route.'),
     ).toBeVisible();
     await expect(page.getByText('Could not load topics')).toBeHidden();
   });
   ```

2. Keep the route registration before `page.goto('/')`.

3. Run:

   ```powershell
   npm run e2e
   ```

4. Optional experiment: temporarily move `page.route(...)` below `page.goto('/')` and predict why the controlled topic may not appear. Move it back before finishing the lesson.

## Prediction

Before running the test, predict whether `db.json` changes. Why should a fulfilled Playwright route avoid touching the local API file?

## Verify

- The controlled API test passes.
- The page renders `Controlled API topic`.
- The page does not show `Could not load topics`.
- `db.json` is unchanged.
- The test registers the route before navigation.

## Reflection

- What part of the system is real in this test?
- What part is controlled by Playwright?
- When would you choose a real `json-server` E2E test instead of a routed response?

## End-of-module checkpoint

After this lesson the project has a small Playwright E2E suite. It covers app startup, user-visible dashboard state, form submission, routing, deferred UI, and deterministic API data.
