# Lesson 4 Task: Add A Custom Topic Form

## Feature to build

Add a form on the dashboard that lets the learner create a new topic.

The new topic should:

- Have a title.
- Have a description.
- Start with `done: false`.
- Appear immediately in `TopicsList`.
- Affect the total topic count and percentage.

## Files to edit

- [ ] `src/app/dashboard/dashboard.ts`
- [ ] `src/app/dashboard/dashboard.html`
- [ ] `src/app/dashboard/dashboard.scss`
- [ ] `src/app/topics-list/topics-list.scss`

## Step 1: Import reactive forms into `Dashboard`

- [ ] Open `src/app/dashboard/dashboard.ts`.
- [ ] Import `FormControl`, `FormGroup`, `ReactiveFormsModule`, and `Validators`.
- [ ] Add `ReactiveFormsModule` to the component `imports` array.

Suggested imports:

```ts
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
```

Suggested component imports:

```ts
@Component({
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, TopicsList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
```

## Step 2: Add the form model

- [ ] Add a `topicForm` property to the `Dashboard` class.
- [ ] Add a `title` control.
- [ ] Add a `description` control.
- [ ] Make `title` required and at least 3 characters long.
- [ ] Make `description` required.

Suggested code:

```ts
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

## Step 3: Add the submit handler

- [ ] Add an `addTopic()` method to `Dashboard`.
- [ ] If the form is invalid, call `markAllAsTouched()` and stop.
- [ ] Read values with `getRawValue()`.
- [ ] Create the next topic id from the current topic list.
- [ ] Update the `topics` signal with a new array.
- [ ] Reset the form after adding the topic.

Suggested code:

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

## Step 4: Add the form template

- [ ] Open `src/app/dashboard/dashboard.html`.
- [ ] Change the intro label from `Lesson 1` to `Lesson 4`.
- [ ] Update the intro copy so it mentions adding topics with a reactive form.
- [ ] Add a new section before the topic list.
- [ ] Bind the form with `[formGroup]="topicForm"`.
- [ ] Submit with `(ngSubmit)="addTopic()"`.
- [ ] Bind title and description inputs with `formControlName`.
- [ ] Show validation messages only after a field has been touched.

Suggested template:

```html
<section class="form-panel" aria-labelledby="add-topic-heading">
  <h2 id="add-topic-heading">Add a topic</h2>

  <form class="topic-form" [formGroup]="topicForm" (ngSubmit)="addTopic()" novalidate>
    <label for="topic-title">Title</label>
    <input id="topic-title" type="text" formControlName="title" />

    @if (
      topicForm.controls.title.touched &&
      topicForm.controls.title.hasError('required')
    ) {
      <p class="form-error">Title is required.</p>
    }

    @if (
      topicForm.controls.title.touched &&
      topicForm.controls.title.hasError('minlength')
    ) {
      <p class="form-error">Title must be at least 3 characters.</p>
    }

    <label for="topic-description">Description</label>
    <textarea id="topic-description" formControlName="description"></textarea>

    @if (
      topicForm.controls.description.touched &&
      topicForm.controls.description.hasError('required')
    ) {
      <p class="form-error">Description is required.</p>
    }

    <button type="submit" [disabled]="topicForm.invalid">
      Add topic
    </button>
  </form>
</section>
```

## Step 5: Add form styles

- [ ] Open `src/app/dashboard/dashboard.scss`.
- [ ] Include `.form-panel` in the same card styling as the other dashboard panels.
- [ ] Add styles for `.topic-form`, inputs, textarea, button, and `.form-error`.

Suggested starting point:

```scss
.intro,
.progress-panel,
.form-panel,
.topic-panel {
  border: 1px solid #d9e2ec;
  border-radius: 8px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.topic-form {
  display: grid;
  gap: 10px;
}

.topic-form input,
.topic-form textarea {
  width: 100%;
  border: 1px solid #bcccdc;
  border-radius: 6px;
  padding: 10px 12px;
  font: inherit;
}

.topic-form textarea {
  min-height: 88px;
  resize: vertical;
}

.form-error {
  margin: -4px 0 4px;
  color: #b42318;
  font-size: 0.9rem;
}
```

## Step 6: Check component-scoped list styles

- [ ] Open `src/app/topics-list/topics-list.scss`.
- [ ] Confirm list styles live there, not in `dashboard.scss` or `app.scss`.
- [ ] Move `.topic-list`, `.topic-item`, and related topic-list styles into `topics-list.scss` if needed.

Why: Angular component styles are scoped to the component template they belong to.

## Prediction prompt

Before running the app, answer these:

- [ ] If the form title is empty, should `addTopic()` update the `topics` signal?
- [ ] When a valid topic is added, what should happen to `topics().length`?
- [ ] If there are 4 topics and 1 is complete, what percentage should show?
- [ ] After adding a fifth incomplete topic, what percentage should show?

## Verification checklist

- [ ] The app builds successfully.
- [ ] The dashboard shows an add-topic form.
- [ ] Submitting an empty form shows validation messages.
- [ ] A title shorter than 3 characters shows a validation message.
- [ ] A valid topic appears in the topic list.
- [ ] The new topic starts unchecked.
- [ ] The progress count includes the new topic.
- [ ] The percentage changes when the new topic is added.
- [ ] The reset button still marks all topics as incomplete.
- [ ] Existing topic links still navigate to topic details.

## Reflection questions

- [ ] What state belongs to the `FormGroup`?
- [ ] What state belongs to the `topics` signal?
- [ ] Why does `addTopic()` create a new array instead of pushing into the old one?
- [ ] How is `FormControl` similar to React controlled input state?
- [ ] How is `formControlName` different from Vue `v-model`?
- [ ] Why does the form reset after a successful submit?

## Stretch task

- [ ] Add a second validation rule that prevents duplicate topic titles.
- [ ] Add a clear button that resets the form without adding a topic.
- [ ] Show a small success message after adding a topic.
