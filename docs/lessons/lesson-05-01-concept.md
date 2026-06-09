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

## Why no state moves yet?

This lesson isolates one question: how does a class become injectable?

The dashboard still owns:

- `topics`
- `topicForm`
- `addTopic`
- `toggleTopic`
- progress computations

Moving state into the service happens in Lesson 05-03. Keeping this first service empty avoids mixing "create a service" with "redesign state ownership."

## Root scope mental model

Think of `providedIn: 'root'` as saying:

```ts
// Angular can create this when any component asks for TopicStore.
// The default instance belongs to the whole app.
```

That does not make the service global mutable state by itself. It only defines where Angular should get the instance from.

## Comparison callout

In Angular v15, `@Injectable({ providedIn: 'root' })` was already common, though examples often paired it with constructor injection. React does not have services built into the framework. Vue can provide values, but Angular services are class-based and created by the injector.
