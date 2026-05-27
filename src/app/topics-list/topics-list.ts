import { Component, input, output } from '@angular/core';
import { Topic } from '../topic';

@Component({
  selector: 'app-topics-list',
  imports: [],
  templateUrl: './topics-list.html',
  styleUrl: './topics-list.scss',
})
export class TopicsList {
  readonly topics = input.required<Topic[]>();
  readonly toggle = output<number>();

  toggleTopic(topicId: number) {
    this.toggle.emit(topicId);
  }
}
