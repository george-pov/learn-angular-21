import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { STORAGE_KEY } from './app-tokens';
import { Topic } from './topic';

const API_URL = 'http://localhost:3000/topics';

const SEED_TOPICS: Topic[] = [
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
];

@Injectable({ providedIn: 'root' })
export class TopicStore {
  private readonly http = inject(HttpClient);
  private readonly storageKey = inject(STORAGE_KEY);
  private readonly topicsSignal = signal<Topic[]>(this.loadTopics());

  readonly topics = this.topicsSignal.asReadonly();
  readonly loadError = signal<string | null>(null);
  readonly apiPreview = toSignal(this.http.get<Topic[]>(API_URL), {
    initialValue: [] as Topic[],
  });

  readonly completedCount = computed(
    () => this.topicsSignal().filter((topic) => topic.done).length,
  );
  readonly totalCount = computed(() => this.topicsSignal().length);
  readonly progressLabel = computed(
    () => `${this.completedCount()} of ${this.totalCount()} topics complete`,
  );
  readonly allTopicsComplete = computed(
    () => this.totalCount() > 0 && this.completedCount() === this.totalCount(),
  );

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.topicsSignal()));
    });
    this.loadFromApi();
  }

  loadFromApi(): void {
    this.http.get<Topic[]>(API_URL).subscribe({
      next: (topics) => {
        this.loadError.set(null);
        this.topicsSignal.set(topics);
      },
      error: () => {
        this.loadError.set('Could not load topics. Start the API with npm run api.');
      },
    });
  }

  toggleTopic(id: number): void {
    this.topicsSignal.update((current) =>
      current.map((topic) =>
        topic.id === id ? { ...topic, done: !topic.done } : topic,
      ),
    );
  }

  addTopic(title: string, description: string): void {
    const body = { title, description, done: false };

    this.http.post<Topic>(API_URL, body).subscribe({
      next: (topic) => {
        this.loadError.set(null);
        this.topicsSignal.update((current) => [...current, topic]);
      },
      error: () => {
        const nextId = Math.max(0, ...this.topicsSignal().map((topic) => topic.id)) + 1;
        this.topicsSignal.update((current) => [...current, { id: nextId, ...body }]);
        this.loadError.set('Saved locally because the API is not running.');
      },
    });
  }

  private loadTopics(): Topic[] {
    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      return SEED_TOPICS;
    }

    try {
      return JSON.parse(raw) as Topic[];
    } catch {
      return SEED_TOPICS;
    }
  }
}
