# Lesson 04-02 Concept: Introduce a Single Reactive `FormControl`

## Goal

Replace the manual signal input with a reactive `FormControl`. The visible behavior is still an input plus a live echo, but Angular now owns field state through a control object.

## The single new concept

`FormControl` is Angular's reactive forms model object for one form field:

```ts
protected readonly titleControl = new FormControl('', {
  nonNullable: true,
});
```

The template connects the input to that control:

```html
<input type="text" [formControl]="titleControl" />
<p>You typed: {{ titleControl.value }}</p>
```

The control owns the field value. The input is a UI control bound to that form model.

## Prior knowledge assumed

- Lesson 04-01: manual `[value]` and `(input)` binding.
- Lesson 01-03: browser events can update component state.

## Behind the scenes

Reactive forms insert a forms directive between the DOM element and the control:

```text
input event -> value accessor -> FormControl.setValue(...) -> control state changes -> template renders
```

The value accessor is Angular's bridge between a native input element and a form control. For a text input, it listens to input events, writes values into the `FormControl`, and writes programmatic control changes back into the DOM element.

## Setup sequence

When the component renders, Angular wires the pieces in this order:

```text
component creates FormControl
template creates input element
[formControl] directive receives the control
directive chooses the matching value accessor
value accessor writes the initial control value into the input
```

After that, the input and control are linked:

```text
user types -> accessor tells control -> control updates value
control setValue(...) -> accessor writes to input
```

That second direction matters. The control is not just a passive place to read from during submit. It can also drive the DOM when code changes the value.

## Why the template still updates

`titleControl.value` is a property, not a signal read:

```html
{{ titleControl.value }}
```

The echo still updates because the input event happens inside Angular's event handling. Reactive forms updates the control during that event, and Angular checks the template afterward.

That is different from Signal Forms, where the field value itself is read as a signal:

```html
{{ topicForm.title().value() }}
```

This distinction matters in Angular 22. Reactive forms remain stable and widely used, but their state model is older than signals.

## Why this is different from a signal

A `FormControl` is not a signal. It is a richer field model that tracks:

- `value`
- `valid` and `invalid`
- `errors`
- `touched`
- `dirty`
- `disabled`
- reset behavior

You read its value as a property:

```ts
titleControl.value;
```

You update it with methods:

```ts
titleControl.setValue('Signals');
```

The control can also emit value changes through observables, but this lesson does not use them. The learner only needs the field model, the DOM bridge, and the render result.

## Why `nonNullable: true`

By default, Angular controls can reset to `null`. This project wants the title to always be a string, so the control is created with:

```ts
{
  nonNullable: true;
}
```

That keeps the control value typed as `string` instead of `string | null`.

## What changed from the manual signal

The manual lesson had this state:

```ts
currentTitle = signal('');
```

This lesson has this state:

```ts
titleControl = new FormControl('');
```

Both let the user type and see an echo. The difference is the amount of form behavior available on the state object. A signal only knows the current value. A `FormControl` also knows whether the value is valid, whether the user touched the field, and how to reset itself.

That is the tradeoff: more machinery, more form vocabulary.

## Comparison callout

This is close to React controlled input state, but the state object is richer than a plain string. Vue's `ref('')` gives a reactive value; Angular's `FormControl` gives a field model with validation and interaction state.

## Vocabulary checkpoint

- **Reactive form:** an Angular form where the component class defines the form model.
- **FormControl:** a model object for one field.
- **Value accessor:** the bridge between a DOM control and Angular forms.
- **Control state:** value, validity, errors, touched, dirty, and disabled status.
