# Lesson 05-07 Concept: Provide a Plain Value With `useValue`

## Goal

Provide a configuration value through DI instead of hardcoding it inside a service.

## The single new concept

`InjectionToken` gives non-class values a DI token:

```ts
export const STORAGE_KEY = new InjectionToken<string>('STORAGE_KEY');
```

`useValue` provides the concrete value:

```ts
{ provide: STORAGE_KEY, useValue: 'learn-angular-21-topics' }
```

The service injects the token:

```ts
private readonly storageKey = inject(STORAGE_KEY);
```

## Prior knowledge assumed

- Lesson 05-02: `inject()` can read DI tokens.
- Lesson 05-06: providers map tokens to concrete things.

## Why classes do not work for plain values

Classes can be DI tokens because Angular can use the class itself as the token. A string cannot safely be a token:

```ts
// Not a good DI token.
'storage-key'
```

Many strings can have the same value. `InjectionToken<string>` creates a unique token with a readable debug name.

## Why add this before persistence?

Lesson 05-09 will persist topics to `localStorage`. This lesson sets up the configuration value first, while the single concept is still just "provide a value." The store can expose the injected key as a small diagnostic so the learner can verify it without persistence yet.

## Comparison callout

Angular v15 used `InjectionToken` and `useValue` too. React and Vue usually pass configuration through context, plugin setup, or imports. Angular's DI token keeps the value swappable without importing a hardcoded constant everywhere.
