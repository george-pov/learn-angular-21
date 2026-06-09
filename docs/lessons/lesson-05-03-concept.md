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
- Lesson 04-06: the dashboard form appends new topics.
- Lesson 05-02: `Dashboard` can inject `TopicStore`.

## State ownership shift

Before this lesson:

- `Dashboard` owns `topics`.
- `Dashboard` owns `toggleTopic`.
- `Dashboard` owns the append logic in `addTopic`.

After this lesson:

- `TopicStore` owns `topics`.
- `TopicStore` owns `toggleTopic`.
- `TopicStore` owns `addTopic`.
- `Dashboard` owns only the form and calls store methods.

The visual result should be unchanged. The architectural result is important: topic state now has one injectable owner.

## Comparison callout

This is similar to moving React state from a page component into a context provider or moving Vue state into a Pinia store. In Angular, the root-provided service is the shared owner, and signals keep the UI reactive without introducing RxJS yet.
