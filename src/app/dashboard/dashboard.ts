import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Logger } from '../logger';
import { TopicStore } from '../topic-store';
import { TopicsList } from '../topics-list/topics-list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  imports: [ReactiveFormsModule, TopicsList],
})
export class Dashboard {
  protected readonly store = inject(TopicStore);
  private readonly logger = inject(Logger);

  protected readonly topicForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
  });

  constructor() {
    this.logger.log('Dashboard created');
  }

  protected addTopic(): void {
    if (this.topicForm.invalid) {
      this.topicForm.markAllAsTouched();
      return;
    }

    const value = this.topicForm.getRawValue();
    this.store.addTopic(value.title, value.description);
    this.topicForm.reset({ title: '', description: '' });
  }
}
