# Lesson 04-08 Task: Validate and Submit With Signal Forms

## Feature to build

Add required validation to the Signal Form and submit a valid topic through `FormRoot`.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, extend the Signal Forms import:

   ```ts
   import {
     form,
     FormField,
     FormRoot,
     required,
   } from '@angular/forms/signals';
   ```

2. Add `FormRoot` to the component imports:

   ```ts
   imports: [FormField, FormRoot, TopicsList],
   ```

3. Add validation and submission options to `form()`:

   ```ts
   protected readonly topicForm = form(
     this.topicDraft,
     (path) => {
       required(path.title, { message: 'Title is required.' });
     },
     {
       submission: {
         action: async (field) => {
           const value = field().value();

           this.topics.update((current) => [
             ...current,
             {
               id: Math.max(0, ...current.map((topic) => topic.id)) + 1,
               title: value.title,
               description: value.description,
               done: false,
             },
           ]);

           field().reset({ title: '', description: '' });
         },
       },
     },
   );
   ```

4. Bind the native form to the Signal Form:

   ```html
   <form class="topic-form" [formRoot]="topicForm">
   ```

5. Replace the temporary button with a submit button:

   ```html
   <button type="submit" [disabled]="topicForm().submitting()">
     @if (topicForm().submitting()) {
       Adding...
     } @else {
       Add topic
     }
   </button>
   ```

6. Render validation errors below the title input:

   ```html
   @if (topicForm.title().touched() && topicForm.title().invalid()) {
     @for (error of topicForm.title().errors(); track error.kind) {
       <p class="error">{{ error.message || 'Title is required.' }}</p>
     }
   }
   ```

7. Do not add `(ngSubmit)` or `(submit)` to the form. `FormRoot` owns the submit event for this lesson.

## Prediction

Before running the app, predict what happens when you click Add topic with an empty title. Does the submission action run?

## Verify

- Clicking Add topic with an empty title shows `Title is required.`
- Invalid submission does not add a topic.
- Typing a title hides the error.
- Submitting with a title appends a new topic.
- The new topic starts unchecked.
- The form resets after a valid submission.
- The component no longer imports reactive forms APIs.

## Reflection

- Why does `FormRoot` replace `(ngSubmit)` in this lesson?
- Which signal model contains the submitted title and description?
- How does validation state become rendered error text?

## End-of-module checkpoint

After this lesson the dashboard has a Signal Forms topic form. The form uses a writable signal model, field-state signals, schema-based required validation, and a submission action that appends topics.
