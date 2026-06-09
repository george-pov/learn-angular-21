# Lesson 04-07 Task: Introduce Experimental Signal Forms

## Feature to build

Replace the reactive form bindings with Signal Forms field bindings while keeping the visible title and description fields.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, remove reactive forms imports:

   ```ts
   FormControl
   FormGroup
   ReactiveFormsModule
   Validators
   ```

2. Import `signal` from Angular if it is not already imported:

   ```ts
   import { Component, signal } from '@angular/core';
   ```

3. Import Signal Forms APIs:

   ```ts
   import { form, FormField } from '@angular/forms/signals';
   ```

4. Replace `ReactiveFormsModule` in the component imports with `FormField`:

   ```ts
   imports: [FormField, TopicsList],
   ```

5. Add a draft model type above the component:

   ```ts
   type TopicDraft = {
     title: string;
     description: string;
   };
   ```

6. Replace `topicForm = new FormGroup(...)` with a signal model and signal form:

   ```ts
   protected readonly topicDraft = signal<TopicDraft>({
     title: '',
     description: '',
   });

   protected readonly topicForm = form(this.topicDraft);
   ```

7. Temporarily remove the `addTopic()` method. Lesson 04-08 adds Signal Forms submission.

8. In `dashboard.html`, replace the reactive form markup:

   ```html
   <form class="topic-form">
     <label>
       New topic title
       <input type="text" [formField]="topicForm.title" />
     </label>

     <p>You typed: {{ topicForm.title().value() }}</p>

     <label>
       Description
       <textarea [formField]="topicForm.description"></textarea>
     </label>

     <button type="button">Add topic</button>
   </form>
   ```

## Prediction

Before running the app, predict whether `topicDraft().title` changes when you type into the title field.

## Verify

- The dashboard still renders at `/`.
- The title and description fields are visible.
- Typing in the title field updates `You typed: ...`.
- The component imports `FormField`.
- The component no longer imports `ReactiveFormsModule`.
- The Add topic button does not submit yet.

## Reflection

- What is the source of truth for the form data now?
- Why does `[formField]="topicForm.title"` not need a string control name?
- Why do Signal Forms field reads use `()` in the template?
