# Lesson 05-09 Concept: Persist State With `effect`

## Goal

Persist the topic list to `localStorage` whenever the store's topic signal changes, then load that saved state on refresh.

## The single new concept

`effect()` runs a side effect whenever the signals it reads change:

```ts
constructor() {
  effect(() => {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.topicsSignal()),
    );
  });
}
```

The effect reads `this.topicsSignal()`. That read creates the dependency. When `topicsSignal` changes, Angular runs the effect again.

## Prior knowledge assumed

- Lesson 01-04: computed signals track dependencies by reading signals.
- Lesson 05-03: `TopicStore` owns the writable `topicsSignal`.
- Lesson 05-07: `TopicStore` injects `STORAGE_KEY`.

## When to use `effect`

Use `computed()` for derived state:

```ts
readonly totalCount = computed(() => this.topicsSignal().length);
```

Use `effect()` to synchronize signal state with something outside Angular's signal graph:

```ts
localStorage.setItem(...)
```

Persistence is a side effect. It does not produce a value for the template; it writes to an external browser API.

## Load before persisting

The store should initialize from saved data first:

```ts
readonly storageKey = inject(STORAGE_KEY);
private readonly topicsSignal = signal<Topic[]>(this.loadTopics());
```

Then the constructor effect keeps storage updated after that.

## Comparison callout

React learners can compare this with `useEffect` writing to `localStorage` when state changes. Vue learners can compare it with `watchEffect`. Angular's `effect()` is tied to signals and can run inside an injection context such as a service constructor.
