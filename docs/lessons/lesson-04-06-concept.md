# Lesson 04-06 Concept: Submit the Form and Append a Topic

## Goal

Wire the form to a submit handler. A valid submission appends a new topic to the dashboard list and resets the form.

## The single new concept

`ngSubmit` is Angular's submit event for forms managed by Angular forms:

```html
<form [formGroup]="topicForm" (ngSubmit)="addTopic()">
  <!-- controls -->
</form>
```

The handler checks validity, reads a typed snapshot of the form value, updates the topic array immutably, and resets the form:

```ts
protected addTopic(): void {
  if (this.topicForm.invalid) {
    this.topicForm.markAllAsTouched();
    return;
  }

  const value = this.topicForm.getRawValue();

  this.topics.update((current) => [
    ...current,
    {
      id: Math.max(0, ...current.map((topic) => topic.id)) + 1,
      title: value.title,
      description: value.description,
      done: false,
    },
  ]);

  this.topicForm.reset({ title: '', description: '' });
}
```

At this point in the curriculum, `Dashboard` still owns the `topics` signal. Module 05 moves that state into a store service.

## Prior knowledge assumed

- Lesson 02-03: immutable updates to the `topics` signal.
- Lesson 04-05: `FormGroup`, `formControlName`, and `topicForm.invalid`.

## Why use `getRawValue()`?

`getRawValue()` returns a snapshot object for every control in the group:

```ts
const value = this.topicForm.getRawValue();
// value.title
// value.description
```

For this lesson all controls are enabled, so `value` and `getRawValue()` would behave similarly. `getRawValue()` is explicit and keeps the example simple when controls are non-nullable.

## Invalid submit path

The button is disabled while invalid, but code should still defend against invalid submission. Templates can change later, browser behavior can differ, and tests can call methods directly. `markAllAsTouched()` makes validation feedback visible if an invalid submit reaches the handler.

## Comparison callout

Angular v15 reactive forms used `(ngSubmit)` the same way. Compared with React, Angular gives you a form object that already knows validity and touched state, so the submit handler can ask `topicForm.invalid` instead of rechecking every field manually.
