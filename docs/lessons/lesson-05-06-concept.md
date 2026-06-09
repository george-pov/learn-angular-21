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

## Mental model

A provider record has two sides:

```ts
{ provide: Logger, useClass: ConsoleLogger }
```

Read it as:

```text
When someone asks for Logger, create ConsoleLogger.
```

The consumer does not ask for `ConsoleLogger`. The consumer asks for `Logger`.

## Token versus implementation

The token is what consumers ask for:

```ts
export abstract class Logger {
  abstract label: string;
  abstract log(message: string): void;
}
```

The implementation is what Angular creates:

```ts
export class ConsoleLogger implements Logger {
  readonly label = 'ConsoleLogger';

  log(message: string): void {
    console.log(message);
  }
}
```

This separation lets `Dashboard` and `TopicDetails` both inject `Logger`, while Angular gives them different concrete classes.

## Why an abstract class token

A TypeScript interface would be tempting:

```ts
interface Logger {
  log(message: string): void;
}
```

That cannot be used as an Angular DI token because interfaces disappear when TypeScript compiles to JavaScript. Angular needs a runtime value to use as the token.

An abstract class exists at runtime, so Angular can use it as the token:

```ts
export abstract class Logger {
  abstract label: string;
  abstract log(message: string): void;
}
```

The abstract class also documents the required shape of each implementation.

## Why `label` is part of the token

The details template renders the logger label:

```html
<p>{{ logger.label }}</p>
```

That means the token must promise that every implementation has a `label`:

```ts
abstract label: string;
```

If `Logger` only promised `log(message)`, the template could not safely read `logger.label`.

## Root replacement and local replacement

The root provider can map `Logger` to the default implementation:

```ts
{ provide: Logger, useClass: ConsoleLogger }
```

`TopicDetails` can map the same token to a different implementation:

```ts
providers: [{ provide: Logger, useClass: VerboseLogger }]
```

Nearest provider still wins. `Dashboard` gets the root `ConsoleLogger`. `TopicDetails` gets the local `VerboseLogger`.

## Why this is better than injecting concrete classes

If components inject concrete classes:

```ts
inject(ConsoleLogger)
```

then every consumer chooses the implementation itself. Replacing the logger requires changing consumers.

If components inject the token:

```ts
inject(Logger)
```

then providers choose the implementation. Consumers stay stable.

## What changed from Lesson 05-05

Lesson 05-05 asked for the concrete class:

```ts
inject(LoggerService)
```

This lesson asks for the abstraction:

```ts
inject(Logger)
```

That is the key step. Provider records can now swap implementations without changing the consumer code.

## Decorator note

The simple logger implementation classes in this lesson have no injected constructor dependencies, so they do not need `@Injectable`. If an implementation later needs its own injected dependencies, give it `@Injectable()` or use a provider factory with explicit dependencies.

## Comparison callout

This is classic Angular DI and existed in Angular v15. The modern lesson value is seeing it with standalone `ApplicationConfig` and `inject()`. React and Vue can swap implementations through context/provide values, but Angular formalizes the mapping through provider records.

## Vocabulary checkpoint

- **Token:** what the consumer requests.
- **Implementation:** the concrete class Angular creates.
- **Provider record:** the object that maps token to creation strategy.
- **`useClass`:** the provider strategy that instantiates a class for a token.
