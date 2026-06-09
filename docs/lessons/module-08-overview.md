# Module 08 Overview: Testing

## Topic area

Write focused behavior tests for the final app shape.

## Prior modules

Modules 01-07.

The learner should already understand the dashboard, the topic store, Angular forms, HTTP registration, and the deferred topic notes panel. This module does not add user-facing features. It adds confidence around the features already built.

## Angular v15, React, and Vue framing

Angular v15 TestBed concepts still apply: configure a testing module, create a fixture, run change detection, and assert against the result. The main project-specific difference is the runner setup. This workspace uses the current Angular unit-test builder with Vitest globals, so specs use `describe`, `it`, and `expect` without Jasmine imports.

React Testing Library users should recognize the emphasis on rendered DOM behavior. Vue Test Utils users should recognize the idea of a mounted component wrapper. Angular's fixture is similar in purpose, but Angular tests must be explicit about `detectChanges()` when the template needs to update.

## Testing strategy for this module

Use two boundaries:

- Component tests for `Dashboard`: render the page, query DOM text, and simulate form events. These tests use a fake `TopicStore` so the dashboard tests do not depend on `json-server`.
- Store tests for `TopicStore`: inject the real store and assert signal-derived state. These tests use Angular HTTP testing providers so they do not make real network requests.

This split keeps each test small. Component tests ask what the user can see and do. Store tests ask whether the state owner computes and updates correctly.

## Module note

This module links to [docs/build-and-production.md](../build-and-production.md) for production-build reference reading.

## Micro-lessons

- 08-01 Run the default test suite: `npm test` and how to read the runner output.
- 08-02 Render a component in a test: `TestBed.configureTestingModule` and `createComponent`.
- 08-03 Query and assert text content: `fixture.nativeElement.querySelector` and `textContent`.
- 08-04 Simulate form input and submit: dispatching DOM events and `detectChanges()`.
- 08-05 Test a signal-driven computed: testing an injectable store directly.

## End-of-module shape

By the end of Module 08, the project has tests for dashboard rendering, progress text, form submission behavior, and store computed state. The tests can run without starting the local API.
