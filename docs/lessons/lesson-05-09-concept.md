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

## Mental model

`computed()` returns a value. `effect()` connects signal state to something outside the signal graph.

```text
topicsSignal changes -> effect runs -> localStorage is updated
```

`localStorage` is not an Angular signal. Angular cannot derive it automatically. The effect is the bridge.

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

Use effects sparingly. If the code is only calculating another value from signals, use `computed()`. If the code is synchronizing with an external API such as `localStorage`, console logging, canvas drawing, or an analytics call, an effect can be appropriate.

## Load before persisting

The store should initialize from saved data first:

```ts
readonly storageKey = inject(STORAGE_KEY);
private readonly topicsSignal = signal<Topic[]>(this.loadTopics());
```

Then the constructor effect keeps storage updated after that.

Field order matters because `loadTopics()` reads `this.storageKey`. Declare the injected storage key before the signal:

```ts
readonly storageKey = inject(STORAGE_KEY);
private readonly topicsSignal = signal<Topic[]>(this.loadTopics());
```

If the signal field came first, `loadTopics()` would run before `storageKey` was initialized.

## Why the effect goes in the service

`TopicStore` owns `topicsSignal`, so it also owns persistence for that signal. Components should not need to know where topics are saved.

This keeps `Dashboard` focused on UI work:

- form validity
- submit events
- rendering store state

The store handles topic state and the side effect that keeps that state in browser storage.

## First run behavior

An effect runs at least once so Angular can discover which signals it reads. In this lesson, that first run writes the current topic list to storage.

That is why the load step must happen before the effect is registered. Otherwise the first effect run could overwrite saved topics with the seed topics.

## Injection context

This effect is registered inside an injectable service:

```ts
constructor() {
  effect(() => {
    localStorage.setItem(this.storageKey, JSON.stringify(this.topicsSignal()));
  });
}
```

That constructor runs while Angular is creating `TopicStore`, so an injection context is available. This is the simplest place for the learner to create the effect.

Do not move this effect into a random utility function. It needs access to the store's signal and to Angular's reactive context.

## Minimal error handling

`localStorage` stores strings, so the topic array must be serialized:

```ts
JSON.stringify(this.topicsSignal())
```

Loading must parse that string:

```ts
JSON.parse(raw)
```

The task catches invalid JSON and falls back to `SEED_TOPICS`. That is enough for this lesson. Full runtime validation would add another concept and is not needed before Module 06.

## Browser-only note

This learning app runs in the browser. `localStorage` is a browser API. Do not add server-side rendering guards in this lesson; that would distract from the signal effect concept.

## Comparison callout

React learners can compare this with `useEffect` writing to `localStorage` when state changes. Vue learners can compare it with `watchEffect`. Angular's `effect()` is tied to signals and can run inside an injection context such as a service constructor.

## Vocabulary checkpoint

- **Effect:** a reactive side-effect function that tracks signal reads.
- **External side effect:** work outside Angular's signal graph.
- **Serialization:** converting a value to a string for storage.
- **Saved-state load:** reading persisted state before the app starts using it.
