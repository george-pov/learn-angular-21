# Lesson 05-01 Task: Create a Service With `providedIn: 'root'`

## Feature to build

Create `TopicStore` with a greeting method. Do not move dashboard state yet.

## Starting point

Before this lesson, `Dashboard` should still own the topic signal, topic form, progress computations, and topic mutation methods from Module 04.

## Files to create

- `src/app/topic-store.ts`

## Steps

1. Create `src/app/topic-store.ts`:

   ```ts
   import { Injectable } from '@angular/core';

   @Injectable({ providedIn: 'root' })
   export class TopicStore {
     getGreeting(): string {
       return 'Hello from TopicStore';
     }
   }
   ```

2. Do not import `TopicStore` anywhere yet.

3. Do not move the `topics` signal, `topicForm`, or any dashboard methods.

4. Do not add a provider record in `app.config.ts`. `providedIn: 'root'` is the provider registration for this lesson.

5. Read the file back and name the three parts:

   - The token: `TopicStore`
   - The root provider registration: `@Injectable({ providedIn: 'root' })`
   - The test method: `getGreeting()`

## Prediction

Before running the app, predict whether the UI changes. Should a service that nobody injects yet affect the page?

## Verify

- The app compiles.
- The dashboard UI is unchanged.
- `src/app/topic-store.ts` exports `TopicStore`.
- `TopicStore` is decorated with `@Injectable({ providedIn: 'root' })`.
- No dashboard state moved in this lesson.
- `app.config.ts` does not mention `TopicStore`.

## Reflection

- What does `providedIn: 'root'` tell Angular?
- Why is the service not created visibly yet?
- Why is it useful to create the injectable class before moving state into it?
