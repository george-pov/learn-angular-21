# Lesson 04-01 Concept: Keep a Manual Signal Input as the Baseline

## Goal

Revisit the text input from Lesson 01-06 and make the rendering loop explicit before adding Angular forms APIs.

## The single new concept

A form field can be modeled manually with a signal, a property binding, and an event binding:

```ts
protected readonly currentTitle = signal('');
```

```html
<input
  type="text"
  [value]="currentTitle()"
  (input)="currentTitle.set($any($event.target).value)"
/>
<p>You typed: {{ currentTitle() }}</p>
```

The signal is the source of truth. The input displays the signal value. The `input` event writes the browser value back into the signal.

## Prior knowledge assumed

- Lesson 01-02: reading a signal with `()`.
- Lesson 01-03: handling template events.
- Lesson 01-06: manual input binding with `[value]` and `(input)`.
- Lesson 03-02: the tracker UI now lives in `Dashboard`.

## Rendering loop

This simple input already has the same core loop as larger forms:

```text
user types -> browser emits input -> handler writes signal -> template reads signal -> DOM updates
```

Two template reads are important:

```html
[value]="currentTitle()"
{{ currentTitle() }}
```

Those reads register the template as a consumer of the signal. When the handler calls `currentTitle.set(...)`, Angular knows the template needs to render again.

## State and the DOM are separate

The browser input element has its own current value. The signal also has a current value. The lesson keeps them synchronized, but they are not the same thing.

The state-to-DOM direction is:

```text
currentTitle() -> [value] -> input.value
```

The DOM-to-state direction is:

```text
input.value -> input event -> currentTitle.set(...)
```

If either direction is missing, the field becomes one-way:

- without `[value]`, programmatic state changes would not write back to the input
- without `(input)`, typing would not update the signal

That split is the foundation for understanding every Angular forms API. Forms directives hide some wiring, but they still have to keep a DOM control and a state object synchronized.

## What Angular remembers

Angular does not re-render the whole browser page when the signal changes. The template has read `currentTitle()` in known places, so Angular can mark the owning view as needing an update.

The important part for this module is not the exact internal scheduler. The important mental model is:

```text
template read creates dependency
signal write invalidates dependency
Angular refreshes the affected binding
```

The echo paragraph updates because it reads the signal. The input value binding also reads the signal. Both bindings are refreshed from the same source of truth.

## Why start manually

Manual binding is verbose, but it shows the pieces without hiding them:

- value flowing from state to DOM
- event flowing from DOM to state
- template rendering from state

Angular forms APIs automate parts of this loop, but they do not remove it. They add field state, validation state, and submission behavior on top.

## Why this is not a full form yet

This example is enough for a text echo, but it is a poor model for a real form. A real form usually has rules and interaction state:

- should an empty title be accepted?
- should the error show before the user touches the field?
- should the submit button disable while work is running?
- should reset clear only values, or also interaction state?

You could build all of that with more signals. That is useful to understand, but it becomes repetitive quickly. Angular forms APIs exist because most applications need the same field-state vocabulary.

## What this does not provide

The manual signal field has no built-in concept of:

- valid or invalid
- touched or dirty
- error messages
- reset semantics
- group-level form state

Those concerns arrive in later lessons.

## Common failure mode

The common mistake is to treat the DOM input as the source of truth and only read it when the user clicks submit. That works for tiny demos, but it makes rendering feedback harder because the template has no durable form state to read.

This lesson deliberately keeps state in the component. Later lessons move that state into a `FormControl`, a `FormGroup`, and finally a Signal Forms model.

## Comparison callout

This resembles a React controlled input, except the state container is an Angular signal. Vue has a compact field binding syntax, but this lesson intentionally keeps the two directions visible.

## Vocabulary checkpoint

- **Source of truth:** the state that owns the current value.
- **Property binding:** state-to-DOM binding such as `[value]`.
- **Event binding:** DOM-to-state binding such as `(input)`.
- **Rendering loop:** the sequence from browser event to state update to DOM update.
