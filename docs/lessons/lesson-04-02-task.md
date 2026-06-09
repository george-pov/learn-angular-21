# Lesson 04-02 Task: Introduce a Single Reactive `FormControl`

## Feature to build

Replace the manual signal input with a non-nullable `FormControl` and render the control's current value.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, import reactive forms pieces:

   ```ts
   import { FormControl, ReactiveFormsModule } from '@angular/forms';
   ```

2. Add `ReactiveFormsModule` to the component imports. Keep `TopicsList` there:

   ```ts
   imports: [ReactiveFormsModule, TopicsList],
   ```

3. Replace `currentTitle` with a `FormControl`:

   ```ts
   protected readonly titleControl = new FormControl('', {
     nonNullable: true,
   });
   ```

4. In `dashboard.html`, replace the manual input binding with `[formControl]`:

   ```html
   <label>
     New topic title
     <input type="text" [formControl]="titleControl" />
   </label>

   <p>You typed: {{ titleControl.value }}</p>
   ```

5. Remove all remaining references to `currentTitle`.

## Prediction

Before running the app, predict whether the echo paragraph will still update as you type. What object now owns the value?

## Verify

- The dashboard still renders at `/`.
- Typing in the input updates `You typed: ...`.
- The component imports `ReactiveFormsModule`.
- There is still only one form field.
- Validation and submission have not been added yet.

## Reflection

- What does `titleControl.value` represent?
- Why is the control declared in TypeScript instead of only in the template?
- What does the forms directive do between the input and the control?
