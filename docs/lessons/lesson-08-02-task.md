# Lesson 08-02 Task: Render a Component in a Test

## Feature to build

Create `Dashboard` in a spec and assert the page title renders.

## Files to create

- `src/app/dashboard/dashboard.spec.ts`

## Steps

1. Create a fake store helper in `dashboard.spec.ts`:

   ```ts
   import { signal } from '@angular/core';
   import { ComponentFixture, TestBed } from '@angular/core/testing';
   import { provideRouter } from '@angular/router';

   import { Logger } from '../logger';
   import { TopicStore } from '../topic-store';
   import { Dashboard } from './dashboard';

   function createTopicStoreStub() {
     const topics = signal([
       {
         id: 1,
         title: 'Standalone components',
         description: 'Understand component metadata and standalone imports.',
         done: true,
       },
     ]);

     return {
       topics,
       loadError: signal<string | null>(null),
       progressLabel: signal('1 of 1 topics complete'),
       allTopicsComplete: signal(true),
       toggleTopic: () => {},
       addTopic: () => {},
     };
   }
   ```

2. Add the spec setup:

   ```ts
   describe('Dashboard', () => {
     let fixture: ComponentFixture<Dashboard>;

     beforeEach(async () => {
       await TestBed.configureTestingModule({
         imports: [Dashboard],
         providers: [
           provideRouter([]),
           { provide: TopicStore, useValue: createTopicStoreStub() },
           { provide: Logger, useValue: { log: () => {} } },
         ],
       }).compileComponents();

       fixture = TestBed.createComponent(Dashboard);
       fixture.detectChanges();
     });

     // Add tests here.
   });
   ```

3. Add the first assertion inside the `describe` block:

   ```ts
   it('renders the learning tracker title', () => {
     expect(fixture.nativeElement.textContent).toContain('Angular 22 Learning Tracker');
   });
   ```

4. Run `npm test`.

## Prediction

Before running the test, predict what happens if you remove the fake `TopicStore` provider.

## Verify

- The dashboard spec runs.
- The title assertion passes.
- The test does not call the local API.
- The test does not require `npm run api`.

## Reflection

- Why does the test import the standalone `Dashboard` component?
- Why use a fake store for this component test?
- What does `fixture.detectChanges()` do?
