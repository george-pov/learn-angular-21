import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { STORAGE_KEY } from './app-tokens';
import { TopicStore } from './topic-store';

describe('TopicStore', () => {
  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: STORAGE_KEY, useValue: 'store-test-topics' },
      ],
    });
  });

  it('computes completed topics from signal state', () => {
    const store = TestBed.inject(TopicStore);

    expect(store.completedCount()).toBe(1);

    store.toggleTopic(2);

    expect(store.completedCount()).toBe(2);
  });
});
