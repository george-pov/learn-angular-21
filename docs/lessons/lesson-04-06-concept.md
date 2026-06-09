# Lesson 04-06 Concept: Submit the Reactive Form and Append a Topic

## Goal

Wire the reactive form to a submit handler. A valid submission appends a new topic to the dashboard list and resets the form.

## The single new concept

`ngSubmit` is Angular's submit event for forms managed by Angular reactive forms:

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

At this point in the curriculum, `Dashboard` still owns the `topics` signal. Module 05 moves topic state into a store service.

## Prior knowledge assumed

- Lesson 02-03: immutable updates to the `topics` signal.
- Lesson 04-05: `FormGroup`, `formControlName`, and `topicForm.invalid`.

## Submit mechanics

The browser submit event is the trigger:

```text
button click -> submit event -> Angular ngSubmit -> component handler
```

The handler is ordinary TypeScript, but it reads Angular form state:

```ts
if (this.topicForm.invalid) { ... }
const value = this.topicForm.getRawValue();
```

That gives the handler one clear job: use the form model snapshot to update application state.

## Native submit versus click

The lesson uses form submission instead of a button click because real forms can submit in more than one way:

- clicking the submit button
- pressing Enter in a text field
- triggering submit from a test or browser API

The `(ngSubmit)` binding listens at the form boundary, so the handler belongs to the form workflow rather than to one specific button.

The submit button is still useful as the visible command:

```html
<button type="submit" [disabled]="topicForm.invalid">
  Add topic
</button>
```

But the form element owns the submit event.

## Why use `getRawValue()`

`getRawValue()` returns a snapshot object for every control in the group:

```ts
const value = this.topicForm.getRawValue();
// value.title
// value.description
```

For this lesson all controls are enabled, so `value` and `getRawValue()` would behave similarly. `getRawValue()` is explicit and keeps the example simple when controls are non-nullable.

## Snapshot is not live state

The object returned by `getRawValue()` is a snapshot. Updating that object does not update the form. Updating the form later does not mutate that old object.

That is useful at submit time. The handler wants one stable value:

```text
read form snapshot -> append topic -> reset form
```

Application state should receive domain data, not a reference to a form control.

## Invalid submit path

The button is disabled while invalid, but code should still defend against invalid submission. Templates can change later, browser behavior can differ, and tests can call methods directly.

`markAllAsTouched()` makes validation feedback visible if an invalid submit reaches the handler.

## Why mark every field touched

If a user submits an invalid form, the UI should explain what blocked the submit. Marking every control touched makes each field's existing error rendering policy become visible.

The handler does not need to know every possible error message. It only changes interaction state:

```text
invalid submit -> mark controls touched -> template displays each field error
```

That scales better than writing submit-specific error text in the handler.

## Reset mechanics

Resetting the group changes more than the DOM input values. It also resets form state:

```ts
this.topicForm.reset({ title: '', description: '' });
```

After reset, the controls return to their initial values and interaction state. The template then renders from the reset form state.

## Form state versus application state

This lesson has two different state owners:

- `topicForm` owns draft input state and validation state
- `topics` owns application data rendered by the list

Submitting copies data from the first owner into the second owner. It should not merge those concepts. The list should not care whether the title field was touched. The form should not own the final topic array forever.

Module 05 moves the application state into a service. The form stays in the dashboard because it is view-specific state.

## Rendering after submit

A successful submit causes two visible changes:

```text
topics signal updates -> list renders a new row
topicForm resets -> inputs become empty and clean
```

Those are separate renders from separate state changes. They happen in one user workflow, but the mental model should keep them distinct.

## Comparison callout

Compared with React, Angular gives you a form object that already knows validity and touched state, so the submit handler can ask `topicForm.invalid` instead of rechecking every field manually.

## Vocabulary checkpoint

- **Submit event:** the browser event produced by submitting a form.
- **Snapshot:** a plain object containing the current form values.
- **Invalid submit guard:** code that refuses to process invalid form data.
- **Reset:** returning values and interaction state to a clean form state.
