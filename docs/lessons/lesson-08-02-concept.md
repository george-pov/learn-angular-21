# Lesson 08-02 Concept: Render a Component in a Test

## Goal

Create a `Dashboard` component in a unit test and assert that its title renders.

## The single new concept

`TestBed` creates an Angular testing environment for one spec:

```ts
await TestBed.configureTestingModule({
  imports: [Dashboard],
  providers: [
    provideRouter([]),
    { provide: TopicStore, useValue: topicStoreStub },
    { provide: Logger, useValue: loggerStub },
  ],
}).compileComponents();

const fixture = TestBed.createComponent(Dashboard);
fixture.detectChanges();
```

Three pieces matter:

- `imports: [Dashboard]` makes the standalone component available to the test.
- `providers: [...]` supplies the dependencies that `Dashboard` injects.
- `fixture.detectChanges()` performs the first render.

## Prior knowledge assumed

- Lesson 05-02: components receive dependencies through DI.
- Lesson 06-06: `Dashboard` reads state from `TopicStore`.
- Lesson 08-01: `npm test` runs spec files.

## Why use a fake store?

`Dashboard` is the component under test. HTTP is not the topic of this lesson. A fake `TopicStore` lets the test focus on whether the component renders.

The fake store must provide the properties and methods the template reads:

- `topics`
- `loadError`
- `progressLabel`
- `allTopicsComplete`
- `toggleTopic`
- `addTopic`

This is not a full replacement for store tests. It is a focused component-test boundary. Lesson 08-05 tests the real store directly.

## Fixture mental model

The fixture is the test handle for the rendered component. It gives you access to:

- the component instance
- the rendered DOM through `nativeElement`
- change detection through `detectChanges()`

That is the Angular equivalent of a mounted component wrapper in other frontend test tools.

## Comparison callout

React and Vue component tests also render components with fake dependencies when the dependency is not the thing being tested. Angular's TestBed is the layer that wires standalone imports, dependency injection, and template compilation together.
