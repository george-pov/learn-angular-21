import { Component, computed, input } from '@angular/core';
import { INITIAL_TOPICS } from '../topics';

@Component({
  selector: 'app-topic-details',
  imports: [],
  templateUrl: './topic-details.html',
  styleUrl: './topic-details.scss',
})
export class TopicDetails {

  readonly id = input.required<string>();

  protected readonly topicId = computed(() => Number(this.id()));

  protected readonly topic = computed(() => {
    return INITIAL_TOPICS.find((topic) => topic.id === this.topicId());
  });

  protected readonly nextTopic = computed(() => {
    return INITIAL_TOPICS.find((topic) => topic.id === this.topicId() + 1);
  });

}
