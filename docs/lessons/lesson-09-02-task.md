# Lesson 09-02 Task: Launch the App for E2E Tests

## Feature to build

Configure Playwright to start the Angular dev server and write a dashboard smoke test.

## Files to edit

- `playwright.config.ts`
- `e2e/dashboard.spec.ts`

## Steps

1. Update `playwright.config.ts` so it uses the `e2e` folder, starts Angular, and sets `baseURL`:

   ```ts
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './e2e',
     webServer: {
       command: 'npm start -- --port 4200',
       url: 'http://localhost:4200',
       reuseExistingServer: !process.env.CI,
       timeout: 120 * 1000,
     },
     use: {
       baseURL: 'http://localhost:4200',
       trace: 'on-first-retry',
     },
     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] },
       },
     ],
   });
   ```

   If the initializer generated a larger config, keep any useful generated settings, but make sure the properties above exist.

2. Create `e2e/dashboard.spec.ts`:

   ```ts
   import { expect, test } from '@playwright/test';

   test('opens the dashboard', async ({ page }) => {
     await page.goto('/');

     await expect(page.getByRole('heading', { name: 'Angular 22 Learning Tracker' })).toBeVisible();
   });
   ```

3. Make sure `npm run api` is not running for this lesson.

4. Run the E2E suite:

   ```powershell
   npm run e2e
   ```

## Prediction

Before running the test, predict what happens if the `webServer.url` port does not match the port in the command.

## Verify

- `npm run e2e` starts the Angular dev server if it is not already running.
- The dashboard smoke test passes.
- The test uses `page.goto('/')`, not a hardcoded full URL.
- The assertion uses a visible heading.
- No Angular component code changed.

## Reflection

- Why is `webServer` useful for a repeatable E2E command?
- Why does `baseURL` make the test easier to read?
- What does this smoke test prove, and what does it not prove?
