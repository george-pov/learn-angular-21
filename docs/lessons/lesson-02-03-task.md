# Lesson 02-03 Task: Add a Checkbox Per Topic

## Feature to build

A checkbox next to each topic title. Clicking it flips that topic's `done`. The progress label and completion message update.

## Files to edit

- `src/app/app.ts`
- `src/app/app.html`

## Steps

1. In `app.ts`, add the toggle method:

   ```ts
   protected toggleTopic(id: number): void {
     this.topics.update((current) =>
       current.map((topic) =>
         topic.id === id ? { ...topic, done: !topic.done } : topic,
       ),
     );
   }
   ```

2. In `app.html`, replace the `<li>{{ topic.title }}</li>` inside `@for` with:

   ```html
   <li>
     <label>
       <input
         type="checkbox"
         [checked]="topic.done"
         (change)="toggleTopic(topic.id)"
       />
       {{ topic.title }}
     </label>
   </li>
   ```

## Prediction

What does the label say after you check the second topic? After you uncheck the first? After all three are checked?

## Verify

- Each topic row shows a checkbox plus its title.
- The first row starts checked.
- Toggling any row updates the progress label.
- When all three are checked, the message flips to "All topics complete."

## Reflect

- Why does the page re-render when `topics` is `.update`-d?
- Why would `current.find(t => t.id === id).done = !current.find(...).done` followed by `this.topics.set(current)` fail to update the UI?
- Why is creating a new object for the changed row (`{ ...topic, done: !topic.done }`) safer than mutating `topic.done` in place?
