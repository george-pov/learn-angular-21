# Lesson 05-08 Concept: Build a Value With `useFactory`

## Goal

Provide a value that is computed when Angular creates the provider value, then render it in the app shell footer.

## The single new concept

`useFactory` provides a value by calling a function:

```ts
{
  provide: APP_BUILD_LABEL,
  useFactory: () => `built-at-${new Date().toISOString()}`,
}
```

Use `useValue` when the value is already known. Use `useFactory` when Angular should compute the value.

## Prior knowledge assumed

- Lesson 05-07: `InjectionToken` and `useValue`.
- Lesson 05-02: components can inject token values.
- Lesson 03-03: `App` is the shell around the routed page.

## `useValue` versus `useFactory`

`useValue`:

```ts
{ provide: STORAGE_KEY, useValue: 'learn-angular-21-topics' }
```

The value is fixed in the provider record.

`useFactory`:

```ts
{ provide: APP_BUILD_LABEL, useFactory: () => `built-at-${new Date().toISOString()}` }
```

Angular calls the factory to obtain the value. The token consumer does not know or care how the value was made.

## Comparison callout

Angular v15 also supported factory providers. React and Vue often compute setup values directly in app initialization. Angular lets that setup participate in DI so components can inject the result by token.
