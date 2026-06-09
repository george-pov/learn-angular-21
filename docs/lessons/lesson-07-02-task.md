# Lesson 07-02 Task: Add Placeholder, Loading, and Error Blocks

## Feature to build

Move the `Open notes` button into `@placeholder`, then add loading and error states for the deferred notes panel.

## Files to edit

- `src/app/topic-details/topic-details.html`

## Steps

1. Replace the separate button and deferred block with this full block:

   ```html
   @defer (on interaction(openNotes)) {
     <app-topic-notes [topicId]="id()" />
   } @placeholder {
     <button #openNotes type="button">Open notes</button>
   } @loading {
     <p>Loading notes...</p>
   } @error {
     <p>Could not load notes.</p>
   }
   ```

2. Keep the `TopicNotes` import in `topic-details.ts`.

3. Do not add component state. The template blocks own the view states.

## Prediction

Before running the app, predict what happens to the `Open notes` button after the notes panel renders.

## Verify

- `/topics/1` initially shows `Open notes`.
- Clicking the button replaces the placeholder with the notes panel.
- `Loading notes...` and `Could not load notes.` are present in the template.
- The notes panel still receives the route id.

## Reflection

- Which block renders before interaction?
- Which block renders after successful load?
- Why is the button better modeled as a placeholder?
