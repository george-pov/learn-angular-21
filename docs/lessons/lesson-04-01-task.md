# Lesson 04-01 Task: Keep a Manual Signal Input as the Baseline

## Feature to build

Keep the title draft as a signal and render a live echo from the manual input binding.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, make sure `signal` is imported from Angular:

   ```ts
   import { Component, signal } from '@angular/core';
   ```

   Keep any existing imports the dashboard already needs.

2. Add a title draft signal to `Dashboard`:

   ```ts
   protected readonly currentTitle = signal('');
   ```

3. In `dashboard.html`, add the draft input near the form area:

   ```html
   <label>
     New topic title
     <input
       type="text"
       [value]="currentTitle()"
       (input)="currentTitle.set($any($event.target).value)"
     />
   </label>

   <p>You typed: {{ currentTitle() }}</p>
   ```

4. Do not add validation or submission yet.

## Prediction

Before running the app, predict which parts of the template re-render when you type `forms`.

## Verify

- The dashboard still renders at `/`.
- Typing in the input updates the echo live.
- The topic list and checkboxes still work.
- The draft value is stored in a signal.
- There is still no validation message and no submit behavior.

## Reflection

- Which binding moves data from the signal to the DOM?
- Which binding moves data from the DOM to the signal?
- Why is this a useful baseline before learning Angular forms APIs?
