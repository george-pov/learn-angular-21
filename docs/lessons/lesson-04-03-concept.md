# Lesson 04-03 Concept: Add a Required Validator

## Goal

Attach a required validator to the title control and use the control's validity state to disable the Add topic button.

## The single new concept

Validators are functions attached to controls. `Validators.required` marks the control invalid while its value is empty:

```ts
protected readonly titleControl = new FormControl('', {
  nonNullable: true,
  validators: [Validators.required],
});
```

```html
<button type="button" [disabled]="titleControl.invalid">
  Add topic
</button>
```

The validator does not submit anything yet. It only changes the control state. The button reads that state.

Useful state on a control:

- `valid`: all attached validators pass.
- `invalid`: at least one attached validator fails.
- `errors`: an object describing which validators failed, or `null`.

## Prior knowledge assumed

- Lesson 04-02: `FormControl` and `[formControl]`.
- Lesson 01-03: property binding can set DOM properties such as `disabled`.

## Why this belongs on the control

With reactive forms, validation rules live beside the form model in TypeScript. The template should not recalculate whether the title is acceptable. It should ask the control:

```html
[disabled]="titleControl.invalid"
```

This keeps validation rules and form state in one place.

## Comparison callout

In Angular v15, reactive forms used the same `Validators.required` API. The modern difference in this project is not the validator itself; it is the standalone import style and the newer template syntax used around it. In React, you often write this validity rule yourself. Angular's form control tracks it for you.
