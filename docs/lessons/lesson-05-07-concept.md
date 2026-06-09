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

## Mental model

Not every dependency is a class. Sometimes a service needs a plain value:

- a storage key
- an API base URL
- a feature flag
- a formatting option

Angular still needs a token for that value. `InjectionToken<T>` creates one.

## Why classes do not work for plain values

Classes can be DI tokens because Angular can use the class itself as the token. A string cannot safely be a token:

```ts
// Not a good DI token.
'storage-key'
```

Many strings can have the same value. `InjectionToken<string>` creates a unique token with a readable debug name.

The debug name is not the injected value:

```ts
new InjectionToken<string>('STORAGE_KEY')
```

`'STORAGE_KEY'` helps with debugging. The provided value comes from the provider record:

```ts
{ provide: STORAGE_KEY, useValue: 'learn-angular-21-topics' }
```

## Why use `useValue`

Use `useValue` when the value already exists:

```ts
{ provide: STORAGE_KEY, useValue: 'learn-angular-21-topics' }
```

Angular does not call a function or instantiate a class. It returns that exact value for the token.

That is different from `useClass`, which creates an instance:

```ts
{ provide: Logger, useClass: ConsoleLogger }
```

Lesson 05-08 introduces `useFactory` for values that need to be computed.

## Why add this before persistence?

Lesson 05-09 will persist topics to `localStorage`. This lesson sets up the configuration value first, while the single concept is still just "provide a value." The store can expose the injected key as a small diagnostic so the learner can verify it without persistence yet.

## Why inject configuration

Hardcoding the storage key inside `TopicStore` would work:

```ts
private readonly storageKey = 'learn-angular-21-topics';
```

Injecting it has two teaching benefits:

- It shows that DI is for values, not only services.
- It makes the store depend on a token rather than a hardcoded environment detail.

In a real app, this same pattern can support tests, environment-specific values, or route-specific overrides.

## Type safety boundary

The generic type tells TypeScript what consumers receive:

```ts
export const STORAGE_KEY = new InjectionToken<string>('STORAGE_KEY');
```

Then this injection is typed as `string`:

```ts
readonly storageKey = inject(STORAGE_KEY);
```

The type parameter helps at compile time. It does not validate a runtime provider value by itself, so the provider should still supply the right kind of value.

## Why put tokens in `app-tokens.ts`

The token is shared by the provider and the consumer:

- `app.config.ts` provides `STORAGE_KEY`.
- `topic-store.ts` injects `STORAGE_KEY`.

Putting shared tokens in a small token file keeps both sides importing the same runtime token. Recreating a new token with the same debug name in another file would not work because it would be a different token object.

## Comparison callout

Angular v15 used `InjectionToken` and `useValue` too. React and Vue usually pass configuration through context, plugin setup, or imports. Angular's DI token keeps the value swappable without importing a hardcoded constant everywhere.

## Vocabulary checkpoint

- **`InjectionToken<T>`:** a runtime token for a typed non-class dependency.
- **`useValue`:** a provider strategy that returns a fixed value.
- **Configuration dependency:** a value a class needs but should not hardcode.
