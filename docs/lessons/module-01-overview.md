# Module 01: Components, Signals, and Templates

## Topic

The mental model for modern Angular component code, using only primitive reactive state. By the end of the module the `App` component renders a tracker page with a counter, derived progress text, conditional messaging, and a live text echo — all without arrays, child components, or routing.

## Prior modules required

None. Module 01 starts from the minimal Angular shell described in [docs/angular-21-teaching-plan.md](../angular-21-teaching-plan.md#starting-state).

## Angular v15 comparison

In Angular v15 a component looked similar on the outside, but several things were different in practice:

- Components were declared in an `@NgModule`. There was no standalone option for most apps.
- Local component state was a plain class field, often updated by direct mutation. Change detection was driven by `Zone.js` watching every async event.
- Template control flow used structural directives: `*ngIf`, `*ngFor`, `*ngSwitch`. They were modules you had to import (`CommonModule`).

In Angular v21 the same component is a **standalone** class declared with `@Component`, owns reactive state through **signals**, and uses **template control flow** like `@if` and `@for` that is built into the template language. Imports are local to the component, not the module.

## React comparison

`signal<T>()` plays a similar role to React's `useState`. The difference: in Angular you *call* the signal to read its value (`completedCount()`), and you call `.set` or `.update` to write it. Components are still classes, not functions, but the mental model of "store some state, derive other state from it, render based on it" is the same.

`computed()` is similar to `useMemo`, except dependencies are tracked automatically — there is no dependency array. `@if` and `@for` are the template equivalent of `{condition && <X />}` and `array.map(...)`.

## Vue comparison

`signal()` is close to Vue's `ref()`. Reading is explicit (`completedCount()` in Angular vs `count.value` in Vue), but the idea is the same. `computed()` maps directly to Vue's `computed()`. `@if` and `@for` are the Angular equivalent of `v-if` and `v-for`.

## Micro-lessons in this module

1. [01-01 Read a standalone component](./lesson-01-01-concept.md) — what `@Component` declares.
2. [01-02 Introduce `signal`](./lesson-01-02-concept.md) — reactive state.
3. [01-03 Update a signal from an event](./lesson-01-03-concept.md) — `(click)` and `signal.update`.
4. [01-04 Derive state with `computed`](./lesson-01-04-concept.md) — derived values.
5. [01-05 Conditional rendering with `@if`](./lesson-01-05-concept.md) — `@if` / `@else`.
6. [01-06 Two-way text input with a signal](./lesson-01-06-concept.md) — `[value]` + `(input)`.

End-of-module state: a tracker page with a counter, a derived progress label, conditional messages, and a live text echo. No arrays, no child components, no router.
