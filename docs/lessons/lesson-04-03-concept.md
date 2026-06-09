# Lesson 04-03 Concept: Add a Required Validator

## Goal

Attach a required validator to the title control and render disabled button state from the control's validity.

## The single new concept

Validators are functions attached to controls. `Validators.required` marks the control invalid while its value is empty:

```ts
protected readonly titleControl = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required],
});
```

The template can read the control's status:

```html
<button type="button" [disabled]="titleControl.invalid">
  Add topic
</button>
```

The validator does not submit anything yet. It only changes the control state. The button renders from that state.

## Prior knowledge assumed

- Lesson 04-02: `FormControl` and `[formControl]`.
- Lesson 01-03: property binding can set DOM properties such as `disabled`.

## Validation rendering loop

When the user types, the reactive forms loop becomes:

```text
input event -> value accessor -> FormControl value changes -> validators run -> status updates -> template reads invalid -> button updates
```

The template does not inspect the DOM input value. It asks the control:

```html
[disabled]="titleControl.invalid"
```

That keeps validation state attached to the form model, not scattered through template expressions.

## What a validator contributes

`Validators.required` checks the current value and returns one of two results:

- `null` when the value passes
- an error entry when the value fails

Angular collects those results into the control's `errors` property. For a required failure, the shape is conceptually:

```ts
{ required: true }
```

The lesson does not render `errors` yet, but the invalid button state comes from the same validator result.

## Useful control state

A reactive `FormControl` exposes several status properties:

- `valid`: all attached validators pass.
- `invalid`: at least one attached validator fails.
- `errors`: an object describing which validators failed, or `null`.
- `pending`: async validation is still running.

For this lesson, only `invalid` is rendered. Error messages arrive in Lesson 04-04.

## Status is derived state

Do not think of `invalid` as a separate variable that the component manually maintains. It is derived from the control's current value and validators.

The dependency chain is:

```text
titleControl.value
Validators.required
titleControl.errors
titleControl.status
titleControl.invalid
button.disabled
```

The template reads the last link in that chain. Angular forms maintains the middle links.

## Why the field starts invalid

The initial value is an empty string:

```ts
new FormControl('', ...)
```

An empty string fails `Validators.required`, so the control starts invalid. That is data truth. The user-facing question of when to show an error message is a separate rendering choice.

## Disabled rendering is not validation

The disabled button helps the user, but it is not the validation boundary. A form can still be submitted through code, tests, keyboard behavior in changed markup, or a future refactor.

For that reason, Lesson 04-06 adds an invalid-submit guard in the TypeScript handler. UI state guides the user. Handler validation protects the state update.

## Why not show the error yet

If this lesson rendered an error immediately, the first screen would tell the learner they made a mistake before they did anything. That is technically correct but often poor UX.

The lesson intentionally separates two ideas:

- Lesson 04-03: whether the value is valid
- Lesson 04-04: when to display validation feedback

That separation is a core forms skill.

## Comparison callout

In Angular v15, reactive forms used the same `Validators.required` API. The modern difference in this project is the standalone import style and the newer template control flow used around the form.

## Vocabulary checkpoint

- **Validator:** a function that checks a control value.
- **Validity:** whether the current value passes validation.
- **Status:** the form control's validity and pending state.
- **Render from state:** derive UI properties from the form model instead of the DOM.
