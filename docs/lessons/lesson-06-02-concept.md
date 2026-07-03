# Lesson 06-02 Concept: Register `HttpClient`

## Goal

Register Angular's HTTP client with the application injector so services can inject `HttpClient`.

## The single new concept

Standalone Angular apps register HTTP with `provideHttpClient()`:

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
};
```

This does not make a request by itself. It only makes the HTTP client available through dependency injection.

## Prior knowledge assumed

- Lesson 05-02: `inject()` reads dependencies from Angular's injector.
- Lesson 06-01: the local API can respond at `http://localhost:3000/topics`.

## Why this is application configuration

`HttpClient` is not imported into a component like `RouterLink` or `ReactiveFormsModule`. It is a service capability. Registering it in `app.config.ts` means the root injector can provide it to services such as `TopicStore`.

If you skip this step and try to inject `HttpClient`, Angular cannot resolve the provider.

## Comparison callout

In many Angular v15 apps, you imported `HttpClientModule` in an NgModule. In this Angular 22 standalone app, `provideHttpClient()` replaces that module-level registration.
