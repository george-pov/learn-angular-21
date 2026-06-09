import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Topic } from '../topic';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.html',
  styleUrl: './topics-list.scss',
  imports: [RouterLink],
})
export class TopicsList {
  readonly topics = input.required<Topic[]>();
  readonly toggle = output<number>();

  protected onToggle(id: number): void {
    this.toggle.emit(id);
  }
}
