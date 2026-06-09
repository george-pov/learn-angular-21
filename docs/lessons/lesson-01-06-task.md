# Lesson 01-06 Task: Echo Text From a Signal

## Feature to build

A text input under the existing UI. As the user types, the text appears in a paragraph below the input.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app.ts`, add a string signal:

   ```ts
   protected readonly currentTitle = signal('');
   ```

2. In `app.html`, add the input and the echo paragraph below the existing content:

   ```html
   <label>
     New topic title:
     <input
       type="text"
       [value]="currentTitle()"
       (input)="currentTitle.set($any($event.target).value)"
     />
   </label>
   <p>You typed: {{ currentTitle() }}</p>
   ```

## Prediction

What does the page show before you type anything? What does the echo say after you type `signals`?

## Verify

- The input renders empty.
- Typing in the input updates the echo character by character.
- Clearing the input empties the echo.
- The progress label, the message, and the button still work as before.

## Reflect

- Why are *two* bindings needed for "two-way" behavior?
- What would break if you only kept `[value]="currentTitle()"` and removed the `(input)` handler?
- What would break the other way around?
- How does this connect to React's controlled inputs and Vue's `v-model`?

## End-of-module checkpoint

After this lesson the dashboard shows: title, intro, progress label, completion message, "Mark one complete" button, text input, and live echo. All state lives in three signals in `App`. There are no arrays, no child components, and no router. Module 02 will introduce those.
