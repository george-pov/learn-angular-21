# Lesson 09-01 Concept: Add Playwright Test

## Goal

Add an end-to-end test runner to the project without writing a browser workflow yet.

## The single new concept

An E2E test runs outside Angular TestBed. It controls a browser and interacts with the app through the rendered page:

```ts
import { expect, test } from '@playwright/test';

test('opens the app', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toBeVisible();
});
```

The `page` fixture is a Playwright browser page. It is not an Angular fixture and it does not expose component instances.

## Prior knowledge assumed

- Module 08: component and store tests use TestBed and Vitest globals.
- Basic `npm` command workflow.

## Unit test boundary versus E2E boundary

Module 08 tests answer smaller questions:

- Can `Dashboard` render with a fake store?
- Does `TopicStore.completedCount()` update?
- Does a component react to a simulated DOM event?

Module 09 tests answer broader questions:

- Can the browser load the app?
- Does the router display the expected page?
- Can a user fill the form and see the result?
- Does deferred UI appear after interaction?

Both layers matter. E2E tests are not a replacement for unit tests because they are slower, broader, and harder to diagnose. Unit tests are not a replacement for E2E tests because they do not prove the app works as a whole in a browser.

## Why Playwright

Playwright is framework-agnostic. The same runner can test Angular, React, Vue, or a server-rendered app. That makes it a good tool for learning the browser workflow boundary without adding Angular-specific E2E concepts.

For this project, Playwright gives us:

- a test runner
- TypeScript test files
- browser automation
- accessible locators such as `getByRole`
- assertions that wait for UI state
- a `webServer` option for starting `npm start`
- network routing for deterministic API responses

## What gets installed

The setup command adds Playwright packages, creates a config file, creates an E2E test folder, and can install browser binaries.

The test files are separate from Angular unit specs:

```text
src/app/dashboard/dashboard.spec.ts  -> Angular unit/component test
e2e/dashboard.spec.ts                -> Playwright browser test
```

Keeping those folders separate makes the test boundary obvious.

## What not to test yet

Do not write a full dashboard workflow in this lesson. The first task is just setup:

- install Playwright Test
- create the E2E folder
- add scripts
- verify the runner is available

The first real browser assertion arrives in Lesson 09-02.

## Comparison callout

Angular v15 learners may remember Protractor. This module does not use Protractor. Playwright controls the browser from outside Angular, so it does not depend on Angular-specific test hooks.

## Vocabulary checkpoint

- **E2E test:** a test that drives the app through a browser-level user workflow.
- **Runner:** the tool that finds and executes test files.
- **Page fixture:** Playwright's object for one isolated browser page.
- **Browser context:** an isolated browser profile used for a test.
