# Lesson 05-06 Concept: Replace an Implementation With `useClass`

## Goal

Replace a concrete logger service with a logger token and two implementations: one at the root and one for the details page.

## The single new concept

A provider maps a token to an implementation:

```ts
{ provide: Logger, useClass: ConsoleLogger }
```

Consumers inject the token:

```ts
private readonly logger = inject(Logger);
```

Angular decides which class to instantiate based on the nearest provider for that token.

## Prior knowledge assumed

- Lesson 05-05: component providers can create local service instances.
- Lesson 05-02: `inject()` asks Angular for a token.

## Token versus implementation

The token is what consumers ask for:

```ts
export abstract class Logger {
  abstract log(message: string): void;
}
```

The implementation is what Angular creates:

```ts
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}
```

This separation lets `Dashboard` and `TopicDetails` both inject `Logger`, while Angular gives them different concrete classes.

## Comparison callout

This is classic Angular DI and existed in Angular v15. The modern lesson value is seeing it with standalone `ApplicationConfig` and `inject()`. React and Vue can swap implementations through context/provide values, but Angular formalizes the mapping through provider records.
