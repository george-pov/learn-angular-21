# Lesson 04-02 Task: Introduce a Single Reactive `FormControl`

## Feature to build

Replace `ngModel` with a non-nullable `FormControl` and render the control's current value.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, replace the `FormsModule` import with reactive forms imports:

   ```ts
   import { FormControl, ReactiveFormsModule } from '@angular/forms';
   ```

2. In the component metadata, replace `FormsModule` with `ReactiveFormsModule`:

   ```ts
   imports: [ReactiveFormsModule, TopicsList],
   ```

3. Replace the `currentTitle` string property with a `FormControl`:

   ```ts
   protected readonly titleControl = new FormControl('', {
     nonNullable: true,
   });
   ```

4. In `dashboard.html`, replace `[(ngModel)]` with `[formControl]`:

   ```html
   <label>
     New topic title:
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
- The component no longer imports `FormsModule`.
- There is still only one form field. Validation and submission come later.

## Reflection

- What does `titleControl.value` represent?
- Why is the control declared in TypeScript instead of only in the template?
- What does `nonNullable: true` protect you from?
