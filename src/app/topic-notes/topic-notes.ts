import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-notes',
  templateUrl: './topic-notes.html',
  styleUrl: './topic-notes.scss',
})
export class TopicNotes {
  readonly topicId = input.required<string>();
}
