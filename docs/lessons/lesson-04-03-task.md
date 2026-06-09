# Lesson 04-03 Task: Add a Required Validator

## Feature to build

Add `Validators.required` to the title control and disable the Add topic button while the title is empty.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, add `Validators` to the forms import:

   ```ts
   import {
     FormControl,
     ReactiveFormsModule,
     Validators,
   } from '@angular/forms';
   ```

2. Add the required validator to `titleControl`:

   ```ts
   protected readonly titleControl = new FormControl('', {
     nonNullable: true,
     validators: [Validators.required],
   });
   ```

3. In `dashboard.html`, add a button below the echo paragraph:

   ```html
   <button type="button" [disabled]="titleControl.invalid">
     Add topic
   </button>
   ```

   The button does not add a topic yet. It only makes validity visible.

## Prediction

Before running the app, predict whether the button starts enabled or disabled. What changes after you type one character?

## Verify

- The button starts disabled when the input is empty.
- Typing any non-empty value enables the button.
- Clearing the input disables the button again.
- The echo paragraph still updates.
- No error message appears yet. That comes in Lesson 04-04.

## Reflection

- Why does the button read `titleControl.invalid` instead of checking the input text directly?
- What form state changed when you typed?
- How would you have written this rule by hand in React?
