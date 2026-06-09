# Lesson 05-03 Concept: Move a Signal Into the Service

## Goal

Move the topic array signal and topic mutations out of `Dashboard` and into `TopicStore`. The UI should behave the same, but state ownership changes.

## The single new concept

A service can own writable signal state and expose a readonly signal to components:

```ts
@Injectable({ providedIn: 'root' })
export class TopicStore {
  private readonly topicsSignal = signal<Topic[]>(SEED_TOPICS);

  readonly topics = this.topicsSignal.asReadonly();

  toggleTopic(id: number): void {
    this.topicsSignal.update((current) =>
      current.map((topic) =>
        topic.id === id ? { ...topic, done: !topic.done } : topic,
      ),
    );
  }
}
```

The private writable signal protects the update path. Components can read `store.topics()`, but they cannot call `set()` or `update()` on it.

## Prior knowledge assumed

- Lesson 02-03: immutable updates to an array signal.
- Lesson 04-08: the dashboard Signal Forms submission action appends new topics.
- Lesson 05-02: `Dashboard` can inject `TopicStore`.

## Mental model

The service becomes the owner of topic data. Components become consumers of that data.

```text
Dashboard event -> store method -> private writable signal -> readonly signal -> template
```

That direction matters. The component sends actions to the store. The store decides how state changes.

## State ownership shift

Before this lesson:

- `Dashboard` owns `topics`.
- `Dashboard` owns `toggleTopic`.
- `Dashboard` owns the append logic inside the form submission action.

After this lesson:

- `TopicStore` owns `topics`.
- `TopicStore` owns `toggleTopic`.
- `TopicStore` owns `addTopic`.
- `Dashboard` owns only the form and calls store methods.

The visual result should be unchanged. The architectural result is important: topic state now has one injectable owner.

## Why expose a readonly signal

The store keeps the writable signal private:

```ts
private readonly topicsSignal = signal<Topic[]>(SEED_TOPICS);
```

Then it exposes a readonly signal:

```ts
readonly topics = this.topicsSignal.asReadonly();
```

That lets templates and components read the current value:

```html
<app-topics-list [topics]="store.topics()" />
```

But only the store can write:

```ts
toggleTopic(id: number): void {
  this.topicsSignal.update(...);
}
```

This keeps update rules in one place. If every component could call `store.topics.set(...)`, the app would have many competing mutation paths.

## Why the form stays in `Dashboard`

The form is still view-specific state:

- Which fields are touched.
- Whether the form is valid.
- What the user typed before submitting.

The store only needs the final data that changes the topic list:

```ts
this.store.addTopic(value.title, value.description);
```

With Signal Forms, that call lives inside the `submission.action` function. The form model, touched state, errors, and submitting flag still stay in `Dashboard`; the store receives only the final domain command.

That split keeps the service focused on topic state, not form UI state.

## Why use methods instead of exposing setters

Store methods describe intent:

- `toggleTopic(id)`
- `addTopic(title, description)`

Those method names are more useful than a generic `setTopics(...)` because they tell future readers what the app is allowed to do to the topic list.

They also give the store one place to protect invariants. For example, `addTopic()` can decide how ids are assigned and can ensure every new topic starts with `done: false`.

If a later lesson changes storage or HTTP behavior, the component can keep calling the same method name.

## How the template changes

Before this lesson, the dashboard might pass its own signal value:

```html
<app-topics-list [topics]="topics()" />
```

After the move, the dashboard reads through the injected store:

```html
<app-topics-list [topics]="store.topics()" />
```

That is the visible code clue that the owner changed. The child component still receives a normal `Topic[]`.

## What does not move yet

Derived values such as `completedCount` and `progressLabel` may still live in `Dashboard` for this lesson. They move in Lesson 05-04.

This keeps Lesson 05-03 focused on writable state ownership.

## Comparison callout

This is similar to moving React state from a page component into a context provider or moving Vue state into a Pinia store. In Angular, the root-provided service is the shared owner, and signals keep the UI reactive without introducing RxJS yet.

## Vocabulary checkpoint

- **Writable signal:** the private source of truth that can be changed.
- **Readonly signal:** a read-only view of the same reactive value.
- **State owner:** the class responsible for changing a piece of state.
- **Consumer:** a component that reads state and calls owner methods.
