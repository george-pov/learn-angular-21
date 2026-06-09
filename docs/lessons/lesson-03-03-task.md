# Lesson 03-03 Task: Add a Header With a `RouterLink`

## Feature to build

A simple header above `<router-outlet />` with a "Dashboard" link.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app.ts`, add `RouterLink` to the imports:

   ```ts
   import { RouterLink, RouterOutlet } from '@angular/router';

   @Component({
     selector: 'app-root',
     templateUrl: './app.html',
     styleUrl: './app.scss',
     imports: [RouterOutlet, RouterLink],
   })
   export class App {}
   ```

2. In `app.html`, add a header above the outlet:

   ```html
   <header>
     <a routerLink="/">Dashboard</a>
   </header>

   <router-outlet />
   ```

## Prediction

What happens when you click the "Dashboard" link from `/`? Will the page reload?

## Verify

- The header is visible above the dashboard UI on every page.
- Clicking "Dashboard" while on `/` does not cause a visible reload.
- The DevTools Network tab shows no full document fetch on click.

## Reflect

- What would happen if you used `<a href="/">` instead?
- Why is `RouterLink` listed in the component's `imports`?
- How does this compare with React Router's `<Link to="/">`?
