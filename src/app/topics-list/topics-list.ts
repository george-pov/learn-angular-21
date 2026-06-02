import { Component, input, output } from '@angular/core';
import { Topic } from '../topic';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-topics-list',
  imports: [RouterLink],
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
