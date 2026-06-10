# Lesson 05-01 Concept: Create a Service With `providedIn: 'root'`

## Goal

Create a root-scoped service class without moving any application state yet. The service only proves that Angular can create and share one service instance for the app.

## The single new concept

`@Injectable({ providedIn: 'root' })` registers a service with Angular's root injector:

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TopicStore {
  getGreeting(): string {
    return 'Hello from TopicStore';
  }
}
```

The root injector is the application-level dependency container. A service provided in root is created lazily when something first asks for it, then reused for later injections.

## Prior knowledge assumed

- Module 04: the dashboard owns local form and topic state.
- Lesson 03-02: `Dashboard` is the routed page component.

## Mental model

Angular DI is a lookup system. A class asks for a token, and Angular finds a provider for that token.

In this lesson, the token is the class itself:

```ts
TopicStore
```

The provider is created by this decorator:

```ts
@Injectable({ providedIn: 'root' })
```

That tells Angular:

```text
If something asks for TopicStore, the root injector knows how to create it.
```

Nothing in the template changes yet because no component has asked for the service.

## What `root` means

`root` means the service is available from the application root injector. In a normal browser app, that gives you one default app-wide instance:

- The first injection creates the instance.
- Later injections reuse the same instance.
- Components do not call `new TopicStore()`.
- The service can be overridden by a closer provider in a later lesson.

This is often called a singleton, but be precise: it is one instance per injector that provides it. Lesson 05-05 shows how a child injector can create a different instance for part of the app.

## What Angular can infer

Because the token and implementation are the same class, `providedIn: 'root'` is the compact form. You can think of it as equivalent to a root-level rule like this:

```ts
{ provide: TopicStore, useClass: TopicStore }
```

You do not write that provider record in this lesson because `providedIn: 'root'` is the idiomatic service registration for a root service.

Later lessons make provider records explicit when the token and implementation are not the same thing.

## Why no state moves yet?

This lesson isolates one question: how does a class become injectable?

The dashboard still owns:

- `topics`
- `topicForm`
- the Signal Forms submission action
- `toggleTopic`
- progress computations

Moving state into the service happens in Lesson 05-03. Keeping this first service empty avoids mixing "create a service" with "redesign state ownership."

## Why use `@Injectable`

This curriculum uses `@Injectable` because it is the stable Angular service decorator that Angular v15 learners already know, and because later lessons use advanced provider records such as `useClass`, `useValue`, and `useFactory`.

The decorator also gives Angular compile-time metadata for the service. You can still write ordinary TypeScript methods and fields inside the class. The Angular-specific part is how the instance is created and shared.

## What a service is not

A service is not automatically global state. This first `TopicStore` has no state at all:

```ts
getGreeting(): string {
  return 'Hello from TopicStore';
}
```

The service becomes a state owner only when Lesson 05-03 moves the topic signal into it.

## Common mistakes

Do not import the service into a file and expect that to create it. Imports make TypeScript names available; injection creates instances.

Do not instantiate the service manually:

```ts
// Avoid this in Angular component code.
const store = new TopicStore();
```

Manual construction skips Angular's injector. That means provider overrides, injected dependencies, and lifecycle integration cannot participate.

Do not move the topic array in this lesson. The learner should see that service registration alone has no visible effect.

## How to read the finished file

After this task, `topic-store.ts` should be boring:

- one import from `@angular/core`
- one decorator
- one exported class
- one method returning a string

That boring shape is intentional. It gives the learner a clean checkpoint before the service starts owning state.

## Comparison callout

In Angular v15, `@Injectable({ providedIn: 'root' })` was already common, though examples often paired it with constructor injection. React does not have services built into the framework. Vue can provide values, but Angular services are class-based and created by the injector.

## Vocabulary checkpoint

- **Service:** a class that holds reusable logic or state.
- **Token:** the thing a consumer asks Angular for.
- **Provider:** the rule that tells Angular how to satisfy a token.
- **Root injector:** the application-level injector.
