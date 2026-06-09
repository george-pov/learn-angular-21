# Lesson 08-03 Task: Query and Assert Text Content

## Feature to build

Assert the initial progress text from the rendered dashboard.

## Files to edit

- `src/app/dashboard/dashboard.spec.ts`

## Steps

1. Add a second test:

   ```ts
   it('renders the progress label', () => {
     const progress: HTMLElement | null =
       fixture.nativeElement.querySelector('.progress');

     expect(progress?.textContent).toContain('1 of 1 topics complete');
   });
   ```

2. Run `npm test`.

## Prediction

Before running the test, predict what the assertion reports if `.progress` does not exist.

## Verify

- The progress-label test passes.
- The title test still passes.
- The assertion reads text from the rendered DOM.
- No component code changed.

## Reflection

- Why query `.progress` instead of the whole page text?
- What can `querySelector` return when nothing matches?
- Why is DOM text a useful testing boundary?
