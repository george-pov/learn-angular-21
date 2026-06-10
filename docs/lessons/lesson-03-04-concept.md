# Lesson 03-04 Concept: Add a Second Route

## Goal

Add a topic details page at `/topics/:id` and link each topic title to that route.

## The single new concept

Angular routes are checked in order. Each route record maps a URL pattern to the component Angular should render in the `RouterOutlet`:

```ts
export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'topics/:id', component: TopicDetails },
  { path: '**', redirectTo: '' },
];
```

The `:id` part is a route parameter. Lesson 03-05 reads it. This lesson only proves that the route exists and that a link can navigate to it.

## Prior knowledge assumed

- Lesson 03-01: `RouterOutlet` renders the active route.
- Lesson 03-02: the dashboard is registered at `/`.
- Lesson 03-03: `RouterLink` performs in-app navigation.

## Route matching mental model

The router receives a URL and tries route records from top to bottom:

```text
/             -> path ''          -> Dashboard
/topics/2     -> path topics/:id  -> TopicDetails
/anything     -> path **          -> redirect to /
```

The wildcard route belongs last. If it came first, it would match every URL before Angular had a chance to try the specific routes.

## Linking from the list

`TopicsList` already receives each topic. A topic title can become a router link:

```html
<a [routerLink]="['/topics', topic.id]">{{ topic.title }}</a>
```

The array form builds the URL segments safely. For topic id `2`, Angular navigates to `/topics/2`.

## What changes visually

The dashboard still renders at `/`. Clicking a topic title now navigates to a placeholder details page. The details page does not know which topic was clicked yet; it only proves that the route and link are wired.

## Comparison callout

React Router uses route entries and `<Link to="/topics/2">`. Vue Router uses a `routes` array and `<router-link>`. Angular's equivalent is the `Routes` array plus `RouterLink`.

## Vocabulary checkpoint

- **Route record:** one object in the `Routes` array.
- **Route parameter:** a dynamic URL segment such as `:id`.
- **Wildcard route:** the fallback route, written as `**`.
- **Router link:** an Angular directive that navigates without a full page load.
