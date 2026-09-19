# DevTinder — Frontend

React + TypeScript client for the `dev-tinder` backend.

**Stack:** Vite · React 19 · TanStack Query (server state) · Zustand (client state) · React Hook Form + Zod (forms) · React Router · Tailwind CSS

## Run it

```bash
# 1. backend (needs a reachable MongoDB — see dev-tinder/.env)
cd dev-tinder && npm run dev          # http://localhost:3009

# 2. frontend
cd "dev-tinder(FE)" && npm install && npm run dev   # http://localhost:5173
```

In development, Vite proxies `/api/*` to `http://localhost:3009/*` (see `vite.config.ts`),
so the browser sees one origin: no CORS setup, and the `accessToken` cookie works.

| Script | Does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | typecheck + production build |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |
| `npm run format` | prettier |

## Folder structure

```
src/
  app/          providers, query client, router, route guards, root layout
  api/          httpClient (the only place that calls fetch), ApiError, queryKeys
  features/     one folder per feature: auth, feed, requests, connections, profile
    <feature>/
      api.ts          plain functions that call httpClient
      hooks/          useQuery / useMutation wrappers
      components/     UI specific to this feature
      schemas.ts      zod schemas for its forms (if any)
  components/
    ui/         reusable building blocks (Button, Input, Card, ...)
    layout/     Navbar, AppLayout, AuthLayout, Toaster, PageHeader
  pages/        one component per route; composes hooks + components
  store/        Zustand stores (authStore, toastStore)
  types/        shared TypeScript types
  lib/          small pure helpers
```

## Rules of thumb

- **Data flow:** page → feature hook → feature `api.ts` → `httpClient`. Components never call `fetch`.
- **Where state lives:** anything from the server lives in TanStack Query. Zustand holds only
  client/session state (who is logged in, toasts).
- **Query keys** come from `src/api/queryKeys.ts`. After a mutation, invalidate the matching key.
- **Errors:** every failed request becomes an `ApiError` (`message`, `status`, `endpoint`).
  A 401 anywhere clears the session and the route guards send you to `/login`.
- **Naming:** components `PascalCase.tsx`, hooks `useSomething.ts`, one component per file, named exports.

## Debugging

- **React Query Devtools:** the floating button in the corner. Shows every query key, its data, and its status.
- **Redux DevTools extension:** shows `authStore` and `toastStore`, with named actions (`auth/setUser`, ...).
- **Console:** in dev, every failed request logs `[api] METHOD /path -> status` with the response body.
