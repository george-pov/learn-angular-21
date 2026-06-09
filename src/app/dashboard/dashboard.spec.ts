import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { APP_BUILD_LABEL, STORAGE_KEY } from '../app-tokens';
import { ConsoleLogger, Logger, LOGGER_PREFIX } from '../logger';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let fixture: ComponentFixture<Dashboard>;
  let http: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: STORAGE_KEY, useValue: 'test-topics' },
        { provide: LOGGER_PREFIX, useValue: 'test' },
        {
          provide: Logger,
          useFactory: (prefix: string) => new ConsoleLogger(prefix),
          deps: [LOGGER_PREFIX],
        },
        { provide: APP_BUILD_LABEL, useValue: 'test-build' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.match('http://localhost:3000/topics').forEach((request) => {
      request.flush([], { status: 500, statusText: 'Test error' });
    });
    fixture.detectChanges();
  });

  it('renders the learning tracker title', () => {
    expect(fixture.nativeElement.textContent).toContain(
      'Angular 21 Learning Tracker',
    );
  });

  it('renders the initial progress label', () => {
    expect(fixture.nativeElement.textContent).toContain('1 of 3 topics complete');
  });

  it('adds a topic from the form when the API is unavailable', () => {
    const title: HTMLInputElement =
      fixture.nativeElement.querySelector('input[formControlName="title"]');
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');

    title.value = 'Testing';
    title.dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    http.expectOne('http://localhost:3000/topics').flush(
      {},
      { status: 500, statusText: 'Test error' },
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Testing');
  });
});
