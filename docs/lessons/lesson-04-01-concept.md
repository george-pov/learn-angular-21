# Lesson 04-01 Concept: Replace the Manual Input Binding With `ngModel`

## Goal

Replace the manual `[value]` plus `(input)` binding from Lesson 01-06 with Angular's template-driven two-way binding directive. The visible behavior stays the same: typing in the input updates the echo below it.

## The single new concept

`ngModel` is Angular's template-driven form directive for a single field:

```html
<input type="text" [(ngModel)]="currentTitle" />
<p>You typed: {{ currentTitle }}</p>
```

The `[(...)]` syntax is Angular's "banana in a box" shorthand. It combines two bindings:

- `[ngModel]="currentTitle"` writes the component value into the input.
- `(ngModelChange)="currentTitle = $event"` writes the input value back into the component property.

This lesson deliberately switches the title draft from a signal to a plain string property:

```ts
protected currentTitle = '';
```

That is not because signals are wrong. It is because `[(ngModel)]` assigns to the expression on the right side. A signal read like `currentTitle()` is a function call, not an assignable property. Lesson 04-02 replaces this again with a reactive `FormControl`.

## Prior knowledge assumed

- Lesson 01-06: manual two-way input binding with `[value]` and `(input)`.
- Lesson 03-02: the tracker UI now lives in `Dashboard`.

## Standalone import rule

`ngModel` comes from `FormsModule`. In a standalone component, importing the directive means adding `FormsModule` to the component's `imports` array:

```ts
import { FormsModule } from '@angular/forms';

@Component({
  // ...
  imports: [FormsModule, TopicsList],
})
export class Dashboard {}
```

In Angular v15 with NgModules, you usually imported `FormsModule` in an Angular module. In this Angular 21 workspace, the page component imports the form capability it uses.

## Comparison callout

Vue's `v-model` and Angular's `[(ngModel)]` have the same basic shape: the template directive owns the two-way field wiring. React controlled inputs usually keep the two sides explicit with `value={currentTitle}` and `onChange={...}`.
