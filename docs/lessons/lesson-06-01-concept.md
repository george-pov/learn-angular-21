# Lesson 06-01 Concept: Add `json-server` and Seed Data

## Goal

Add a tiny local HTTP API for topics. The Angular app will still use local state in this lesson; the API is introduced first so later HTTP lessons have something real to call.

## The single new concept

This lesson introduces a two-process development workflow:

```text
Terminal 1: npm run api
Terminal 2: npm start
```

The API process serves `db.json`. The Angular process serves the app.

With `json-server`, this file:

```json
{
  "topics": [
    {
      "id": 1,
      "title": "Standalone components",
      "description": "Understand component metadata and standalone imports.",
      "done": true
    }
  ]
}
```

creates this endpoint:

```text
http://localhost:3000/topics
```

## Prior knowledge assumed

- Lesson 05-09: the app already has local topic persistence in `TopicStore`.
- Basic command-line workflow with `npm` scripts.

## Why add the API before Angular HTTP code?

This keeps the first HTTP module step observable without changing the app. You can verify the API independently before introducing `HttpClient`.

That separation matters for debugging:

- If `npm run api` fails, the problem is API setup.
- If `npm start` fails later, the problem is Angular app setup.
- If the app cannot load topics later, you already know whether the API responds.

## Comparison callout

React, Vue, and Angular apps all need some data source before learning HTTP. `json-server` is not an Angular feature. It is a small local API so this learning project can practice real HTTP calls without adding backend architecture.
