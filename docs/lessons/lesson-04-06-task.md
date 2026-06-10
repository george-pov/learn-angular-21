# Lesson 04-06 Task: Submit the Reactive Form and Append a Topic

## Feature to build

Submit a valid reactive form, append a topic to the local topic signal, reset the form, and show validation feedback for invalid submissions.

## Files to edit

- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`
- `src/app/topics-list/topics-list.html`

## Steps

1. Add the submit handler to `Dashboard`:

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

2. In `dashboard.html`, add `(ngSubmit)` to the form and change the button to a submit button:

   ```html
   <form class="topic-form" [formGroup]="topicForm" (ngSubmit)="addTopic()">
     <!-- existing labels and validation message -->

     <button type="submit" [disabled]="topicForm.invalid">
       Add topic
     </button>
   </form>
   ```

3. In `topics-list.html`, render the description under each title:

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
