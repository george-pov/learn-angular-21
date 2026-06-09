import { Component, inject, input } from '@angular/core';

import { Logger, LOGGER_PREFIX, VerboseLogger } from '../logger';
import { TopicNotes } from '../topic-notes/topic-notes';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.html',
  styleUrl: './topic-details.scss',
  imports: [TopicNotes],
  providers: [
    { provide: LOGGER_PREFIX, useValue: 'details' },
    {
      provide: Logger,
      useFactory: (prefix: string) => new VerboseLogger(prefix),
      deps: [LOGGER_PREFIX],
    },
  ],
})
export class TopicDetails {
  readonly id = input.required<string>();
  private readonly logger = inject(Logger);

  constructor() {
    this.logger.log('TopicDetails created');
  }
}
