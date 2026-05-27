import { Component, computed, signal } from '@angular/core';
import { Topic } from './topic';
import { TopicsList } from "./topics-list/topics-list";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [TopicsList],
})
export class App {

  protected readonly topics = signal<Topic[]>([
    {
      id: 1,
      title: 'Standalone components',
      description: 'Build components without NgModules as the default app structure.',
      done: true,
    },
    {
      id: 2,
      title: 'Signals',
      description: 'Use explicit reactive state for local UI behavior.',
      done: false,
    },
    {
      id: 3,
      title: 'New template control flow',
      description: 'Render lists and conditions with @for and @if.',
      done: false,
    },
    {
      id: 4,
      title: 'Deferrable views',
      description: 'Enjoy faster builds and smaller bundles with the new build system.',
      done: false,
    }
  ]);

  protected readonly completedCount = computed(
    () => this.topics().filter((topic) => topic.done).length,
  );

  protected readonly completedPercent = computed(() => {
    const total = this.topics().length;
    return total === 0 ? 0 : Math.round((this.completedCount() / total) * 100);
  });

  protected readonly allTopicsComplete = computed(
    () => this.completedCount() === this.topics().length,
  );

  protected readonly resetProgress = () => {
    this.topics.update((topics) =>
      topics.map((topic) => ({ ...topic, done: false })),
    );
  };

  protected toggleTopic(id: number): void {
    this.topics.update((topics) =>
      topics.map((topic) =>
        topic.id === id ? { ...topic, done: !topic.done } : topic,
      ),
    );
  }
}
