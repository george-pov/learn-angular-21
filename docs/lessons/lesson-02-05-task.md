# Lesson 02-05 Task: Pass Topics Into `TopicsList`

## Feature to build

`TopicsList` receives the topics array from `App` instead of holding its own copy. State ownership lives in one place again.

## Files to edit

- `src/app/topics-list/topics-list.ts`
- `src/app/topics-list/topics-list.html`
- `src/app/app.html`

## Steps

1. In `topics-list.ts`, replace the hardcoded topics field with a signal input:

   ```ts
   import { Component, input } from '@angular/core';
   import { Topic } from '../topic';

   @Component({
     selector: 'app-topics-list',
     templateUrl: './topics-list.html',
     styleUrl: './topics-list.scss',
   })
   export class TopicsList {
     readonly topics = input.required<Topic[]>();
   }
   ```

2. In `topics-list.html`, change `topics` to `topics()`:

   ```html
   <ul>
     @for (topic of topics(); track topic.id) {
       <li>
         <label>
           <input type="checkbox" [checked]="topic.done" disabled />
           {{ topic.title }}
         </label>
       </li>
     }
   </ul>
   ```

3. In `app.html`, bind the input:

   ```html
   <app-topics-list [topics]="topics()" />
   ```

## Prediction

What will happen if you forget the brackets in `[topics]="topics()"` and write `topics="topics()"` instead?

## Verify

- The page still shows three topics.
- The progress label and message still update correctly.
- Removing the `[topics]` binding causes a compile error.
- Try `topics="topics()"` once and read the error message before reverting.

## Reflect

- Why is `input.required<Topic[]>()` preferred over `input<Topic[]>([])` here?
- What is the relationship between `input()` and a React prop?
- What problem did decorator-based `@Input()` have that signal inputs solve?
