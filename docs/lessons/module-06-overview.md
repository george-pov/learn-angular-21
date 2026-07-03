# Module 06 Overview: HTTP

## Topic area

Load and modify topics over HTTP with a local `json-server` API.

## Prior modules

Modules 01-05.

## Angular v15, React, and Vue framing

Angular v15 also used `HttpClient` and RxJS, but Angular 22 standalone apps usually register HTTP through application config with `provideHttpClient()`. React learners can compare `HttpClient` calls with `fetch` plus state. Vue learners can compare the store methods with composables that wrap `fetch`.

This module keeps the topic store as the state owner from Module 05. HTTP changes how the store loads and creates topics; it does not move state back into components.

## Module note

Run `npm run api` in one terminal and `npm start` in another for this module. The API serves `db.json` at `http://localhost:3000`.

## Micro-lessons

- 06-01 Add `json-server` and seed data: a tiny local API and two-process workflow.
- 06-02 Register `HttpClient`: `provideHttpClient()` in `app.config.ts`.
- 06-03 GET the topic list: inject `HttpClient` and subscribe to `http.get<T>()`.
- 06-04 Handle a load error: observable error callback surfaced in a signal.
- 06-05 POST a new topic: `http.post<T>()`, server-assigned ids, and a local save fallback for later browser tests.
- 06-06 Bridge an observable to a signal with `toSignal`: expose an API preview signal and discuss when to keep manual subscriptions.
