# Angular 22 Teaching Plan

This plan is for a developer who has used Angular v15, is comfortable with React and Vue.js, and wants to learn how modern Angular applications are built in Angular v22.

The plan is organized as topic-level **modules**. Each module contains several **micro-lessons**, and each micro-lesson introduces exactly one new Angular concept on top of code the learner already understands. Every micro-lesson produces a small, runnable, visible change in the app.

## Learning principles

Every lesson in this plan must satisfy the six learning principles named in [README.md](../README.md#learning-principles):

- Scaffolded learning
- Progressive disclosure
- Incremental complexity
- Layered learning
- Concept-first teaching
- Vertical slice learning

The anti-patterns listed alongside those principles must be actively avoided. The most common failure mode is the **big-bang example**: a single lesson that introduces a signal, derived state, template control flow, event binding, and immutable update all at once. Whenever a draft lesson would do that, split it.

## Example app direction

The example app is a small learning-tracker dashboard for Angular 22 concepts. It is intentionally simple, but it gives enough surface area to learn real application development:

- A page that tracks progress through Angular concepts.
- A way to mark a topic as learned.
- A computed progress summary.
- A details route for one topic.
- A small form to add custom topics.
- A shared store service and persisted state.
- A real HTTP-backed topic list (via a small local API).
- Deferrable views, unit tests, and end-to-end tests for the final shape.

The earliest micro-lessons stay inside this domain but work on **primitive signals first** (a "topics completed" counter, a "current topic title" text input). The topic _array_, list rendering, and child components arrive in Module 02. This keeps Lesson 01-01 free of arrays, `@for`, and component composition.

## Starting state

Module 01 starts from a minimal Angular shell:

- `src/app/app.ts` is a standalone `App` component with the selector `app-root` and a placeholder template that renders only the app title.
- `src/app/app.html` shows the app title.
- `src/app/app.scss` is empty.
- `src/app/app.routes.ts` exports an empty `Routes` array.
- `src/app/app.config.ts` provides `provideRouter(routes)` and the default browser-error listener.
- `src/main.ts`, `src/index.html`, and `src/styles.scss` are the defaults produced by `ng new`.

No feature folders, no `Topic` type, no seed topics, no child components. Module 01 builds inside `App` only.

## Module list

| Module | Title                              | Topic area                                                                                                                 |
| ------ | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 01     | Components, Signals, and Templates | The mental model for modern Angular component code. Primitive signals only.                                                |
| 02     | Lists and Composition              | The topic array, `@for`, `track`, child components, signal inputs, outputs.                                                |
| 03     | Routing                            | `provideRouter`, `RouterOutlet`, `RouterLink`, route params, `loadComponent`.                                              |
| 04     | Forms                              | Manual signal input baseline, reactive `FormControl` and `FormGroup` mechanics, validation rendering, stable Signal Forms. |
| 05     | Dependency Injection               | `inject()`, root services, signals in services, scoped providers, alternative providers.                                   |
| 06     | HTTP                               | `provideHttpClient`, GET, error handling, POST, signal/observable interop, against a local `json-server` API.              |
| 07     | Deferrable Views                   | `@defer`, triggers, loading and placeholder and error blocks.                                                              |
| 08     | Component and Store Testing        | TestBed, fixtures, querying the DOM, event simulation, signal-driven assertions.                                           |
| 09     | End-to-End Testing                 | Playwright Test, `webServer`, locators, web-first assertions, user workflows, API boundary control.                        |

A short [docs/build-and-production.md](./build-and-production.md) reference page (to be added with Module 08) covers `npm run build`, what changes in production, and how lazy loading and deferrable views affect bundles. It is reference reading, not a lesson module.

---

## Module 01: Components, Signals, and Templates

Topic: how to think about a modern Angular component and reactive state, using only primitive values.

Prior modules required: none.

After this module the learner can read and write a standalone component, store reactive state in a signal, derive values with `computed`, respond to template events, and use `@if` for conditional rendering. The app shows a tracker page with a "topics completed" counter, a "current topic title" text input, and conditional messaging — all driven by primitive signals.

Micro-lessons:

- **01-01 Read a standalone component.** Concept: what a standalone Angular component is, what `@Component` declares, how `selector`, `templateUrl`, and `styleUrl` connect. Change: rename the placeholder app title to "Angular 22 Learning Tracker" and add one paragraph of intro text in the template. No new TypeScript code.
- **01-02 Introduce `signal`.** Concept: signals as the unit of reactive state, the `signal()` factory, reading a signal with `()`. Change: add `private readonly completedCount = signal(0);` to `App` and render `{{ completedCount() }}` in the template. No buttons yet — the value displays as `0`.
- **01-03 Update a signal from an event.** Concept: template event binding `(click)` and the `signal.set` / `signal.update` writer API. Change: add a "Mark one complete" button that calls a `markOneComplete()` method on the component. The counter visibly increments on click.
- **01-04 Derive state with `computed`.** Concept: `computed()` for derived values, automatic dependency tracking. Change: add a fixed `totalTopics = signal(4);` and a `progressLabel = computed(() => …)` that renders `"X of Y topics complete"`. The label updates as the counter changes.
- **01-05 Conditional rendering with `@if`.** Concept: the `@if` block as the modern replacement for `*ngIf`. Change: when `completedCount()` equals `totalTopics()`, show a "All topics complete" message inside an `@if`; otherwise show a "Keep going" message inside `@else`.
- **01-06 Two-way text input with a signal.** Concept: binding an `<input>` to a signal manually via `[value]` and `(input)`. Change: add a `currentTitle = signal('')` and a text input; show `{{ currentTitle() }}` live underneath. This sets up the input synchronization pattern that Module 04 will analyze directly, then compare with reactive forms and Signal Forms.

End-of-module visible state: a tracker page with a counter, a derived progress label, conditional messages, and a live text echo. No arrays, no child components, no router.

---

## Module 02: Lists and Composition

Topic: turn the primitive-signal tracker into a real list with one child component, signal inputs, and outputs.

Prior modules required: Module 01.

After this module the learner can introduce a typed model, render a list with `@for` and `track`, extract a child component, pass data via `input()`, and emit events via `output()`. The app shows a real topic list and computed progress derived from it.

Micro-lessons:

- **02-01 Introduce a typed model.** Concept: a domain `type` lives in its own file. Change: create `src/app/topic.ts` exporting `type Topic = { id: number; title: string; description: string; done: boolean; }`. No UI change.
- **02-02 Render a list with `@for` and `track`.** Concept: the `@for` block, the required `track` expression, and why identity matters. Change: replace the `completedCount` counter with `private readonly topics = signal<Topic[]>([…three seed topics…]);` and render the titles inside `@for (topic of topics(); track topic.id) { … }`. Update the progress label to derive from `topics().length` and `topics().filter(t => t.done).length`. **Comparison callout**: `track` versus React's `key` prop. The "Mark one complete" button is removed in this lesson; per-topic toggling lands in 02-03.
- **02-03 Toggle a list item with immutable update.** Concept: updating an array signal immutably via `.update(prev => prev.map(...))`. Change: add a checkbox next to each topic with `[checked]="topic.done"` and `(change)="toggleTopic(topic.id)"`. `toggleTopic` updates `topics` immutably. Computed progress reflects the change.
- **02-04 Extract a child component.** Concept: a standalone child component with its own template; importing it via the parent's `imports` array. Change: create `topics-list` component with its own `.ts`/`.html`/`.scss`, hardcoded to render an internal copy of the topic array for now. Import it in `App` and render `<app-topics-list />`. Then _remove_ the list rendering from `App.html`. The visible UI is identical, but the markup moved.
- **02-05 Pass data with `input()`.** Concept: signal-based component inputs created with `input.required<T>()`. Change: replace the hardcoded array in `TopicsList` with `readonly topics = input.required<Topic[]>();`. In `App`, render `<app-topics-list [topics]="topics()" />`. State ownership returns to `App`.
- **02-06 Emit events with `output()`.** Concept: signal-based outputs created with `output<T>()` and `.emit()`. Change: add `readonly toggle = output<number>();` to `TopicsList`. The checkbox `(change)` now calls a child method that emits the topic id. `App` binds `(toggle)="toggleTopic($event)"` and owns `toggleTopic` again.

End-of-module visible state: a tracker with three topics, checkboxes, a derived progress label, and a parent/child component split. State lives in `App`; the list is purely presentational.

---

## Module 03: Routing

Topic: turn the single-page tracker into a small routed app.

Prior modules required: Modules 01–02.

After this module the learner can configure routes with `provideRouter`, render routed pages with `RouterOutlet`, navigate with `RouterLink`, read route params with `withComponentInputBinding`, and lazy-load route components with `loadComponent`.

Micro-lessons:

- **03-01 Add an empty router outlet.** Concept: the `App` component as a shell that hosts `<router-outlet />`. Change: import `RouterOutlet` in `App` and render `<router-outlet />` below the existing tracker UI. `app.routes.ts` is still empty. The visible UI does not change yet; nothing matches.
- **03-02 Move the tracker into a routed page.** Concept: a route entry maps a path to a component. Change: create `dashboard/dashboard.ts` (a standalone component) and move the tracker template, the `topics` signal, `toggleTopic`, and the `<app-topics-list>` usage from `App` into it. Register `{ path: '', component: Dashboard }` in `app.routes.ts`. `App.html` now contains only `<router-outlet />`. The visible UI is unchanged.
- **03-03 Navigate with `RouterLink`.** Concept: `routerLink` for in-app navigation, the difference from a plain `href`. Change: add a header to `App.html` with a `<a routerLink="/">Dashboard</a>` link. Add a `RouterLink` import to `App`'s `imports` array. Clicking the link reloads the dashboard without a full page navigation.
- **03-04 Add a second route.** Concept: multiple routes, the wildcard `'**'` fallback. Change: create a `TopicDetails` placeholder page. Register `{ path: 'topics/:id', component: TopicDetails }` and `{ path: '**', redirectTo: '' }`. Add `<a [routerLink]="['/topics', topic.id]">{{ topic.title }}</a>` inside `TopicsList` (and add `RouterLink` to its imports). Clicking a topic title navigates to the placeholder page.
- **03-05 Read a route param via signal input.** Concept: `withComponentInputBinding()` and signal-based route inputs. Change: pass `withComponentInputBinding()` to `provideRouter` in `app.config.ts`. Add `readonly id = input.required<string>();` to `TopicDetails` and render the id in the template. Navigating to `/topics/2` displays `2`. **Comparison callout**: contrast with React Router's `useParams()`.
- **03-06 Lazy-load a routed component.** Concept: `loadComponent` for code-splitting route-level pages. Change: rewrite both route entries to use `loadComponent: () => import('./…').then(m => m.…)`. The visible behavior is identical; DevTools network tab shows the page chunk loading on first navigation.

End-of-module visible state: a header with a Dashboard link, the dashboard at `/`, a topic details page at `/topics/:id` that shows the route id, and lazy-loaded route bundles.

---

## Module 04: Forms

Topic: collect user input with explicit form state, validation feedback, submission, and the rendering mechanics behind Angular forms.

Prior modules required: Modules 01–03.

After this module the learner can explain the manual signal input loop, build a reactive form from `FormControl` and `FormGroup`, attach validators, render feedback from touched and invalid state, submit a reactive form, and compare that stable forms engine with the Signal Forms API that is stable in Angular 22.

Micro-lessons:

- **04-01 Keep a manual signal input as the baseline.** Concept: `[value]` plus `(input)` is the raw two-direction loop behind a text field. Change: keep the dashboard input bound to `currentTitle = signal('')`, render the live echo, and name the browser event to signal to template update sequence explicitly.
- **04-02 Introduce a single reactive `FormControl`.** Concept: `FormControl` as an explicit model of one field; `ReactiveFormsModule` and `[formControl]` as the directive bridge. Change: replace the manual input with `protected readonly titleControl = new FormControl('', { nonNullable: true });`, bind it with `[formControl]="titleControl"`, and render `{{ titleControl.value }}` underneath.
- **04-03 Add a required validator.** Concept: `Validators.required`, synchronous validation timing, and status reads. Change: pass `{ nonNullable: true, validators: [Validators.required] }` to the control. Add a disabled submit button bound to `[disabled]="titleControl.invalid"`. Visible: the button stays disabled until the user types one character.
- **04-04 Show validation feedback after touch.** Concept: `touched` state, blur handling, and conditional error rendering with `@if`. Change: render "Title is required" only when the field is both touched and failing the required validator. Visible: the message appears after the learner focuses and blurs an empty field.
- **04-05 Combine controls into a `FormGroup`.** Concept: `FormGroup` for multi-field state; `[formGroup]` and `formControlName` as name-based bindings. Change: introduce `topicForm = new FormGroup({ title: ..., description: ... })`, bind a `<form>` to it, and add a title input plus description textarea.
- **04-06 Submit the reactive form and append a topic.** Concept: `(ngSubmit)`, value snapshots, invalid-submit guards, and reset. Change: add `(ngSubmit)="addTopic()"`. `addTopic()` checks `topicForm.invalid`, marks controls touched when needed, reads `topicForm.getRawValue()`, appends to the `topics` signal, and resets the form.
- **04-07 Introduce stable Signal Forms.** Concept: a writable signal model becomes the source of truth, and `form()` creates a field tree that mirrors that model. Change: replace the reactive form with `topicDraft = signal({ title: '', description: '' })`, `topicForm = form(topicDraft)`, and `[formField]` bindings for the title and description fields.
- **04-08 Validate and submit with Signal Forms.** Concept: schema validation, field state signals, `FormRoot`, submission actions, and `submitting()`. Change: add `required(path.title, { message: 'Title is required.' })`, render errors from `topicForm.title().errors()`, bind `[formRoot]="topicForm"`, and move the append/reset work into the Signal Forms submission action.

End-of-module visible state: a working Signal Forms dashboard form that validates the title, renders touched-field feedback, disables duplicate submissions while the action runs, and adds new topics to the list.

---

## Module 05: Dependency Injection

Topic: how Angular creates and shares services, and how to scope and replace them.

Prior modules required: Modules 01–04.

After this module the learner can inject a service with `inject()`, write a root-scoped service that owns signals, replace a service at the component or route level with a different implementation, and provide non-class values via `useValue` and `useFactory`.

Micro-lessons:

- **05-01 Create a service with `providedIn: 'root'`.** Concept: `@Injectable({ providedIn: 'root' })` and the root injector. Change: create `topic-store.ts` as an empty class with one method `getGreeting(): string { return 'Hello from TopicStore'; }`. No state moves yet.
- **05-02 Inject the service with `inject()`.** Concept: the `inject()` function as the modern alternative to constructor injection; how `private readonly store = inject(TopicStore);` reads. Change: inject `TopicStore` in `Dashboard`, render `{{ store.getGreeting() }}` somewhere visible. **Comparison callout**: `inject()` versus the Angular v15 constructor pattern.
- **05-03 Move a signal into the service.** Concept: a service that owns reactive state; a private writable signal exposed via `.asReadonly()`. Change: move the `topics` signal from `Dashboard` into `TopicStore` as `private readonly topicsSignal = signal<Topic[]>([…seed…]);` plus `readonly topics = this.topicsSignal.asReadonly();`. `Dashboard` reads `store.topics` and the toggle/add methods now live on the store. The visible UI is identical.
- **05-04 Add `computed` derived state to the service.** Concept: derived state belongs to the same owner as the source state. Change: move `completedCount` and the progress label computation into `TopicStore`. `Dashboard` reads them from `store`.
- **05-05 Scope a service at the component level.** Concept: providing a service inside `@Component({ providers: [...] })` creates a fresh instance for that component subtree. Change: introduce a tiny `LoggerService` that logs to the console with a configurable prefix. Provide it at the root with default prefix `"app"`. In `TopicDetails`, add `providers: [LoggerService]` and demonstrate that the local logger is a different instance. Log calls from `Dashboard` and `TopicDetails` show different prefixes after 05-06 wires that.
- **05-06 Replace an implementation with `useClass`.** Concept: provider tokens versus implementations; replacing one for another in a child injector. Change: define an abstract `Logger` token. Provide `ConsoleLogger` at the root with `useClass: ConsoleLogger`. In `TopicDetails`, override with `{ provide: Logger, useClass: VerboseLogger }` so the details page logs include the topic id. Demonstrates polymorphic DI.
- **05-07 Provide a plain value with `useValue`.** Concept: injection tokens and `useValue` for configuration values. Change: define `export const STORAGE_KEY = new InjectionToken<string>('STORAGE_KEY');`. Provide it at the root with `{ provide: STORAGE_KEY, useValue: 'learn-angular-22-topics' }`. Inject the token in `TopicStore` and use it in place of a hardcoded string. No visible UI change.
- **05-08 Build a value with `useFactory`.** Concept: `useFactory` for values that depend on other injectables. Change: provide a `{ provide: APP_BUILD_LABEL, useFactory: () => `built-at-${new Date().toISOString()}` }` token (or similar). Inject it in `App` and render it once in the footer. Demonstrates that providers can be computed.
- **05-09 Persist state with `effect`.** Concept: `effect()` as the bridge between a signal and an external side effect, including `localStorage`. Change: inside `TopicStore`, add an `effect(() => localStorage.setItem(this.storageKey, JSON.stringify(this.topicsSignal())));` and a `loadTopics()` that seeds from `localStorage`. Refreshing the page keeps custom topics and toggled state.

End-of-module visible state: a dashboard backed by a root `TopicStore` that owns signals and computed state, plus scoped/alternative provider examples that demonstrate the breadth of DI.

---

## Module 06: HTTP

Topic: load and modify data over HTTP against a real local API.

Prior modules required: Modules 01–05.

This module introduces `json-server` as a dev dependency and adds an `npm run api` script that serves a `db.json` file at `http://localhost:3000`. The learner runs `npm run api` in one terminal and `npm start` in another while working through the module. After this module the learner can configure `HttpClient`, make typed GET and POST requests, handle errors, and convert observables into signals.

Micro-lessons:

- **06-01 Add `json-server` and seed data.** Concept: a tiny local API and a two-process dev workflow. Change: install `json-server` as a dev dependency, add `"api": "json-server --watch db.json --port 3000"` to `package.json`, create `db.json` with a `"topics"` array seeded from the existing in-memory list. No app code change; the lesson asks the learner to `curl http://localhost:3000/topics` to confirm the API.
- **06-02 Register `HttpClient`.** Concept: `provideHttpClient()` in `app.config.ts`. Change: add `provideHttpClient()` to the providers list. No visible change yet.
- **06-03 GET the topic list.** Concept: `inject(HttpClient)`, `http.get<Topic[]>()`, subscribing to an observable. Change: in `TopicStore`, add `loadFromApi()` that subscribes to `this.http.get<Topic[]>('http://localhost:3000/topics')` and pushes the result into `topicsSignal`. Call `loadFromApi()` from the store constructor. Refresh the app: the list now comes from the API. The seed topics in the constructor are removed.
- **06-04 Handle a load error.** Concept: the observer `error` callback and surfacing failures in a signal. Change: add a `loadError = signal<string | null>(null)` to the store and set it from the error callback. Render an `@if (store.loadError(); as message) { … }` block on the dashboard. Stop `npm run api` and reload to see the error message.
- **06-05 POST a new topic.** Concept: `http.post<Topic>(url, body)`. Change: replace the local-only `addTopic` with one that POSTs to `http://localhost:3000/topics`, updates the signal from the API response, and falls back to a local append when the API is unavailable.
- **06-06 Bridge observable to signal with `toSignal`.** Concept: `toSignal()` from `@angular/core/rxjs-interop` and the tradeoffs of keeping data as an observable versus a signal. Change: rewrite `loadFromApi` to expose a `httpTopics = toSignal(this.http.get<Topic[]>(…), { initialValue: [] })` and have `topics` read from it (or replace the manual subscribe with this signal). Discuss when each style fits in the concept page.

End-of-module visible state: the dashboard loads topics from `http://localhost:3000/topics`, posts new ones back, and reflects API errors in the UI.

---

## Module 07: Deferrable Views

Topic: opt into lazy template rendering with `@defer`.

Prior modules required: Modules 01–06.

After this module the learner can defer part of a template behind a trigger and customize the loading, placeholder, and error states.

Micro-lessons:

- **07-01 Defer a panel on interaction.** Concept: the `@defer` block and `on interaction` trigger. Change: add a "Topic notes" panel to `TopicDetails` (a heavy component or just a styled block) and wrap it in `@defer (on interaction) { … }`. The panel renders only after the learner clicks an "Open notes" button.
- **07-02 Add loading, placeholder, and error blocks.** Concept: `@placeholder`, `@loading`, `@error`. Change: extend the deferred block with all three sibling blocks. Use a small artificial delay (e.g., a deferred component that resolves a delayed import) to make the loading state observable.

End-of-module visible state: the topic details page contains a deferred panel with proper loading and placeholder states.

---

## Module 08: Component and Store Testing

Topic: write small, behavior-focused tests with the project's existing Angular unit-test setup.

Prior modules required: Modules 01–07.

After this module the learner can configure a `TestBed`, render a component into a fixture, query the DOM, simulate events, and assert against signal-driven output. These tests run without a real browser and without starting the local API.

Micro-lessons:

- **08-01 Run the default test suite.** Concept: `npm test`, what the Angular unit-test runner does, how to read a passing run. Change: none in app code. The lesson asks the learner to run `npm test` and read the current spec files.
- **08-02 Render a component in a test.** Concept: `TestBed.configureTestingModule`, `createComponent`, `detectChanges`. Change: write a fresh `dashboard.spec.ts` that creates a `Dashboard` component and asserts that the page renders the app title.
- **08-03 Query and assert text content.** Concept: `fixture.nativeElement.querySelector`, asserting `textContent`. Change: extend the spec to assert that the progress label renders `"0 of N topics complete"` (or similar) on first render.
- **08-04 Simulate a click and assert.** Concept: dispatching a DOM event and re-running change detection. Change: write a test that clicks the form's submit button after typing a valid title, then asserts the new topic appears in the list. May require providing a fake `TopicStore` or a stub `HttpClient`.
- **08-05 Test a signal-driven computed.** Concept: testing the store directly without a component, asserting on `store.completedCount()`. Change: write `topic-store.spec.ts` that injects `TopicStore` with `TestBed.inject`, mutates state via the store's API, and asserts on computed values.

End-of-module visible state: `npm test` passes with several behaviorally-focused tests covering the dashboard and the store.

---

## Module 09: End-to-End Testing

Topic: test the working app through a real browser with Playwright.

Prior modules required: Modules 01-08.

After this module the learner can explain the E2E testing boundary, install Playwright Test, configure the Angular dev server through Playwright's `webServer`, write browser-driven tests with user-facing locators, test a form workflow, test route navigation and deferred UI, and control the API boundary for deterministic E2E tests.

This module uses Playwright as the example E2E tool. It does not replace Module 08 unit and component tests. Module 08 tests isolate Angular pieces. Module 09 tests whether the built app behaves correctly from the browser user's point of view.

Micro-lessons:

- **09-01 Add Playwright Test.** Concept: an E2E runner lives outside Angular TestBed and controls a browser. Change: run `npm init playwright@latest`, choose TypeScript and an `e2e` test folder, install browsers, and add `e2e` scripts.
- **09-02 Launch the app for E2E tests.** Concept: `webServer` starts the Angular dev server and `baseURL` lets tests navigate with relative paths. Change: configure `playwright.config.ts`, create a dashboard smoke test, and run `npm run e2e`.
- **09-03 Use locators and web-first assertions.** Concept: user-facing locators plus assertions that wait for visible state. Change: assert the progress label, a topic link, and a checkbox state from the real page.
- **09-04 Test a form workflow.** Concept: an E2E test drives browser interactions instead of calling component methods. Change: fill the topic form, submit it, and assert the new topic appears.
- **09-05 Test routing and deferred UI.** Concept: browser navigation, URL assertions, and waiting for deferred content after interaction. Change: navigate from the dashboard to a topic details route and open the deferred notes panel.
- **09-06 Control the API boundary.** Concept: deterministic E2E tests need a deliberate data boundary. Change: use Playwright request routing to fulfill the topics API with test data before the app loads.

End-of-module visible state: `npm run e2e` passes with Playwright tests for dashboard load, user-visible state, form submission, route navigation, deferred notes, and controlled API data.

---

## Further reading

- [docs/build-and-production.md](./build-and-production.md) — `npm run build`, what changes for production, and how lazy loading and deferrable views affect bundle size. Reference page, not a lesson.

## Suggested weekly rhythm

1. Read the module overview page once.
2. Work through micro-lessons in order. Each one should take well under an hour.
3. Before running the app, predict what the new code will do.
4. Run the app (and the API, for Module 06).
5. Compare the change with how the same idea would look in Angular v15, React, or Vue.
6. Commit the micro-lesson outcome before moving on.

## First step

Start with [docs/lessons/lesson-01-01-concept.md](./lessons/lesson-01-01-concept.md) and the matching task page. By the end of Module 01 the app shows a tracker page driven entirely by primitive signals — no arrays, no components, no router.
