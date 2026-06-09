# Lesson 05-05 Concept: Scope a Service at the Component Level

## Goal

Create a small logger service and show that a component can provide its own service instance for its subtree.

## The single new concept

A component can define `providers`:

```ts
@Component({
  // ...
  providers: [LoggerService],
})
export class TopicDetails {}
```

That creates a provider in the component's injector. The component and its children get that local instance instead of the root instance.

## Prior knowledge assumed

- Lesson 05-01: services can be provided in root.
- Lesson 05-02: components can inject services.
- Lesson 03-04: `TopicDetails` is a routed component.

## Injector tree mental model

Angular resolves dependencies by walking up the injector tree:

1. Check the current component injector.
2. If no provider is found, check parent injectors.
3. Eventually reach the root injector.

So this:

```ts
@Injectable({ providedIn: 'root' })
export class LoggerService {}
```

creates the default app-wide provider, while this:

```ts
providers: [LoggerService]
```

creates a fresh local instance for one component subtree.

## Why use a logger?

Logging is a low-risk way to see DI scoping. It does not change topic state, routes, or form behavior. The lesson is about instance boundaries, not logging as an app feature.

## Comparison callout

This is the closest Angular equivalent to providing a different React context value for a subtree or using Vue `provide` at a component boundary. Angular's version creates service instances through providers.
