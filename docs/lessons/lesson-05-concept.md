# Lesson 5 Concept: Services, Dependency Injection, And Shared State

## Goal

Move topic state out of the dashboard component and into an injectable service.

This lesson introduces modern Angular dependency injection with `inject()`, services that own signals, and simple browser persistence with `localStorage`.

## Current project context

After Lesson 4, the dashboard should be able to:

- Display starter topics.
- Toggle topic completion.
- Reset progress.
- Add custom topics with a reactive form.

That is useful, but all topic state still lives inside `Dashboard`.

This creates a problem:

```txt
Dashboard knows about the current topics.
TopicDetails reads from INITIAL_TOPICS.
Custom topics exist only on the dashboard.
```

If the learner adds a custom topic, the dashboard can show it. But the topic details route does not share the same source of truth yet.

Lesson 5 fixes that by creating a `TopicStore` service.

## The Angular v21 concept

An Angular service is a class that can be created and shared by Angular's dependency injection system.

Basic shape:

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopicStore {}
```

`providedIn: 'root'` means Angular creates one app-wide instance of the service.

That one shared instance can be injected into route components:

```ts
import { Component, inject } from '@angular/core';
import { TopicStore } from '../topic-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly topicStore = inject(TopicStore);
}
```

`inject()` asks Angular's dependency injection system for the service instance.

## Signals inside a service

So far, the `topics` signal has lived in `Dashboard`.

In Lesson 5, the service becomes the owner of that state:

```ts
private readonly topicsSignal = signal<Topic[]>(this.loadTopics());
readonly topics = this.topicsSignal.asReadonly();
```

This gives the service a private writable signal and exposes a public read-only signal.

That is a useful habit:

```txt
The service can write.
Components can read.
Components ask the service to perform changes through methods.
```

Example methods:

```ts
toggleTopic(id: number): void {
  this.topicsSignal.update((topics) =>
    topics.map((topic) =>
      topic.id === id ? { ...topic, done: !topic.done } : topic,
    ),
  );
}

addTopic(title: string, description: string): void {
  this.topicsSignal.update((topics) => [
    ...topics,
    {
      id: Math.max(0, ...topics.map((topic) => topic.id)) + 1,
      title,
      description,
      done: false,
    },
  ]);
}
```

The component no longer needs to know how topic state is stored. It calls methods on the service.

## Computed values inside a service

Derived state can move too:

```ts
readonly completedCount = computed(
  () => this.topics().filter((topic) => topic.done).length,
);

readonly completedPercent = computed(() => {
  const total = this.topics().length;
  return total === 0 ? 0 : Math.round((this.completedCount() / total) * 100);
});
```

This keeps the dashboard thin:

```ts
protected readonly topics = this.topicStore.topics;
protected readonly completedCount = this.topicStore.completedCount;
protected readonly completedPercent = this.topicStore.completedPercent;
```

The component still reads signals with `()`, but it no longer owns them.

## Persistence with effect

Signals can be observed with an `effect()`.

In this lesson, the service can persist topics whenever they change:

```ts
constructor() {
  effect(() => {
    localStorage.setItem(this.storageKey, JSON.stringify(this.topicsSignal()));
  });
}
```

That means:

```txt
topicsSignal changes
effect runs
localStorage is updated
browser refresh can restore the topics
```

For this learning app, `localStorage` is enough. It is not a replacement for a backend API, but it demonstrates the pattern of keeping persistence close to the state owner.

## Angular v15 comparison

Angular v15 also had services and dependency injection, but you probably saw more constructor injection:

```ts
constructor(private topicStore: TopicStore) {}
```

Modern Angular often uses `inject()`:

```ts
private readonly topicStore = inject(TopicStore);
```

Both are valid Angular. `inject()` is especially convenient in standalone components, route-level components, functions, and newer Angular patterns.

The newer part of this lesson is not just the service. It is the combination:

```txt
service + signals + computed + effect + inject()
```

## React comparison

In React, shared state might move into:

- Context
- A custom hook
- Zustand
- Redux
- Another external store

An Angular service with signals plays a similar role to a small app store:

```txt
TopicStore owns state.
Components inject TopicStore.
Components read signals and call methods.
```

## Vue comparison

In Vue, shared state might move into:

- A composable
- Pinia
- A reactive singleton

`TopicStore` is conceptually close to a Pinia store for this small app. It owns state and exposes actions.

## Mental model

Before Lesson 5:

```txt
Dashboard owns topics.
TopicDetails reads starter topics.
Routes do not share live topic state.
```

After Lesson 5:

```txt
TopicStore owns topics.
Dashboard injects TopicStore.
TopicDetails injects TopicStore.
Both routes read the same state.
TopicStore persists state to localStorage.
```

## What not to do yet

Do not add HTTP in this lesson.

The service will use `localStorage` so you can learn state ownership and dependency injection first. HTTP and RxJS come later, when there is an external async data source.
