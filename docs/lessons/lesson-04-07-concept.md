# Lesson 04-07 Concept: Introduce Stable Signal Forms

## Goal

Replace the reactive `FormGroup` with Angular 22 stable Signal Forms, using a writable signal as the form model.

## The single new concept

Signal Forms start with a model signal:

```ts
type TopicDraft = {
  title: string;
  description: string;
};

protected readonly topicDraft = signal<TopicDraft>({
  title: '',
  description: '',
});
```

Then `form()` builds a field tree around that model:

```ts
protected readonly topicForm = form(this.topicDraft);
```

The template binds inputs to field nodes:

```html
<input type="text" [formField]="topicForm.title" />
<textarea [formField]="topicForm.description"></textarea>
```

In Angular 22, `form`, `FormField`, and related Signal Forms APIs are stable.

That status matters for the curriculum. The lesson teaches Signal Forms because they match Angular's signal direction, while still treating reactive forms as an important baseline for existing Angular code.

## Prior knowledge assumed

- Lesson 04-06: reactive form submission works.
- Module 01: signals are the reactive state primitive.
- Lesson 02-03: topic updates use immutable signal updates.

## Source of truth shift

Reactive forms used this source of truth:

```ts
topicForm = new FormGroup(...)
```

Signal Forms use this source of truth:

```text
topicDraft = signal({ title: '', description: '' });
```

The form field tree does not keep a separate copy of the draft data. It wraps the model signal. When a user types into a field, the model signal updates. When code updates the model signal, the field updates.

## Model shape drives form shape

The model is a plain object:

```ts
{
  title: '',
  description: '',
}
```

The form tree mirrors that object:

```text
topicForm.title
topicForm.description
```

This is different from reactive forms, where the form model is declared separately from the data shape:

```ts
new FormGroup({
  title: new FormControl(''),
  description: new FormControl(''),
});
```

Signal Forms reduces that duplication. The TypeScript shape of the signal model gives the form tree its field names.

## Field tree mental model

`form(this.topicDraft)` returns a `FieldTree` with the same shape as the model:

```text
topicForm()
topicForm.title()
topicForm.description()
```

Each call returns field state. A field state exposes signals:

- `value()`
- `valid()`
- `invalid()`
- `errors()`
- `touched()`
- `dirty()`

That is why templates read Signal Forms state with function calls:

```html
{{ topicForm.title().value() }}
```

## Field reference versus field state

There are two related reads that look similar but mean different things:

```html
[formField]="topicForm.title"
```

passes the field node to a directive. The directive needs the field reference so it can bind the DOM control.

```html
{{ topicForm.title().value() }}
```

calls the field node to read the current field state. The field state then exposes signals such as `value()`, `touched()`, and `invalid()`.

The first expression wires the input. The second expression renders current state.

## Rendering mechanics

The Signal Forms rendering loop is:

```text
input event -> FormField directive -> field value signal -> model signal -> template reads -> DOM updates
```

The `[formField]` directive is the bridge. On native inputs and textareas, it wires browser events to the field state and writes field state back to the DOM control.

Because field state is signal-based, template reads such as:

```html
topicForm.title().value()
```

are reactive dependencies. When the field value changes, Angular knows which template reads need to update.

## Model update mechanics

When a user types into the title input, Signal Forms updates the model signal immutably at the matching path. Conceptually:

```text
old model: { title: '', description: '' }
new model: { title: 'Signals', description: '' }
```

The learner does not call `topicDraft.update(...)` for every keystroke. The `FormField` directive performs that field-level write.

Programmatic writes still go through the model or field state:

```ts
this.topicDraft.set({ title: 'Signals', description: '' });
```

The input reflects the new model because the form field is bound to it.

## Why this can feel like two-way binding

Signal Forms provide automatic synchronization between the input and the model signal. That can look like classic two-way field binding from the outside, but the mental model is different:

- the source of truth is a writable signal model
- validation and interaction state are field-state signals
- the binding directive connects a DOM control to a field path

This is why Signal Forms fit the signal-first curriculum better than the older template-driven path.

## Why this lesson does not validate yet

This lesson isolates the state model shift:

- from `FormGroup` to signal model
- from `formControlName` to `[formField]`
- from control properties to field-state signals

Schema validation lands in Lesson 04-08.

## Comparison callout

Signal Forms look closer to the signal examples from Module 01 than reactive forms do. They keep Angular's forms concepts, but the state reads are signal reads and the model is a writable signal.

## Vocabulary checkpoint

- **Signal form model:** the writable signal that stores form data.
- **FieldTree:** the form-shaped object returned by `form()`.
- **FieldState:** the signal-backed state for one field.
- **FormField directive:** the directive that binds a field to an input or textarea.
