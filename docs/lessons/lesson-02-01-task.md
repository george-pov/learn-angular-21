# Lesson 02-01 Task: Add a `Topic` Type

## Feature to build

Create a `Topic` type. No UI change.

## Files to create

- `src/app/topic.ts`

## Steps

1. Create `src/app/topic.ts` with the following contents:

   ```ts
   export type Topic = {
     id: number;
     title: string;
     done: boolean;
   };
   ```

## Prediction

After this lesson, what changes in the browser?

## Verify

- The new file exists.
- `npm run build` still succeeds.
- The browser shows the same content as after Lesson 01-06.

## Reflect

- Why is `Topic` a `type` instead of an `interface`? (For this project either works. `type` is shorter and composes nicely with unions.)
- Why does nothing change in the browser?
