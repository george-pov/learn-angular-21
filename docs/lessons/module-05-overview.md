# Module 05 Overview: Dependency Injection

## Topic area

Create, scope, and replace services and injected values.

## Prior modules

Modules 01-04.

## Angular v15, React, and Vue framing

Angular v15 commonly showed constructor injection first. Angular 21 code can use `inject()` in fields, which reads closer to React hooks but is still Angular DI, not component-local state.

React has no built-in equivalent to Angular's injector tree. Context is the closest comparison for sharing values through a subtree, but Angular providers can create class instances, replace implementations, and provide configuration values. Vue `provide` / `inject` is also a useful comparison for scoping, but Angular providers are strongly tied to injectors.

This module keeps topic data local. HTTP and a real API arrive in Module 06.

## Micro-lessons

- 05-01 Create a service with `providedIn: 'root'`: `@Injectable({ providedIn: 'root' })` and the root injector.
- 05-02 Inject the service with `inject()`: modern field-level injection.
- 05-03 Move a signal into the service: service-owned signal state exposed as readonly.
- 05-04 Add computed derived state to the service: computed state belongs beside the source signal.
- 05-05 Scope a service at the component level: component providers create a child injector instance.
- 05-06 Replace an implementation with `useClass`: provider token versus implementation class.
- 05-07 Provide a plain value with `useValue`: `InjectionToken` plus `useValue` for configuration.
- 05-08 Build a value with `useFactory`: `useFactory` for computed provider values.
- 05-09 Persist state with `effect`: `effect` as a bridge from signals to external side effects.
