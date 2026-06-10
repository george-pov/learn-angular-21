# Lesson 02-04 Concept: Extract a Child Component

## Goal

Move the list markup out of `App` into a new `TopicsList` component. The browser shows the same UI; the code is now split across two components.

## The single new concept

A second standalone component, used inside another component:

```ts
// src/app/topics-list/topics-list.ts
import { Component } from '@angular/core';
import { Topic } from '../topic';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.html',
  styleUrl: './topics-list.scss',
})
export class TopicsList {
  protected readonly topics: Topic[] = [
    {
      id: 1,
      title: 'Standalone components',
      description: 'Understand component metadata and standalone imports.',
      done: true,
    },
    {
      id: 2,
      title: 'Signals',
      description: 'Use signals for local reactive state.',
      done: false,
    },
    {
      id: 3,
      title: 'Template control flow',
      description: 'Render branches and lists with modern template syntax.',
      done: false,
    },
  ];
}
```

For this lesson `TopicsList` is **self-contained**: it carries its own hardcoded copy of the topic array. Lesson 02-05 will hand the array in from `App` via an input. Doing it this way keeps the focus on one concept: how one component renders another.

## Using the child component

The parent component declares the child in its `imports` array:

```ts
import { TopicsList } from './topics-list/topics-list';

@Component({
  // ...
  imports: [TopicsList],
})
export class App { /* ... */ }
```

Then renders it like any other element:

```html
<app-topics-list />
```

The `imports` array is the standalone equivalent of v15's module `declarations` + `exports`. Every component the template uses has to appear there.

## Prior knowledge assumed

- Lesson 01-01: `@Component`.
- Lesson 02-02 and 02-03: list rendering and per-row interaction.

## Why duplicate the array temporarily?

Splitting "extract the component" from "wire data through inputs" keeps each step single-concept. The duplicate array exists only between Lesson 02-04 and 02-05. In 02-05 the duplicate disappears.

## Comparison callout

This is the same idea as a React function component used as `<TopicsList />` in another component, or a Vue single-file component imported into a parent. The `imports: [TopicsList]` line is the Angular-specific bit — React and Vue figure out the dependency from the JSX/template tag automatically.
