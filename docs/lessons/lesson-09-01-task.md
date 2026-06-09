# Lesson 09-01 Task: Add Playwright Test

## Feature to build

Install Playwright Test, create an `e2e` test folder, and add E2E scripts.

## Files likely to change

- `package.json`
- `package-lock.json`
- `playwright.config.ts`
- `e2e/`

## Steps

1. Run the Playwright initializer:

   ```powershell
   npm init playwright@latest
   ```

2. When prompted, choose:

   ```text
   TypeScript
   e2e
   no GitHub Actions workflow for now
   yes, install Playwright browsers
   ```

3. If the initializer creates an example test that visits an external website, delete it or keep it only temporarily. This curriculum will write project-specific tests against the Angular learning tracker.

4. Add these scripts to `package.json` if the initializer did not add equivalent scripts:

   ```json
   "e2e": "playwright test",
   "e2e:ui": "playwright test --ui",
   "e2e:headed": "playwright test --headed"
   ```

5. Verify the runner is available:

   ```powershell
   npx playwright --version
   ```

6. Do not write the first dashboard test yet. Lesson 09-02 configures the app server first.

## Prediction

Before running the initializer, predict which files should change. Why does Playwright need its own config file instead of using Angular TestBed setup?

## Verify

- `package.json` includes `@playwright/test` as a dev dependency.
- `playwright.config.ts` exists.
- An `e2e` folder exists.
- `npm run e2e` is available as a script.
- `npx playwright --version` prints a version.

## Reflection

- Why do E2E tests live outside `src/app`?
- Why is Playwright not configured through Angular TestBed?
- What kind of bug can E2E tests catch that a store unit test cannot?
