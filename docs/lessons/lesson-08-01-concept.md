# Lesson 08-01 Concept: Run the Default Test Suite

## Goal

Run the project's unit test command and learn what the Angular test runner is doing.

## The single new concept

This workspace runs tests through the Angular CLI:

```powershell
npm test
```

`package.json` maps that command to:

```json
"test": "ng test"
```

`angular.json` configures the test target with Angular's unit-test builder:

```json
"test": {
  "builder": "@angular/build:unit-test"
}
```

`tsconfig.spec.json` includes Vitest globals:

```json
"types": ["vitest/globals"]
```

That is why spec files can use `describe`, `it`, and `expect` without importing those names.

## Prior knowledge assumed

- Lesson 07-02: the final app behavior is in place.
- Basic `npm` command workflow.

## What the command proves

`npm test` does not prove the app is production-ready. It proves the unit-test suite can compile and run, and that each current assertion passes.

A useful test run tells you:

- how many spec files ran
- how many tests passed or failed
- which assertion failed, if any
- which file and line to inspect next

Reading failure output is part of the testing skill. Do not treat the runner as a black box.

## Angular v15 comparison

Many Angular v15 projects used Karma and Jasmine by default. This workspace uses the current Angular unit-test builder with Vitest globals. TestBed is still the Angular testing mental model, but the runner output and globals may look different from older Angular projects.
