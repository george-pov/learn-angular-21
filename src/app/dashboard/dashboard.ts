import { Component, computed, signal } from '@angular/core';
import { INITIAL_TOPICS } from '../topics';
import { Topic } from '../topic';
import { TopicsList } from "../topics-list/topics-list";

@Component({
  selector: 'app-dashboard',
  imports: [TopicsList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly topics = signal<Topic[]>(
    INITIAL_TOPICS.map(topic => ({ ...topic }))
  );

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
