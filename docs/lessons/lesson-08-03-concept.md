# Lesson 08-03 Concept: Query and Assert Text Content

## Goal

Assert a specific piece of rendered DOM text instead of only checking the whole component output.

## The single new concept

`fixture.nativeElement` is the root DOM element for the rendered component:

```ts
const progress: HTMLElement | null = fixture.nativeElement.querySelector('.progress');

expect(progress?.textContent).toContain('1 of 1 topics complete');
```

This is a DOM-first assertion. The test asks what the user could see, not which private fields the component has.

## Prior knowledge assumed

- Lesson 08-02: `Dashboard` can be rendered in a test.
- Basic CSS selector knowledge.

## Why query a specific element?

The whole page text is useful for smoke tests:

```ts
expect(fixture.nativeElement.textContent).toContain('Angular 22 Learning Tracker');
```

Specific elements make intent clearer:

```ts
fixture.nativeElement.querySelector('.progress');
```

If that assertion fails, the failure points at the progress UI instead of the entire page.

## What `querySelector` can return

`querySelector` returns either an element or `null`. The test should account for that:

```ts
expect(progress?.textContent).toContain('1 of 1 topics complete');
```

The optional chain keeps the example compact. In a stricter test, you might first assert that `progress` is not `null`.

## Comparison callout

React Testing Library encourages querying the DOM from the user's point of view. This Angular lesson uses direct DOM APIs because they are already available on the fixture and keep the first assertion small.
