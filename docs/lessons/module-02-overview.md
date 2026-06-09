# Module 02: Lists and Composition

## Topic

Turn the primitive-signal tracker into a real list with one child component, typed model, signal inputs, and outputs.

## Prior modules required

Module 01.

## Angular v15 comparison

In Angular v15, lists used `*ngFor` (a structural directive), child components received data through `@Input()` decorators, and they emitted events through `@Output()` with `EventEmitter`. Data flowed through plain class properties; reactivity came from `Zone.js` watching every async event.

In Angular v21, the list block is `@for` with a required `track`. Component inputs are signals created by the `input()` and `input.required()` functions, not decorators. Outputs come from `output<T>()`, which emits values without exposing the full `EventEmitter` surface.

## React comparison

`@for (item of items; track item.id) { … }` is the equivalent of `items.map(item => <X key={item.id} />)`. The `track` expression plays the role of React's `key` prop — Angular uses it to keep DOM nodes stable across updates. (This is the comparison callout for Lesson 02-02.)

Signal inputs (`input.required<T>()`) are the Angular equivalent of typed props. Outputs are the equivalent of callback props — `(toggle)="handler($event)"` in Angular is `onToggle={handler}` in React.

## Vue comparison

`@for` maps to `v-for`. The `track` requirement is the equivalent of Vue's `:key`. Signal inputs are similar to `defineProps`, and outputs are similar to `defineEmits`. The shape is the same; the syntax is different.

## Micro-lessons in this module

1. [02-01 Introduce a typed model](./lesson-02-01-concept.md)
2. [02-02 Render a list with `@for` and `track`](./lesson-02-02-concept.md)
3. [02-03 Toggle a list item with immutable update](./lesson-02-03-concept.md)
4. [02-04 Extract a child component](./lesson-02-04-concept.md)
5. [02-05 Pass data with `input()`](./lesson-02-05-concept.md)
6. [02-06 Emit events with `output()`](./lesson-02-06-concept.md)

End-of-module state: a tracker with three topics, checkboxes per topic, a derived progress label, and a parent/child component split. State lives in `App`; `TopicsList` is purely presentational.
