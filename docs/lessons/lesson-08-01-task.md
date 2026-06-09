# Lesson 08-01 Task: Run the Default Test Suite

## Feature to build

Run `npm test` and inspect the files that define the test setup. No app code changes in this lesson.

## Files to inspect

- `package.json`
- `angular.json`
- `tsconfig.spec.json`

## Steps

1. In `package.json`, find:

   ```json
   "test": "ng test"
   ```

2. In `angular.json`, find:

   ```json
   "builder": "@angular/build:unit-test"
   ```

3. In `tsconfig.spec.json`, find:

   ```json
   "types": ["vitest/globals"]
   ```

4. Run:

   ```powershell
   npm test
   ```

## Prediction

Before running the command, predict whether this changes the app UI. What output would tell you the tests passed?

## Verify

- `npm test` starts the Angular unit-test runner.
- The command reports passing or failing tests.
- You can identify which spec file each result belongs to.
- No source code changed in this lesson.

## Reflection

- What command actually runs when you type `npm test`?
- Where does this workspace configure its test builder?
- Why is reading failure output part of the testing workflow?
