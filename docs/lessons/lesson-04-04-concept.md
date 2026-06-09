# Lesson 04-04 Concept: Show Validation Feedback After Touch

## Goal

Show a validation message only after the learner has interacted with the field. The field can start invalid without immediately showing an error.

## The single new concept

`touched` means the control has received focus and then lost focus. It is useful for validation messages because it avoids showing errors before the user has had a chance to type.

```html
@if (titleControl.touched && titleControl.hasError('required')) {
  <p>Title is required.</p>
}
```

Two checks work together:

- `titleControl.touched`: the user has visited the field.
- `titleControl.hasError('required')`: the required validator is currently failing.

The control can be invalid on first render, but the page waits to display the message until the field has been touched.

## Prior knowledge assumed

- Lesson 04-03: `Validators.required` and `invalid`.
- Lesson 01-05: conditional rendering with `@if`.

## Why not show the error immediately?

An empty required field is invalid as soon as the page loads. Showing "Title is required" immediately can feel like the form is scolding the user before they do anything. `touched` lets the UI separate "the data is invalid" from "the user should see feedback now."

## Comparison callout

Angular v15 reactive forms also tracked `touched`. What is newer here is the `@if` block syntax instead of `*ngIf`. In React, you normally create touched state manually. In Angular reactive forms, it is part of every control.
