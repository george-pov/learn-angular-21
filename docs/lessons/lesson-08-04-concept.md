# Lesson 08-04 Concept: Simulate Form Input and Submit

## Goal

Fill out the dashboard form in a test, submit it, and assert that the new topic appears.

## The single new concept

Tests can drive DOM events:

```ts
title.value = 'Testing';
title.dispatchEvent(new Event('input'));

form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
await fixture.whenStable();
fixture.detectChanges();
```

The important sequence is:

1. Change the DOM element value.
2. Dispatch the event Angular listens for.
3. Wait for any async form submission work.
4. Run change detection.
5. Assert the rendered result.

## Prior knowledge assumed

- Lesson 04-08: the dashboard uses Signal Forms with `FormField` and `FormRoot`.
- Lesson 05-03: the submission action calls `store.addTopic(...)`.
- Lesson 08-02: the component test uses a fake `TopicStore`.
- Lesson 08-03: tests can query rendered DOM.

## Why dispatch the event?

Setting this:

```ts
title.value = 'Testing';
```

changes the DOM object, but Angular forms do not automatically know about that assignment. For the final app shape, the `input` event tells the Signal Forms `FormField` directive to update the field state and model signal.

The same idea applies to submission. Dispatching `submit` on the form exercises the same `FormRoot` path the browser uses.

## Why not call methods directly?

Calling store methods directly can be useful for a narrow store test, but it skips the user's path through the template. This lesson is about behavior:

- the input receives text
- Signal Forms receive the input event
- `FormRoot` submits the form
- the rendered list changes

That makes the test more resistant to internal refactors.

## Comparison callout

React and Vue tests also need to fire the event that the framework listens for. The helper names differ by test library, but the mental model is the same: update the field, dispatch the user event, then assert the UI.
