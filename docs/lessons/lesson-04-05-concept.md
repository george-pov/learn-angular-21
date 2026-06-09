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

A form group gives you a form-level state. `topicForm.invalid` is true when any child control is invalid.

## Prior knowledge assumed

- Lesson 04-02: `FormControl`.
- Lesson 04-03: validators and `invalid`.
- Lesson 04-04: touched state and validation feedback.

## Why the names matter

The keys in the TypeScript object are the form control names:

```ts
{
  title: new FormControl(...),
  description: new FormControl(...),
}
```

The template strings must match those keys:

```html
formControlName="title"
formControlName="description"
```

If the names do not match, Angular cannot connect the DOM field to the control.

## Comparison callout

Angular v15 reactive forms used `FormGroup`, `[formGroup]`, and `formControlName` too. The mental model is stable: a group is the form object. React usually builds this shape from component state or a form library. Vue often combines `v-model` fields with validation state from a library.
