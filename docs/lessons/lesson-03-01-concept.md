# Lesson 03-01 Concept: Add an Empty Router Outlet

## Goal

Render `<router-outlet />` inside `App`. The current dashboard UI stays where it is for now. Nothing changes visibly except an invisible router slot at the bottom.

## The single new concept

`RouterOutlet` is a standalone component from `@angular/router` that marks a slot in the template. The router renders the active route's component into that slot.

```ts
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [TopicsList, RouterOutlet],
})
export class App { /* unchanged */ }
```

```html
<!-- existing dashboard markup ... -->
<router-outlet />
```

Because `app.routes.ts` is still an empty array, no route matches, and the outlet stays empty. That is fine. This lesson is wiring only.

## Prior knowledge assumed

- Lesson 02-04: `imports: [...]` on a standalone component.

## Why split this from the next lesson?

Adding `<router-outlet />` and *also* moving the dashboard into a routed component would mix two new ideas into one step. This lesson lands the outlet without changing what the user sees. Lesson 03-02 moves the dashboard into the outlet.

## What about `provideRouter`?

It is already wired in `app.config.ts` from the original `ng new` scaffold:

```ts
provideRouter(routes)
```

The empty `routes` array means there is nothing to route to yet. Same as a React app with no `<Route>` children.
