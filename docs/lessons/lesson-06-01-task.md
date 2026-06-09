# Lesson 06-01 Task: Add `json-server` and Seed Data

## Feature to build

Install `json-server`, add an `npm run api` script, and create `db.json` with the same seed topics the app already uses.

## Files to edit

- `package.json`
- `package-lock.json`

## Files to create

- `db.json`

## Steps

1. Install `json-server` as a dev dependency:

   ```powershell
   npm install --save-dev json-server
   ```

2. In `package.json`, add an API script:

   ```json
   "api": "json-server --watch db.json --port 3000"
   ```

3. Create `db.json` at the repository root:

   ```json
   {
     "topics": [
       {
         "id": 1,
         "title": "Standalone components",
         "description": "Understand component metadata and standalone imports.",
         "done": true
       },
       {
         "id": 2,
         "title": "Signals",
         "description": "Use signals for local reactive state.",
         "done": false
       },
       {
         "id": 3,
         "title": "Template control flow",
         "description": "Render branches and lists with modern template syntax.",
         "done": false
       }
     ]
   }
   ```

4. Start the API:

   ```powershell
   npm run api
   ```

5. In another terminal, confirm the endpoint responds:

   ```powershell
   Invoke-RestMethod http://localhost:3000/topics
   ```

## Prediction

Before starting the API, predict whether the Angular app UI should change in this lesson. What should the API return?

## Verify

- `npm run api` starts a server on port `3000`.
- `Invoke-RestMethod http://localhost:3000/topics` returns three topics.
- The Angular app behavior is unchanged.
- No Angular HTTP code has been added yet.

## Reflection

- Why verify the API before adding `HttpClient`?
- Why does this lesson require two terminal processes?
- What part of this lesson is Angular-specific?
