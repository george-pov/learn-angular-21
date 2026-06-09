# Lesson 04-04 Task: Show Validation Feedback After Interaction

## Feature to build

Show `Title is required.` only after the title input has been focused and blurred while empty.

## Files to edit

- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.html`, add this block below the title input and before the button:

   ```html
   @if (titleControl.touched && titleControl.hasError('required')) {
     <p class="error">Title is required.</p>
   }
   ```

2. Leave the button binding from Lesson 04-03 unchanged:

   ```html
   <button type="button" [disabled]="titleControl.invalid">
     Add topic
   </button>
   ```

3. Do not add submit handling yet.

## Prediction

Before running the app, predict what happens in each case:

- Load the page and do nothing.
- Click into the empty input, then click somewhere else.
- Type a title, then clear it.

## Verify

- The error message is not visible on first render.
- The message appears after the empty input is blurred.
- Typing a value hides the message and enables the button.
- Clearing the value after touch shows the message again.
- The topic list is unchanged.

## Reflection

- Why is `touched` a better display condition than `invalid` by itself?
- Which browser event makes a control touched?
- What does `hasError('required')` check?
