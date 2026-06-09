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

## Mental model

Angular does not have only one injector. It has a hierarchy of injectors.

For this lesson, think about three places:

```text
Root injector
  App shell
    Dashboard route component
    TopicDetails route component
```

`@Injectable({ providedIn: 'root' })` registers the default provider at the root. A component `providers` array registers a closer provider for that component subtree.

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

## Nearest provider wins

If `Dashboard` injects `LoggerService`, Angular does not find a local dashboard provider, so it keeps walking and finds the root provider.

If `TopicDetails` injects `LoggerService`, Angular finds the provider listed on `TopicDetails` first. It uses that provider and stops looking.

The root provider still exists. It is not deleted or changed. It is just hidden from `TopicDetails` by a closer provider for the same token.

## Provider shorthand

This component provider:

```ts
providers: [LoggerService]
```

is shorthand for:

```ts
providers: [{ provide: LoggerService, useClass: LoggerService }]
```

The token and implementation are the same class. Lesson 05-06 expands this idea by making the token and implementation different.

## Instance lifetime

A root-provided service instance can be reused across the app.

A component-provided service instance belongs to that component instance and its child view. If Angular creates another instance of that component later, the component-level provider can create another logger instance.

That is why the lesson uses a logger with an `instanceId`. The id makes invisible injector behavior visible without changing the app's topic data.

## Why use a logger?

Logging is a low-risk way to see DI scoping. It does not change topic state, routes, or form behavior. The lesson is about instance boundaries, not logging as an app feature.

Do not use `TopicStore` for this lesson. If `TopicDetails` locally provided `TopicStore`, it would create a second topic store and the learner would have to reason about duplicate application state. A logger is safer because duplicate logger instances are expected.

## Route component note

`TopicDetails` is a routed component, but the provider rule is not router-specific. The same `providers` array works on any component.

The route makes the behavior easy to observe because the learner can navigate between dashboard and details and compare the logger labels.

## What this lesson does not teach yet

This lesson still injects the concrete class:

```ts
inject(LoggerService)
```

Lesson 05-06 introduces a separate token named `Logger` so components can ask for an abstraction instead of a concrete class.

## Comparison callout

This is the closest Angular equivalent to providing a different React context value for a subtree or using Vue `provide` at a component boundary. Angular's version creates service instances through providers.

## Vocabulary checkpoint

- **Component provider:** a provider registered in a component's `providers` array.
- **Child injector:** the injector created for a component boundary.
- **Nearest provider:** the first matching provider found while walking upward.
- **Subtree:** the component and child components below the provider boundary.
