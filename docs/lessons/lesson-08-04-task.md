# Lesson 08-04 Task: Simulate Form Input and Submit

## Feature to build

Submit the dashboard form in a test and assert the fake store adds the new topic to the rendered list.

## Files to edit

- `src/app/dashboard/dashboard.spec.ts`

## Steps

1. Update the fake store's `addTopic` method so it appends to the `topics` signal:

   ```ts
   addTopic: (title: string, description: string) => {
     topics.update((current) => [
       ...current,
       {
         id: current.length + 1,
         title,
         description,
         done: false,
       },
     ]);
   },
   ```

2. Add a form-submission test:

   ```ts
   it('adds a topic from the form', async () => {
     const title: HTMLInputElement =
       fixture.nativeElement.querySelector('input[type="text"]');
     const description: HTMLTextAreaElement =
       fixture.nativeElement.querySelector('textarea');
     const form: HTMLFormElement = fixture.nativeElement.querySelector('form');

     title.value = 'Testing';
     title.dispatchEvent(new Event('input'));
     description.value = 'Write behavior-focused tests.';
     description.dispatchEvent(new Event('input'));
     form.dispatchEvent(
       new Event('submit', { bubbles: true, cancelable: true }),
     );
     await fixture.whenStable();
     fixture.detectChanges();

     expect(fixture.nativeElement.textContent).toContain('Testing');
   });
   ```

3. Run `npm test`.

## Prediction

Before running the test, predict what happens if you set `title.value` but forget to dispatch the `input` event.

## Verify

- The form-submission test passes.
- The rendered list contains `Testing`.
- The test does not require `npm run api`.
- The test uses the form's submit event rather than calling the store method directly.

## Reflection

- Why dispatch `input` after setting `.value`?
- Why dispatch `submit` on the form?
- Why is this more behavior-focused than calling a store method directly?
