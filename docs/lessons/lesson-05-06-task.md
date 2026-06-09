# Lesson 05-06 Task: Replace an Implementation With `useClass`

## Feature to build

Use a `Logger` token with `ConsoleLogger` at the root and `VerboseLogger` on the details page.

## Starting point

`LoggerService` exists and `TopicDetails` provides a local `LoggerService` instance. This lesson replaces that concrete-service shape with a token and two implementations.

## Files to edit

- `src/app/logger.ts`
- `src/app/app.config.ts`
- `src/app/dashboard/dashboard.ts`
- `src/app/topic-details/topic-details.ts`
- `src/app/topic-details/topic-details.html`

## Steps

1. In `logger.ts`, replace `LoggerService` with a token and two implementations:

   ```ts
   export abstract class Logger {
     abstract label: string;
     abstract log(message: string): void;
   }

   export class ConsoleLogger implements Logger {
     readonly label = 'ConsoleLogger';

     log(message: string): void {
       console.log(`[app] ${message}`);
     }
   }

   export class VerboseLogger implements Logger {
     readonly label = 'VerboseLogger';

     log(message: string): void {
       console.log(`[details] ${new Date().toISOString()} ${message}`);
     }
   }
   ```

   The abstract class is the DI token. The two concrete classes are implementations.

2. In `app.config.ts`, provide the root implementation:

   ```ts
   import { ConsoleLogger, Logger } from './logger';

   export const appConfig: ApplicationConfig = {
     providers: [
       provideBrowserGlobalErrorListeners(),
       provideRouter(routes, withComponentInputBinding()),
       { provide: Logger, useClass: ConsoleLogger },
     ],
   };
   ```

   Keep existing router providers.

3. In `dashboard.ts`, inject the token instead of `LoggerService`:

   ```ts
   import { Logger } from '../logger';

   private readonly logger = inject(Logger);
   ```

   Remove the `LoggerService` import.

4. In `topic-details.ts`, override the token locally:

   ```ts
   import { Logger, VerboseLogger } from '../logger';

   @Component({
     // ...
     providers: [{ provide: Logger, useClass: VerboseLogger }],
   })
   export class TopicDetails {
     protected readonly logger = inject(Logger);
   }
   ```

   Replace `providers: [LoggerService]` with the provider record above.

5. In `topic-details.html`, keep rendering the label:

   ```html
   <p>{{ logger.label }}</p>
   ```

6. Do not inject `ConsoleLogger` or `VerboseLogger` directly in components.

## Prediction

Before running the app, predict which logger label appears on the details page. Which logger does `Dashboard` receive?

## Verify

- The dashboard still logs through `ConsoleLogger`.
- The details page renders `VerboseLogger`.
- Navigating to `/topics/1` logs with the details implementation.
- No component injects `ConsoleLogger` or `VerboseLogger` directly.
- Consumers inject only `Logger`.
- `app.config.ts` owns the root logger choice.
- `TopicDetails.providers` owns the details-page override.

## Reflection

- What is the difference between the provider token and the implementation class?
- Why does `TopicDetails` receive `VerboseLogger` while `Dashboard` receives `ConsoleLogger`?
- What would be harder if components injected `ConsoleLogger` directly?
