# Lesson 01-03 Concept: Update a Signal From an Event

## Goal

Click a button and watch the signal value go up. The visible counter increments on each click.

## The single new concept

Two ideas land together here, but they are tightly coupled and pointless apart:

1. **Template event binding**: `(eventName)="expression()"` wires a DOM event to a method.

   ```html
   <button (click)="markOneComplete()">Mark one complete</button>
   ```

2. **Writing a signal**: every signal exposes `.set` and `.update`.

   - `.set(value)` replaces the current value.
   - `.update(prev => next)` computes the next value from the previous one.

   ```ts
   protected markOneComplete(): void {
     this.completedCount.update((current) => current + 1);
   }
   ```

After the call, Angular notices that `completedCount` changed and re-renders any template (or `computed`) that read it.

## Prior knowledge assumed

- Lesson 01-02: the `completedCount` signal.

## Why `.update` instead of `.set`?

`.set` is fine when the new value does not depend on the previous one. `.update` is safer when it does, because Angular guarantees you receive the latest value as the argument. For a counter, `.update(n => n + 1)` is the idiomatic choice.

## Comparison callout

In React, the equivalent is `setCount(c => c + 1)`. The pattern is identical. In Vue with `ref`, you would write `count.value++`. Angular keeps the function-call shape consistent with how signals are read.
