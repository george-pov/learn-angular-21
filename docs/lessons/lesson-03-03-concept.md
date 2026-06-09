# Lesson 03-03 Concept: Navigate With `RouterLink`

## Goal

Add a header to `App` with a "Dashboard" link. Clicking it navigates to `/` *without a full page reload*.

## The single new concept

`routerLink` (the directive from `@angular/router`) tells Angular to intercept the click and update the route inside the SPA:

```html
<header>
  <a routerLink="/">Dashboard</a>
</header>
<router-outlet />
```

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

Two forms:

- `routerLink="/"` — string form, for a static path.
- `[routerLink]="['/topics', topic.id]"` — array form, for paths built from values. Lesson 03-04 uses this.

## Prior knowledge assumed

- Lesson 03-02: a working route.

## Why not just use `href`?

`<a href="/">Dashboard</a>` would cause a full browser navigation: tear down the Angular app, fetch `index.html`, rebuild everything. `routerLink` calls `Router.navigate(...)` internally, which only swaps what is inside `<router-outlet />`.

The user-visible difference is real: with `routerLink` the existing component state (like a typed-but-unsubmitted form) survives navigation; with `href` it does not.

## Comparison callout

`routerLink` is React Router's `<Link to=...>` or Vue Router's `<router-link>`. Same job, slightly different syntax.
