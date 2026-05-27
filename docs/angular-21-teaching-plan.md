# Angular 21 Teaching Plan

This plan is for a developer who has used Angular v15, is comfortable with React and Vue.js, and wants to learn how modern Angular applications are built in Angular v21.

The project should grow through small examples. Each lesson should explain one modern Angular idea, compare it with Angular v15, and connect it to a similar React or Vue concept when useful.

## Learning style

- Keep every lesson tied to a runnable change in this repository.
- Prefer small components and plain data before adding services, HTTP, forms, or routing.
- Explain the mental model first, then show code.
- Ask the learner to predict what the UI will do before running the app.
- Point out what is new since Angular v15 and what is simply Angular fundamentals used in a newer style.

## Example app direction

Build a small learning dashboard for tracking Angular 21 concepts. This is intentionally simple, but it gives us enough surface area to learn real application development:

- A list of Angular topics to learn.
- A way to mark each topic as learned.
- A computed progress summary.
- A details route for one topic.
- A small form to add custom topics.
- Later lessons can add persistence, HTTP, validation, testing, and lazy loading.

## Lesson 1: Standalone component, signals, and template control flow

Goal: replace the placeholder UI with a tiny interactive learning tracker.

Concepts:

- `signal()` stores local reactive state.
- `computed()` derives state from other signals.
- Template events call component methods.
- `@for` renders lists without `*ngFor`.
- `@if` conditionally renders content without `*ngIf`.

Angular v15 comparison:

- In Angular v15, you would often store mutable component fields and use `*ngFor` / `*ngIf`.
- In Angular v21, signals make state changes explicit and give Angular a clearer reactive model.
- `@for` and `@if` are built-in template syntax, not structural directives.

React comparison:

- `signal()` is similar to `useState`, but reading a signal uses a function call like `topics()` or `completedCount()`.
- `computed()` is similar to `useMemo`, but it tracks signal dependencies automatically.

Vue comparison:

- `signal()` feels close to `ref()`.
- `computed()` maps closely to Vue `computed()`.

Example component shape:

```ts
import { Component, computed, signal } from '@angular/core';

type Topic = {
  id: number;
  title: string;
  done: boolean;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly topics = signal<Topic[]>([
    { id: 1, title: 'Standalone components', done: true },
    { id: 2, title: 'Signals', done: false },
    { id: 3, title: 'New template control flow', done: false },
  ]);

  protected readonly completedCount = computed(
    () => this.topics().filter((topic) => topic.done).length,
  );

  protected toggleTopic(id: number): void {
    this.topics.update((topics) =>
      topics.map((topic) =>
        topic.id === id ? { ...topic, done: !topic.done } : topic,
      ),
    );
  }
}
```

Example template shape:

```html
<main>
  <h1>Angular 21 Learning Tracker</h1>

  <p>{{ completedCount() }} of {{ topics().length }} topics complete</p>

  <ul>
    @for (topic of topics(); track topic.id) {
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
    }
  </ul>

  @if (completedCount() === topics().length) {
    <p>All topics complete. Time to build something slightly harder.</p>
  }
</main>
```

Exercise:

1. Predict what happens when the checkbox for `Signals` is clicked.
2. Add a fourth topic called `Deferrable views`.
3. Mark all topics as complete and explain why the final message appears.
4. Compare the signal update with how you would update an array in React state.

## Lesson 2: Application structure and standalone imports

Goal: split the tracker into smaller standalone components.

Concepts:

- Root component as the app shell.
- Feature component for the topic list.
- Passing data with inputs.
- Sending events with outputs.
- Choosing when to keep state in a parent component.

Practice:

- Create a `TopicList` component.
- Move list rendering into that component.
- Keep the signal state in the root component first.
- Discuss when a service would be useful.

## Lesson 3: Routing and feature pages

Goal: add routes for dashboard and topic details.

Concepts:

- `Routes` configuration.
- `provideRouter(routes)` in `app.config.ts`.
- `RouterOutlet` in the root template.
- Route parameters.
- Lazy loading a route-level component.

Practice:

- Add a dashboard route.
- Add a topic details route like `/topics/:id`.
- Link from each topic to its detail page.

## Lesson 4: Forms

Goal: add a form for creating custom learning topics.

Concepts:

- Template-driven forms versus reactive forms.
- Validation basics.
- Form state and user feedback.
- When forms should update signals.

Practice:

- Add a topic input.
- Prevent empty topics.
- Show validation feedback.
- Add the new topic to the signal array.

## Lesson 5: Services, dependency injection, and persistence

Goal: move topic state into an injectable service.

Concepts:

- `inject()` function.
- Service lifetime.
- Signals inside services.
- Keeping component logic thin.

Practice:

- Create a `TopicStore` service.
- Move `topics`, `completedCount`, and `toggleTopic` into the service.
- Persist topics to `localStorage`.

## Lesson 6: HTTP and RxJS in modern Angular

Goal: load starter topics from an API-like source.

Concepts:

- HTTP client setup.
- Observables for async streams.
- Signals versus RxJS.
- Converting between observables and signals when appropriate.

Practice:

- Add `provideHttpClient()`.
- Create a topic API service.
- Load initial topics.
- Explain which state should stay as an observable and which should become a signal.

## Lesson 7: Deferrable views

Goal: defer loading a secondary part of the UI.

Concepts:

- `@defer`.
- Loading, placeholder, and error states.
- When deferring improves the user experience.

Practice:

- Add a topic notes or tips panel.
- Defer that panel until the user interacts with the page.
- Compare this with lazy components in React and async components in Vue.

## Lesson 8: Testing

Goal: test the tracker behavior.

Concepts:

- Component tests.
- Testing signals through user-visible behavior.
- Avoiding tests that know too much about implementation details.

Practice:

- Test that topics render.
- Test that clicking a checkbox updates the completed count.
- Test the all-complete message.

## Lesson 9: Build and production thinking

Goal: understand what changes when the app is built for production.

Concepts:

- `npm run build`.
- Angular build output.
- TypeScript checks.
- Bundle size awareness.
- Lazy loading and deferrable views as performance tools.

Practice:

- Run a production build.
- Fix any compile errors.
- Inspect the generated output at a high level.

## Suggested weekly rhythm

1. Read the lesson goal.
2. Review the current code before changing it.
3. Make the smallest working change.
4. Run the app.
5. Explain the result in Angular terms.
6. Compare the idea with Angular v15, React, and Vue.
7. Commit or note the lesson outcome before moving on.

## First next step

Start with Lesson 1 by replacing `src/app/app.html` and `src/app/app.ts` with the tracker example. After that, run the app with:

```bash
npm start
```

Then open the app and interact with the checkboxes. The important part is not the UI yet; the important part is seeing how a signal update changes derived state and template output.
