# Lesson 5 Task: Move Topic State Into A Store Service

## Feature to build

Create a shared `TopicStore` service.

After this lesson:

- Dashboard should read topics from `TopicStore`.
- Dashboard should call `TopicStore` methods to add, toggle, and reset topics.
- Topic details should read from the same `TopicStore`.
- Custom topics should persist in `localStorage`.
- Refreshing the browser should keep added topics and progress state.

## Files to create

- [ ] `src/app/topic-store.ts`

## Files to edit

- [ ] `src/app/dashboard/dashboard.ts`
- [ ] `src/app/topic-details/topic-details.ts`
- [ ] `src/app/topic-details/topic-details.html`

## Step 1: Create `TopicStore`

- [ ] Create `src/app/topic-store.ts`.
- [ ] Import `computed`, `effect`, `Injectable`, and `signal` from `@angular/core`.
- [ ] Import `Topic` and `INITIAL_TOPICS`.
- [ ] Add `@Injectable({ providedIn: 'root' })`.
- [ ] Create a private writable signal.
- [ ] Expose a public read-only signal.

Suggested starting point:

```ts
import { computed, effect, Injectable, signal } from '@angular/core';
import { Topic } from './topic';
import { INITIAL_TOPICS } from './topics';

@Injectable({
  providedIn: 'root',
})
export class TopicStore {
  private readonly storageKey = 'learn-angular-21-topics';

  private readonly topicsSignal = signal<Topic[]>(this.loadTopics());
  readonly topics = this.topicsSignal.asReadonly();

  readonly completedCount = computed(
    () => this.topics().filter((topic) => topic.done).length,
  );

  readonly completedPercent = computed(() => {
    const total = this.topics().length;
    return total === 0 ? 0 : Math.round((this.completedCount() / total) * 100);
  });

  readonly allTopicsComplete = computed(
    () => this.completedCount() === this.topics().length,
  );

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.topicsSignal()));
    });
  }

  addTopic(title: string, description: string): void {
    this.topicsSignal.update((topics) => [
      ...topics,
      {
        id: Math.max(0, ...topics.map((topic) => topic.id)) + 1,
        title,
        description,
        done: false,
      },
    ]);
  }

  toggleTopic(id: number): void {
    this.topicsSignal.update((topics) =>
      topics.map((topic) =>
        topic.id === id ? { ...topic, done: !topic.done } : topic,
      ),
    );
  }

  resetProgress(): void {
    this.topicsSignal.update((topics) =>
      topics.map((topic) => ({ ...topic, done: false })),
    );
  }

  topicById(id: number): Topic | undefined {
    return this.topics().find((topic) => topic.id === id);
  }

  private loadTopics(): Topic[] {
    const storedTopics = localStorage.getItem(this.storageKey);

    if (!storedTopics) {
      return this.initialTopics();
    }

    try {
      return JSON.parse(storedTopics) as Topic[];
    } catch {
      return this.initialTopics();
    }
  }

  private initialTopics(): Topic[] {
    return INITIAL_TOPICS.map((topic) => ({ ...topic }));
  }
}
```

## Step 2: Inject `TopicStore` into `Dashboard`

- [ ] Open `src/app/dashboard/dashboard.ts`.
- [ ] Remove `computed`, `signal`, `INITIAL_TOPICS`, and `Topic` imports if they are no longer used.
- [ ] Import `inject` from `@angular/core`.
- [ ] Import `TopicStore`.
- [ ] Inject the store.

Suggested imports:

```ts
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicStore } from '../topic-store';
import { TopicsList } from '../topics-list/topics-list';
```

Suggested store connection:

```ts
private readonly topicStore = inject(TopicStore);

protected readonly topics = this.topicStore.topics;
protected readonly completedCount = this.topicStore.completedCount;
protected readonly completedPercent = this.topicStore.completedPercent;
protected readonly allTopicsComplete = this.topicStore.allTopicsComplete;
```

## Step 3: Delegate dashboard behavior to the store

- [ ] Update `addTopic()` so it calls `this.topicStore.addTopic(title, description)`.
- [ ] Update `toggleTopic()` so it calls `this.topicStore.toggleTopic(id)`.
- [ ] Update `resetProgress()` so it calls `this.topicStore.resetProgress()`.
- [ ] Keep the reactive form in `Dashboard`.

Suggested code:

```ts
protected addTopic(): void {
  if (this.topicForm.invalid) {
    this.topicForm.markAllAsTouched();
    return;
  }

  const { title, description } = this.topicForm.getRawValue();

  this.topicStore.addTopic(title, description);

  this.topicForm.reset({
    title: '',
    description: '',
  });
}

protected resetProgress(): void {
  this.topicStore.resetProgress();
}

protected toggleTopic(id: number): void {
  this.topicStore.toggleTopic(id);
}
```

## Step 4: Inject `TopicStore` into `TopicDetails`

- [ ] Open `src/app/topic-details/topic-details.ts`.
- [ ] Import `inject` from `@angular/core`.
- [ ] Import `RouterLink` if the template uses `routerLink`.
- [ ] Import `TopicStore`.
- [ ] Add `RouterLink` to the component imports if needed.
- [ ] Replace `INITIAL_TOPICS.find(...)` with `this.topicStore.topicById(...)`.

Suggested code:

```ts
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopicStore } from '../topic-store';

@Component({
  selector: 'app-topic-details',
  imports: [RouterLink],
  templateUrl: './topic-details.html',
  styleUrl: './topic-details.scss',
})
export class TopicDetails {
  private readonly topicStore = inject(TopicStore);

  readonly id = input.required<string>();

  protected readonly topicId = computed(() => Number(this.id()));

  protected readonly topic = computed(() =>
    this.topicStore.topicById(this.topicId()),
  );
}
```

## Step 5: Show the stored topic state in details

- [ ] Open `src/app/topic-details/topic-details.html`.
- [ ] Keep the existing fallback for unknown ids.
- [ ] Add a line that shows whether the topic is complete.

Suggested detail block:

```html
@if (topic(); as topic) {
  <h1>{{ topic.title }}</h1>
  <p>{{ topic.description }}</p>
  <p>Topic id: {{ topic.id }}</p>
  <p>Status: {{ topic.done ? 'Complete' : 'Not complete' }}</p>
} @else {
  <h1>Topic not found</h1>
  <p>No topic exists for id {{ id() }}.</p>
}
```

## Step 6: Think through persistence

- [ ] Add a custom topic from the dashboard.
- [ ] Refresh the browser.
- [ ] Confirm the custom topic is still visible.
- [ ] Toggle a topic.
- [ ] Refresh the browser.
- [ ] Confirm the completion state is still visible.

## Prediction prompt

Before running the app, answer these:

- [ ] How many `TopicStore` instances should exist when `providedIn: 'root'` is used?
- [ ] If `Dashboard` adds a topic, why can `TopicDetails` find that topic?
- [ ] What should happen after refreshing the browser?
- [ ] What signal does the dashboard read after state moves into the service?
- [ ] Why should components call service methods instead of mutating `topics` directly?

## Verification checklist

- [ ] The app builds successfully.
- [ ] Dashboard still renders topics.
- [ ] Dashboard still adds a custom topic.
- [ ] Dashboard still toggles topic completion.
- [ ] Dashboard still resets progress.
- [ ] Topic details shows the selected topic from `TopicStore`.
- [ ] Topic details shows complete or incomplete status.
- [ ] A custom topic can be opened on its details route.
- [ ] Refreshing the page keeps custom topics.
- [ ] Refreshing the page keeps completion state.

## Reflection questions

- [ ] What is the job of `TopicStore`?
- [ ] What is the job of `Dashboard` after this refactor?
- [ ] Why expose `topics` as read-only?
- [ ] What does `inject(TopicStore)` do?
- [ ] How is `computed()` in a service similar to `computed()` in a component?
- [ ] What does `effect()` do in this lesson?
- [ ] How is this similar to React Context or a small external store?
- [ ] How is this similar to a Vue composable or Pinia store?

## Stretch task

- [ ] Add a `clearStorage()` method for learning resets.
- [ ] Add a small "Saved locally" message on the dashboard.
- [ ] Add basic validation in `loadTopics()` so invalid localStorage data falls back to `INITIAL_TOPICS`.
