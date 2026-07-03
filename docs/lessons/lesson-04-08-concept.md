# Lesson 04-08 Concept: Validate and Submit With Signal Forms

## Goal

Add schema-based required validation and a Signal Forms submit lifecycle that appends a topic.

## The single new concept

Signal Forms attach validation rules in a schema function passed to `form()`:

```ts
protected readonly topicForm = form(
  this.topicDraft,
  (path) => {
    required(path.title, { message: 'Title is required.' });
  },
);
```

The schema function binds rules to paths in the form model. It runs during form creation to set up the form's logic tree. The required rule then runs automatically when the title value changes.

The key shift from reactive forms is where rules are declared. Instead of attaching a validators array to a `FormControl`, Signal Forms declare rules against model paths:

```ts
required(path.title, { message: 'Title is required.' });
```

That keeps validation near the form schema and lets the model shape guide the API.

## Prior knowledge assumed

- Lesson 04-07: `topicDraft`, `form()`, `FormField`, and field state signals.
- Lesson 04-06: a valid topic submission appends a topic.
- Lesson 01-05: `@if` and `@for`.

## Validation mechanics

Signal Forms validation follows this loop:

```text
field value changes -> validation rules run -> field state signals update -> template re-renders
```

The field exposes status as signals:

```text
topicForm.title().invalid()
topicForm.title().errors()
topicForm.title().touched()
```

The template can render errors from field state:

```angular-html
@if (topicForm.title().touched() && topicForm.title().invalid()) {
  @for (error of topicForm.title().errors(); track error.kind) {
    <p class="error">{{ error.message || 'Title is required.' }}</p>
  }
}
```

No manual `setErrors()` call is needed. Errors are derived from the schema rules.

## What changes when the user types

For the title field, the runtime sequence is:

```text
input event
FormField writes title into the model signal
required rule evaluates the title value
title field errors update
title field invalid signal updates
template reads update
```

The template does not ask the DOM whether the field is empty. It asks the field state:

```html
topicForm.title().invalid()
```

That is the same architectural idea as reactive forms, but with signal-backed reads.

## Error list rendering

The task renders errors with `@for` because a field can have more than one validation rule:

```html
@for (error of topicForm.title().errors(); track error.kind) {
  <p class="error">{{ error.message || 'Title is required.' }}</p>
}
```

Today there is only one rule. The structure still teaches the scalable pattern:

```text
field errors signal -> loop over errors -> render messages
```

The field decides which errors exist. The template decides how to display them.

## Submission mechanics

`FormRoot` binds a Signal Form to a native `<form>` element:

```angular-html
<form [formRoot]="topicForm">
  ...
</form>
```

It handles the browser submit event:

```text
submit event -> FormRoot prevents navigation -> submit() runs -> fields are touched -> validation gates action -> action runs if valid
```

The action is configured in `form()`:

```ts
{
  submission: {
    action: async (field) => {
      const value = field().value();
      // update app state
    },
  },
}
```

If validation fails, the action does not run. Signal Forms marks interactive fields as touched so error rendering becomes visible.

## What `FormRoot` changes

The submit action is no longer a separate `(ngSubmit)` handler in the template. It is part of the form definition:

```ts
form(model, schema, { submission: { action } });
```

That puts validation gating and submission state in the same forms system.

## Why the button can stay enabled

In the reactive form lesson, the button was disabled when the form was invalid. In this Signal Forms lesson, keep the button enabled unless the form is already submitting:

```html
<button type="submit" [disabled]="topicForm().submitting()">
```

That lets the learner see the invalid submission path: clicking Add topic on an empty title marks the title touched and renders the error.

## Submission state rendering

`submitting()` is a signal on the root field state:

```html
topicForm().submitting()
```

It is true while the action is running. The template can use it in two ways:

- disable the submit button to prevent duplicate submissions
- render a different button label while work is pending

This matters more once Module 06 adds HTTP. The local action is fast, but the same rendering pattern works for async server work.

## Reset mechanics

The submitted field state has a `reset()` method:

```ts
field().reset({ title: '', description: '' });
```

This updates the model value and resets field interaction state. The template then re-renders from the reset field state.

## Validation state after reset

After reset, the title value is empty again. The required rule still means the field is invalid. The difference is interaction state: the field is clean and untouched, so the error message is hidden by the template condition.

That is the same split from Lesson 04-04:

```text
invalid data truth
touched-based display policy
```

The form can be invalid without shouting at the user on a fresh empty form.

## Stable API note

The installed Angular 22 package marks Signal Forms APIs as stable. That means the lesson can teach them as current Angular, while reactive forms remain useful for understanding existing Angular applications.

## Comparison callout

Reactive forms use `Validators.required` attached to controls. Signal Forms use `required(path.title)` in a schema. Both produce validation state, but Signal Forms expose that state as signals and keep the form data in a writable signal model.

## Vocabulary checkpoint

- **Schema function:** the function that declares validation and form logic.
- **FormRoot:** the directive that binds a `FieldTree` to a native form.
- **Submission action:** the async function that runs only after validation passes.
- **Derived error state:** errors computed from validation rules and field values.
