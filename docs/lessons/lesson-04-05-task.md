# Lesson 04-05 Task: Combine Controls Into a `FormGroup`

## Feature to build

Replace `titleControl` with `topicForm`, a `FormGroup` containing `title` and `description` controls.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, add `FormGroup` to the forms import:

   ```ts
   import {
     FormControl,
     FormGroup,
     ReactiveFormsModule,
     Validators,
   } from '@angular/forms';
   ```

2. Replace `titleControl` with `topicForm`:

   ```ts
   protected readonly topicForm = new FormGroup({
     title: new FormControl('', {
       nonNullable: true,
       validators: [Validators.required],
     }),
     description: new FormControl('', {
       nonNullable: true,
     }),
   });
   ```

3. In `dashboard.html`, replace the single-control markup with a form group:

   ```html
   <form [formGroup]="topicForm">
     <label>
       New topic title:
       <input type="text" formControlName="title" />
     </label>

     @if (
       topicForm.controls.title.touched &&
       topicForm.controls.title.hasError('required')
     ) {
       <p>Title is required.</p>
     }

     <label>
       Description:
       <textarea formControlName="description"></textarea>
     </label>

     <button type="button" [disabled]="topicForm.invalid">
       Add topic
     </button>
   </form>
   ```

4. Remove references to `titleControl` from the template.

5. Do not add `(ngSubmit)` yet. The form appears and validates, but it does not append a topic until Lesson 04-06.

## Prediction

Before running the app, predict which field controls the disabled state. Does typing only a description enable the button?

## Verify

- The title input and description textarea are visible.
- The button starts disabled.
- Typing a title enables the button, even if description is empty.
- Touching and blurring an empty title still shows `Title is required.`
- Clicking the button does not add a topic yet.

## Reflection

- Why does `topicForm.invalid` reflect the title control's validator?
- How do `formControlName` strings connect to the TypeScript object keys?
- Why is description allowed to be empty?
