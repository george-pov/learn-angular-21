# Lesson 03-01 Task: Add `<router-outlet />` to App

## Feature to build

Wire `RouterOutlet` into `App`. The dashboard UI stays where it is. The outlet exists but renders nothing yet.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app.ts`, add `RouterOutlet` to the imports list:

   ```ts
   import { RouterOutlet } from '@angular/router';

   @Component({
     selector: 'app-root',
     templateUrl: './app.html',
     styleUrl: './app.scss',
     imports: [TopicsList, RouterOutlet],
   })
   ```

2. In `app.html`, add the outlet at the very bottom:

   ```html
   <!-- existing content unchanged -->
   <p>You typed: {{ currentTitle() }}</p>

   <router-outlet />
   ```

## Prediction

What will the page show? Will anything new appear?

## Verify

- The page looks identical to the end of Module 02.
- DevTools elements panel shows a `<router-outlet>` element with no rendered siblings.
- No errors in the console.

## Reflect

- Why is no UI added when `<router-outlet />` is wired?
- What is the role of `app.routes.ts` being empty?
- Why is `RouterOutlet` listed in `imports` even though it does nothing visible yet?
