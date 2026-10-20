# AGENTS.md

Next.js 16 App Router + React 19 + Tailwind v4 frontend for a todo app. The API is a separate Express/MongoDB server in `../server`; there is no workspace/monorepo tooling, so install and run each side independently.

## Commands

- Use `npm` (`package-lock.json` is the only lockfile).
- `npm run dev` — dev server on port 3000.
- `npm run build` / `npm run start` — production build and serve.
- `npm run lint` — invokes bare `eslint` over the repo with the flat config in `eslint.config.mjs`.
- No test runner and no typecheck script. Verify with `npx tsc --noEmit && npm run lint`.

## Backend dependency

- `src/app/page.tsx` is an async Server Component that fetches `http://localhost:5000/lists` at render time. Start the backend first or the page render fails with a connection error.
- Backend has no start script: run `node index.js` from `../server`. It requires `MONGO_DB_CLIENT` in `../server/.env`.
- The backend currently implements only `GET /lists`, and it returns a snapshot loaded once at server startup. `AddTodo` only `console.log`s form data; there is no POST/write endpoint yet.

## Structure and conventions

- `src/app` — routes and global CSS; `src/components` — components; `src/types` — shared types. `@/*` maps to `src/*`.
- Keep `src/app/page.tsx` as a Server Component. Add `"use client"` only to components that need browser events/state (e.g. `AddTodo.tsx`).
- UI is HeroUI v3 (`@heroui/react`) with Tailwind v4. Global CSS imports `tailwindcss` and `@heroui/styles`; Tailwind is wired through the Turbopack loader in `next.config.ts`. Do not add `tailwind.config.*` or `postcss.config.*`.
- Todo shape lives in `src/types/list-type.ts` (`_id`, `title`, `completed`). The existing component name `TodoListCart` is a typo ("Cart"); match it unless renaming everywhere.

## Gotchas

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler`. After client-side mutations, refresh server data explicitly with `revalidatePath("/")` (server action) or `router.refresh()`.
- Route types such as `LayoutProps<"/">` are generated into `.next/types`; run `npm run dev` or `npm run build` after adding routes before trusting `tsc`.
- `next-env.d.ts` is generated and gitignored — never edit it.
