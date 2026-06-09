# Lesson 04-05 Concept: Combine Controls Into a `FormGroup`

## Goal

Replace the single title control with a form model that contains two controls: `title` and `description`.

## The single new concept

`FormGroup` is a named collection of controls:

```ts
protected readonly topicForm = new FormGroup({
  title: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  }),
  description: new FormControl('', {
    nonNullable: true,
  }),
});
```

The template binds the form element to the group and each input to a named control:

```html
<form [formGroup]="topicForm">
  <input type="text" formControlName="title" />
  <textarea formControlName="description"></textarea>
</form>
```

A form group gives you form-level state. `topicForm.invalid` is true when any child control is invalid.

## Prior knowledge assumed

- Lesson 04-02: `FormControl`.
- Lesson 04-03: validators and `invalid`.
- Lesson 04-04: touched state and validation feedback.

## Binding mechanics

The group and control-name directives connect the DOM to the TypeScript object:

```text
[formGroup]="topicForm" gives the form subtree a parent group
formControlName="title" looks up topicForm.controls.title
formControlName="description" looks up topicForm.controls.description
```

The names must match:

```ts
title: new FormControl(...)
```

```html
formControlName="title"
```

If the names do not match, Angular cannot connect the DOM field to the control.

## The form tree

After this lesson, the form has a small tree:

```text
topicForm
  title
  description
```

The DOM has a matching subtree:

```text
form[formGroup]
  input formControlName="title"
  textarea formControlName="description"
```

`[formGroup]` provides the parent context. Each `formControlName` registers with that parent context and asks for a child control by name.

This is why `formControlName` is not enough by itself. It needs an ancestor group to search.

## Group state propagation

Each child control owns its own state. The group aggregates that state:

- if `title` is invalid, `topicForm.invalid` is true
- if all child controls are valid, `topicForm.valid` is true
- group value contains both child values

That lets the submit button read one form-level status instead of checking each control manually.

## Where errors live

The required title error lives on the title control:

```ts
topicForm.controls.title.errors
```

The group becomes invalid because one child is invalid, but the group does not automatically copy every child error into `topicForm.errors`.

That distinction is important:

- read child controls for field-specific messages
- read the group for whole-form status
- add group-level validators only for rules that involve the group itself

For example, a "start date must be before end date" rule would belong at group level. A required title belongs on the title control.

## Rendering policy stays local

The group owns state, but the template still decides what to render:

```html
@if (
  topicForm.controls.title.touched &&
  topicForm.controls.title.hasError('required')
) {
  <p class="error">Title is required.</p>
}
```

The message is local to the title field, while the button can use group-level validity.

## Why the description has no validator

The description field is included to make the form a real group, not because every field needs validation. A form can mix required and optional fields.

This also teaches that group validity is based on child rules. Since `description` has no validator, it does not make the form invalid when empty.

## Rendering cost and clarity

Grouping controls does not mean the whole page should be treated as one giant form expression. The template should read the smallest useful state:

```html
[disabled]="topicForm.invalid"
```

for the submit button, and:

```html
topicForm.controls.title.hasError('required')
```

for the title error.

That keeps rendering logic close to the UI element it affects.

## Comparison callout

Angular v15 reactive forms used `FormGroup`, `[formGroup]`, and `formControlName` too. The mental model is stable: a group is the form object. React usually builds this shape from component state or a form library.

## Vocabulary checkpoint

- **FormGroup:** a named collection of controls.
- **Control name:** the string key that connects template fields to group controls.
- **Aggregated status:** group status derived from child control status.
- **Form subtree:** the DOM section managed by a form group.
