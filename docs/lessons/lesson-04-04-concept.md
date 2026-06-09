# Lesson 04-04 Concept: Show Validation Feedback After Interaction

## Goal

Show a validation message only after the learner has interacted with the field. The field can start invalid without immediately showing an error.

## The single new concept

`touched` means the control has received focus and then lost focus. It is useful for validation messages because it avoids showing errors before the user has had a chance to type.

```html
@if (titleControl.touched && titleControl.hasError('required')) {
  <p class="error">Title is required.</p>
}
```

Two checks work together:

- `titleControl.touched`: the user has visited and blurred the field.
- `titleControl.hasError('required')`: the required validator is currently failing.

The control can be invalid on first render, but the page waits to display the message until the field has been touched.

## Prior knowledge assumed

- Lesson 04-03: `Validators.required` and `invalid`.
- Lesson 01-05: conditional rendering with `@if`.

## Behind the scenes

The input value and interaction state come from different browser events:

```text
input event -> updates value -> validators run
blur event -> marks touched -> template can show feedback
```

Typing changes the value. Leaving the field marks it touched. Angular reactive forms tracks both pieces so the template can choose a humane validation display.

## Event timeline

For an empty required field, the sequence looks like this:

```text
page renders
value is ''
required validator fails
titleControl.invalid is true
titleControl.touched is false
error is hidden
```

Then the learner focuses the field and leaves it empty:

```text
focus event
blur event
Angular marks control touched
template condition becomes true
error is rendered
```

Then the learner types a title:

```text
input event
value changes
required validator passes
errors becomes null
template condition becomes false
error is removed
```

The same field can move through all of those states without the component declaring extra booleans.

## Invalid is not the same as show an error

An empty required field is invalid as soon as the page loads:

```ts
titleControl.invalid // true
```

But a good UI often waits to show text feedback:

```ts
titleControl.touched && titleControl.hasError('required')
```

That separates data truth from rendering policy.

## Why render policy belongs in the template

The form model should know field facts:

- current value
- whether validators pass
- whether the field was touched

The template should decide presentation:

- where the message appears
- which text is shown
- which CSS class is applied
- whether the message waits for touch, dirty, or submit

Keeping that split makes the form easier to adjust. You can change feedback timing without changing the validator.

## `dirty` versus `touched`

Two common interaction states are:

- `dirty`: the value changed.
- `touched`: the control was focused and blurred.

This lesson uses `touched` because a required field should show its error when the user leaves it empty. Some forms use `dirty`, or `dirty || touched`, depending on the desired UX.

## Field-level messages and form-level status

The title field owns the required error. The submit button may read a broader status later when the controls are grouped.

That produces two layers:

```text
field status -> local message
form status -> submit affordance
```

The learner should avoid one giant form-level error condition for every field. Local field messages explain exactly what needs attention.

## Comparison callout

Angular v15 reactive forms also tracked `touched` and `dirty`. What is newer here is the `@if` block syntax instead of `*ngIf`. In React, you normally create touched state manually. Angular reactive forms gives every control that interaction state.

## Vocabulary checkpoint

- **Touched:** the control has been visited and blurred.
- **Dirty:** the user has changed the control value.
- **Error rendering policy:** the rule for when validation text becomes visible.
- **Interaction state:** form state caused by focus, blur, and editing.
