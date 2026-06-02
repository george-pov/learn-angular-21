# Lesson 4 Concept: Reactive Forms And User Input

## Goal

Add a form that lets the learner create custom Angular learning topics from the dashboard.

This lesson introduces Angular reactive forms in a standalone Angular app, while keeping the topic list state as a signal.

## Current project context

After Lesson 3, the app has:

- `App` as a router shell.
- `Dashboard` as the page that owns the topic tracker state.
- `TopicsList` as the child component that renders topics and emits toggle events.
- `TopicDetails` as the routed page for `/topics/:id`.
- `INITIAL_TOPICS` as starter data.

Right now, topics are fixed in code. The learner can toggle and reset progress, but cannot add a topic from the UI.

Lesson 4 adds that missing workflow.

## The Angular v21 concept

Angular has two common form styles:

- Template-driven forms, where most form behavior lives in the template.
- Reactive forms, where form state is modeled explicitly in TypeScript.

This lesson uses reactive forms because they make validation state easy to inspect and test.

The core pieces are:

```ts
import { ReactiveFormsModule } from '@angular/forms';
```

`ReactiveFormsModule` gives the template access to directives like:

- `[formGroup]`
- `formControlName`
- `(ngSubmit)`

A reactive form usually starts with a `FormGroup`:

```ts
import { FormControl, FormGroup, Validators } from '@angular/forms';

protected readonly topicForm = new FormGroup({
  title: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  }),
  description: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  }),
});
```

The form group is the model of the form. It knows:

- The current field values.
- Whether each field is valid.
- Whether a field was touched.
- Whether the whole form is valid.

Then the template binds real inputs to that model:

```html
<form [formGroup]="topicForm" (ngSubmit)="addTopic()">
  <input id="topic-title" type="text" formControlName="title" />
  <textarea id="topic-description" formControlName="description"></textarea>

  <button type="submit">Add topic</button>
</form>
```

The browser input and the TypeScript `FormControl` now stay connected.

## Forms and signals together

In this app, the form state and app state have different jobs.

The form state answers:

```txt
What has the user typed into the form?
Is the form valid?
Which validation messages should be visible?
```

The topic signal answers:

```txt
What topics should the app render?
How many are complete?
What percentage is complete?
```

That means the form should not replace the `topics` signal. Instead, the form collects a new topic, and `addTopic()` updates the signal:

```ts
protected addTopic(): void {
  if (this.topicForm.invalid) {
    this.topicForm.markAllAsTouched();
    return;
  }

  const { title, description } = this.topicForm.getRawValue();

  this.topics.update((topics) => [
    ...topics,
    {
      id: Math.max(0, ...topics.map((topic) => topic.id)) + 1,
      title,
      description,
      done: false,
    },
  ]);

  this.topicForm.reset({
    title: '',
    description: '',
  });
}
```

This is the important mental model:

```txt
FormGroup stores temporary input state.
Signal stores application state.
Submit handler moves valid form data into the signal.
```

## Angular v15 comparison

In Angular v15, you might have used reactive forms inside an `NgModule`:

```ts
@NgModule({
  imports: [ReactiveFormsModule],
})
export class AppModule {}
```

In modern standalone Angular, the component imports what its own template needs:

```ts
@Component({
  imports: [ReactiveFormsModule, TopicsList],
})
export class Dashboard {}
```

The reactive forms API is familiar, but the application structure is more local and explicit.

## React comparison

In React, you might model the form with `useState`:

```tsx
const [title, setTitle] = useState('');
```

Then the input is usually controlled:

```tsx
<input value={title} onChange={(event) => setTitle(event.target.value)} />
```

Angular reactive forms put that state into a `FormControl` instead of a `useState` variable. Validation also lives on the control, not scattered across event handlers.

## Vue comparison

In Vue, you might use `ref()` and `v-model`:

```vue
<input v-model="title" />
```

Angular reactive forms are more explicit. The equivalent field state lives in a `FormControl`, and the input connects to it with `formControlName`.

## Validation mental model

Validators do not prevent typing. They describe whether the current value is acceptable.

For example:

```ts
Validators.required
```

means an empty value is invalid.

```ts
Validators.minLength(3)
```

means a value shorter than three characters is invalid.

The component can decide what to do with invalid state:

- Disable the submit button.
- Show validation text.
- Mark fields as touched after an attempted submit.
- Keep the user on the page until valid input exists.

## What not to do yet

Do not move topic state into a service in this lesson. Keep state in `Dashboard` for now.

The next lesson will move the topic signal, computed values, and behavior into an injectable store service. That will make the dashboard and topic details page share the same source of truth.
