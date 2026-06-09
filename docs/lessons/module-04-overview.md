# Module 04 Overview: Forms

## Topic area

Collect user input with explicit form state, validation, rendering feedback, and submission.

This module starts with the manual signal input pattern from Module 01, then introduces reactive forms, and then extends the final shape with Angular 21 experimental Signal Forms.

## Prior modules

Modules 01-03.

The learner should already understand signals, computed values, event binding, `@if`, list rendering, child components, and the dashboard route.

## Angular v15, React, and Vue framing

Angular v15 apps commonly used reactive forms and template-driven forms. This module deliberately skips template-driven form binding so the learner does not confuse it with signal-first state. Reactive forms are still important because they are stable, common in existing Angular code, and they explain the older forms engine.

Signal Forms are different: the source of truth is a writable signal model, and field state is exposed through signals. In Angular 21 this API is experimental. It is included here because this project targets modern Angular learning and because it connects directly to the signal mental model built in Modules 01-03.

React learners can compare the manual signal and Signal Forms examples with controlled input state. Vue learners can compare the high-level result with two-way field binding, but the important Angular distinction is the form model that owns validation and rendering state.

## Module mental model

A form is not just an input value. A real form has several state layers:

- current value
- validity
- error details
- touched and dirty interaction state
- disabled or submitting state
- submission behavior

Rendering a form means the template reads those state layers and chooses what the user sees. The browser emits events, Angular form directives update the form model, validation runs, and the template reads the latest state.

## Rendering mechanics

This module names the rendering loop explicitly:

```text
browser event -> form directive -> form model/state -> validation -> template reads -> DOM updates
```

Reactive forms and Signal Forms use different state containers:

- Reactive forms use `FormControl` and `FormGroup` objects with observable-oriented state.
- Signal Forms use a writable model signal and a `FieldTree` whose field states are signals.

The visible UI can look similar, but the state ownership and rendering mechanics are different.

## Micro-lessons

- 04-01 Keep a manual signal input as the baseline: `[value]`, `(input)`, and template re-rendering.
- 04-02 Introduce a single reactive `FormControl`: a control object connected with `[formControl]`.
- 04-03 Add a required validator: validator execution, status state, and disabled rendering.
- 04-04 Show validation feedback after interaction: `touched`, `dirty`, blur events, and `@if`.
- 04-05 Combine controls into a `FormGroup`: group state and named DOM bindings.
- 04-06 Submit the reactive form and append a topic: `(ngSubmit)`, snapshots, reset, and signal append.
- 04-07 Introduce experimental Signal Forms: model signal, `form()`, `FormField`, and field state signals.
- 04-08 Validate and submit with Signal Forms: schema validation, `FormRoot`, submission lifecycle, and error rendering.

## End-of-module shape

By the end of Module 04, the dashboard has a topic form backed by Angular 21 experimental Signal Forms. The form uses a signal model, schema-based required validation, field-state-driven error rendering, and a submission action that appends a topic.
