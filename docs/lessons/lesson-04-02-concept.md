# Lesson 04-02 Concept: Introduce a Single Reactive `FormControl`

## Goal

Replace `ngModel` with a reactive form control. The visible behavior is still an input plus a live echo, but the field state now lives in an explicit `FormControl` object.

## The single new concept

`FormControl` is Angular's model object for one form field:

```ts
protected readonly titleControl = new FormControl('', {
  nonNullable: true,
});
```

```html
<input type="text" [formControl]="titleControl" />
<p>You typed: {{ titleControl.value }}</p>
```

The control owns the field value. The template connects the input element to that control with `[formControl]`.

`nonNullable: true` keeps this control's value typed as `string` instead of `string | null`. That matters because form reset APIs can otherwise set controls to `null`.

## Prior knowledge assumed

- Lesson 04-01: `FormsModule` and `[(ngModel)]`.
- Lesson 01-06: a text input can be modeled by a value plus a change path.

## Template-driven versus reactive

In Lesson 04-01, the template directive did most of the work:

```html
<input [(ngModel)]="currentTitle" />
```

In this lesson, the component class owns the form model:

```ts
protected readonly titleControl = new FormControl('', { nonNullable: true });
```

That is the core reactive forms mental model: the class defines controls, validators, and submission behavior; the template binds DOM elements to those controls.

## Comparison callout

This is close to React's controlled input state, but the state object is richer than a plain string. A `FormControl` carries value, validity, touched state, disabled state, and reset behavior. Vue's `ref('')` gives a reactive value; Angular's `FormControl` gives a field model.
