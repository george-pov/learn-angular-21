# Module 09 Overview: End-to-End Testing

## Topic area

Test the working Angular app through a real browser with Playwright.

## Prior modules

Modules 01-08.

The learner should already understand the dashboard, routes, forms, HTTP-backed store, deferred notes panel, and the difference between component tests and store tests.

## Angular v15, React, and Vue framing

Angular v15 projects often used Protractor for E2E testing, but Protractor is no longer the modern default path. Playwright is framework-agnostic: it does not know or care whether the app is Angular, React, or Vue. It opens a browser, navigates to a URL, interacts with the page, and asserts what a user can observe.

React and Vue learners can treat this module the same way. Unit tests exercise components or stores in isolation. E2E tests exercise user workflows through a real browser.

## Module mental model

An E2E test asks:

```text
Can a user complete this workflow in the app that the browser actually loads?
```

That boundary is larger than a component test:

- the app is served by the dev server
- the router handles real browser URLs
- Angular forms receive real browser events
- deferred views render after real interaction
- HTTP calls either hit a deliberate API or a deliberate test-controlled response

This module uses Playwright as the example tool because it provides a test runner, browser automation, locators, web-first assertions, a dev-server hook, and network control.

## Testing strategy for this module

Use small browser workflows:

- load the dashboard
- assert user-visible state
- toggle or submit through the page
- navigate to details
- open deferred notes
- control API data when the test needs deterministic backend state

Do not use Playwright to retest every store method from Module 08. E2E tests are slower and broader. Keep them focused on confidence that the app wiring works in the browser.

## Module note

Lessons 09-02 through 09-05 assume `npm run api` is not already running. The app falls back to local seed data when the local API is unavailable, which keeps the first E2E tests simple and avoids mutating `db.json`.

Lesson 09-06 introduces explicit API control with Playwright request routing.

## Micro-lessons

- 09-01 Add Playwright Test: install the E2E runner and add scripts.
- 09-02 Launch the app for E2E tests: configure `webServer`, `baseURL`, and a smoke test.
- 09-03 Use locators and web-first assertions: query the page like a user and wait for expected state.
- 09-04 Test a form workflow: fill and submit the real dashboard form.
- 09-05 Test routing and deferred UI: navigate to details and open deferred notes.
- 09-06 Control the API boundary: mock the topics API response with Playwright routing.

## End-of-module shape

By the end of Module 09, the project has an `e2e` folder, Playwright scripts, a Playwright config that can start the Angular dev server, and a small E2E suite covering the app's most important browser workflows.
