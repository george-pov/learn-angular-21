# Lesson 03-05 Concept: Read a Route Param Via Signal Input

## Goal

Read the `id` route parameter on the topic details page without injecting `ActivatedRoute`.

## The single new concept

`withComponentInputBinding()` lets Angular bind route parameters to component inputs with matching names:

```ts
provideRouter(routes, withComponentInputBinding())
```

Then the details component can declare a signal input:

```ts
readonly id = input.required<string>();
```

For `/topics/2`, Angular writes `"2"` into the `id` input.

## Prior knowledge assumed

- Lesson 03-04: `/topics/:id` is registered.
- Lesson 02-05: `input.required<T>()` creates a signal input.

## Mental model

The route pattern names the parameter:

```ts
{ path: 'topics/:id', component: TopicDetails }
```

The component declares an input with the same name:

```ts
readonly id = input.required<string>();
```

The router connects them:

```text
/topics/2 -> id input receives "2" -> template reads id()
```

The value is a string because URL segments are strings.

## Why this is useful

Angular v15 examples often used `ActivatedRoute` and subscribed to `params` or `paramMap`. That still works, but route input binding removes boilerplate for the common case where the component only needs a route parameter as input state.

The resulting `id` is a signal input, so templates read it with `id()` and computed values can depend on it later.

## Comparison callout

React Router's `useParams()` returns route params from a hook. Vue Router's `useRoute().params` reads them from the current route object. Angular's route input binding pushes the param into the component's input API instead.

## Vocabulary checkpoint

- **Route input binding:** router feature that maps route data and params to component inputs.
- **Signal input:** an input read with `()`.
- **URL segment:** one part of a URL path, such as `2` in `/topics/2`.
