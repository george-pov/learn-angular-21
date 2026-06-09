# Lesson 01-05 Concept: Conditional Rendering With `@if`

## Goal

Show different copy depending on whether the user has finished all topics. When `completedCount() === totalTopics()`, the page says "All topics complete." Otherwise it says "Keep going."

## The single new concept

`@if` is a built-in template **control flow block**. It looks like an `if` statement in the template:

```html
@if (completedCount() === totalTopics()) {
  <p>All topics complete.</p>
} @else {
  <p>Keep going.</p>
}
```

`@else` is optional. `@else if (...)` is allowed. The expression inside `@if (...)` is plain TypeScript and can call signals.

`@if` is part of the template language. No import is needed. It replaces the structural directive `*ngIf` that older Angular code used.

## Prior knowledge assumed

- Lesson 01-02 to 01-04: signals and computed.

## Why a block instead of a directive?

Structural directives (`*ngIf="..."`) had quirks: a single asterisk, a hidden expansion to an `<ng-template>`, and the need to import `CommonModule`. The `@if` block reads more like code, parses faster, and is built into every template.

## Comparison callout

`@if` is the Angular equivalent of React's `{condition && <X />}` or `{condition ? <X /> : <Y />}`. It maps closely to Vue's `v-if` / `v-else`. The biggest difference vs Angular v15 is the lack of asterisk syntax and the lack of any module import.
