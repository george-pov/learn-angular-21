# Lesson 04-01 Task: Replace the Manual Input Binding With `ngModel`

## Feature to build

Import `FormsModule`, bind the title input with `[(ngModel)]`, and keep the same live echo from Lesson 01-06.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`

## Steps

1. In `dashboard.ts`, import `FormsModule`:

   ```ts
   import { FormsModule } from '@angular/forms';
   ```

2. Add `FormsModule` to the component imports. Keep `TopicsList` there:

   ```ts
   @Component({
     selector: 'app-dashboard',
     templateUrl: './dashboard.html',
     styleUrl: './dashboard.scss',
     imports: [FormsModule, TopicsList],
   })
   export class Dashboard {
     // ...
   }
   ```

3. Replace the `currentTitle` signal with a plain string property:

   ```ts
   protected currentTitle = '';
   ```

   Leave the `topics` signal and `progressLabel` computed value alone.

4. In `dashboard.html`, replace the manual input binding:

   ```html
   <label>
     New topic title:
     <input type="text" [(ngModel)]="currentTitle" />
   </label>
   <p>You typed: {{ currentTitle }}</p>
   ```

5. Remove the old `[value]="currentTitle()"` and `(input)="currentTitle.set(...)"` bindings.

## Prediction

Before running the app, predict what the echo paragraph shows before typing and what it shows after entering `forms`.

## Verify

- The dashboard still renders at `/`.
- Typing in the input updates the echo live.
- The topic list and checkboxes still work.
- There is no `(input)` handler in the template.
- `FormsModule` is imported by `Dashboard`, not by `App`.

## Reflection

- What did `[(ngModel)]` replace from the manual binding?
- Why did `currentTitle` become a string property instead of staying a signal?
- How does this compare with Vue's `v-model`?
