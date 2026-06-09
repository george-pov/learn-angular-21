# Lesson 04-06 Task: Submit the Form and Append a Topic

## Feature to build

Submit a valid form, append a topic to the local topic signal, reset the form, and show validation feedback for invalid submissions.

## Files to edit

- `src/app/topic.ts`
- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`
- `src/app/topics-list/topics-list.html`

## Steps

1. In `topic.ts`, add a description to the model:

   ```ts
   export type Topic = {
     id: number;
     title: string;
     description: string;
     done: boolean;
   };
   ```

2. In `dashboard.ts`, update the seed topics so each topic has a description:

   ```ts
   protected readonly topics = signal<Topic[]>([
     {
       id: 1,
       title: 'Standalone components',
       description: 'Understand component metadata and standalone imports.',
       done: true,
     },
     {
       id: 2,
       title: 'Signals',
       description: 'Use signals for local reactive state.',
       done: false,
     },
     {
       id: 3,
       title: 'Template control flow',
       description: 'Render branches and lists with modern template syntax.',
       done: false,
     },
   ]);
   ```

3. Add the submit handler to `Dashboard`:

   ```ts
   protected addTopic(): void {
     if (this.topicForm.invalid) {
       this.topicForm.markAllAsTouched();
       return;
     }

     const value = this.topicForm.getRawValue();

     this.topics.update((current) => [
       ...current,
       {
         id: Math.max(0, ...current.map((topic) => topic.id)) + 1,
         title: value.title,
         description: value.description,
         done: false,
       },
     ]);

     this.topicForm.reset({ title: '', description: '' });
   }
   ```

4. In `dashboard.html`, add `(ngSubmit)` to the form and change the button to a submit button:

   ```html
   <form [formGroup]="topicForm" (ngSubmit)="addTopic()">
     <!-- existing labels and validation message -->

     <button type="submit" [disabled]="topicForm.invalid">
       Add topic
     </button>
   </form>
   ```

5. In `topics-list.html`, render the description under each title:

   ```html
   <p>{{ topic.description }}</p>
   ```

   Put it inside the existing `<li>` after the title link or title text.

## Prediction

Before running the app, predict what happens after submitting `Reactive forms` with a short description. What id will the new topic receive?

## Verify

- The initial list still renders three topics.
- Each existing topic shows a description.
- Leaving the title empty still keeps the button disabled.
- Touching and blurring the empty title still shows `Title is required.`
- Submitting with a title appends a fourth topic.
- The new topic starts unchecked.
- The progress label changes from `1 of 3 topics complete` to `1 of 4 topics complete`.
- The form resets after a valid submission.

## Reflection

- Why does the handler still check `topicForm.invalid` when the button is disabled?
- Why does the signal update return a new array instead of mutating the existing one?
- What part of this lesson is Angular forms, and what part is ordinary TypeScript list update logic?

## End-of-module checkpoint

After this lesson the dashboard has a reactive form with title and description fields. Submitting the form adds a new topic to the list. Module 05 will move topic state out of `Dashboard` and into an injectable store service.
