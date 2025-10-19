# AI Coding Agent Instructions

## Project Architecture

This is a **monorepo** with three workspaces managed from the root:

- `backend/` - NestJS API (port 3000)
- `frontend/` - React SPA with Vite + TanStack Router
- `tests/` - Playwright E2E tests

**Critical workflow**: Run commands from root using `npm run <script>` which delegates to workspaces. Direct workspace commands must `cd` into the directory first.

### Development Commands

```bash
npm run dev              # Start both backend + frontend (uses wait-on)
npm run build            # Build both applications
npm test                 # Run Playwright tests
npm test:ui              # Open Playwright UI
npm run lint             # Lint all workspaces
npm run format           # Format all workspaces (Prettier)
```

Backend auto-generates OpenAPI spec on startup. Frontend's Orval consumes it to generate type-safe API clients.

## Backend Architecture (NestJS)

### Result Pattern (Critical)

All service methods return `Result<T>` type (never throw errors):

```typescript
// src/types/result.type.ts pattern
type Result<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: Error };

// Usage in services
return successResult(user); // from @/utils/success-result.util
return errorResult("message"); // from @/utils/error-result.util
```

Controllers handle Result unwrapping and throw HTTP exceptions.

### Layer Architecture (Enforced by eslint-plugin-boundaries)

```
Controller → Service → Database → DAO → Entity
     ↓          ↓         ↓        ↓
    DTO    (uses Result)
```

**Key rules**:

- DTOs can import entities and other DTOs
- Services use Result pattern, never throw errors
- Controllers unwrap Results and throw NestJS exceptions
- DAOs transform between database and entities via `toEntity()`
- Guards can access services and DTOs (see `auth.guard.ts`)

### Authentication Pattern

- Cookie-based auth using `token` cookie (userId stored directly)
- `AuthGuard` validates token, attaches `UserDto` to `request.user`
- Use `@CurrentUser()` decorator to access authenticated user in controllers
- Test user: `user@example.com` / `strongPassword123` (see `mock.database.ts`)

### OpenAPI Generation

Backend writes `openapi.yaml` on startup in development. To regenerate:

```bash
cd backend && npm run generate:openapi
```

This triggers frontend's Orval to regenerate API clients automatically via `prepare` script.

## Frontend Architecture (React)

### File-Based Routing (TanStack Router)

- Routes in `src/routes/` generate `routeTree.gen.ts` automatically
- `_authenticated.tsx` layout protects child routes via `beforeLoad`
- Auth context passed via router context (see `__root.tsx`)

### API Client Generation (Orval)

Generated clients in `src/api/generated/` and types in `src/types/generated/`:

```bash
cd frontend && npm run generate:api
```

Auto-runs on `npm install` via `prepare` script. Generates React Query hooks from OpenAPI spec.

### Authentication Flow

1. `useAuth()` hook provides auth state (from `AuthContext`)
2. Protected routes use `_authenticated` layout
3. Login redirects via `search.redirect` parameter
4. API calls include credentials automatically (cookies)

### i18n Setup

- Translations in `src/assets/locales/{en,de}.json`
- Type-safe via `src/@types/i18next.d.ts`
- Default language: English

## Testing (Playwright)

### Page Object Model Pattern

Tests use custom fixtures extending Playwright (see `e2e/fixtures.ts`):

```typescript
test("description", async ({ loginPage, dashboardPage, user }) => {
  // loginPage, dashboardPage are auto-injected POMs
  // user is a pre-created test user
});
```

Pages in `e2e/pages/` encapsulate selectors and actions. Always use page objects, never raw selectors in tests.

### Test User Management

`createTestUser()` from `e2e/utils/user.util.ts` creates users for tests (currently returns hardcoded test user).

## Code Organization Conventions

### Import Aliases

Both frontend and backend use `@/` for `src/`:

```typescript
import { UserService } from "@/features/user/user.service";
import { useAuth } from "@/hooks/useAuth";
```

### Feature-Based Structure

- Backend: `src/features/{feature}/{feature}.{controller,service,module}.ts`
- Frontend: `src/features/{feature}/components/`
- Each feature is self-contained with dtos/, guards/, entities/ subdirectories

### Naming Conventions

- **Backend**: `*.controller.ts`, `*.service.ts`, `*.module.ts`, `*.guard.ts`, `*.dto.ts`, `*.entity.ts`, `*.dao.ts`
- **Frontend**: `*.page.ts` (Playwright), `*.tsx` (React components)
- DTOs use class-validator decorators for validation

## Linting & Formatting

### Boundary Rules (Critical)

`eslint-plugin-boundaries` enforces architectural constraints:

**Backend layers** (most restrictive first):

- `dto` → only imports shared, other DTOs, entities
- `entity` → only imports shared, other entities
- `guard` → imports shared, services, controllers, DTOs
- `service` → imports shared, other services, DAOs, databases, entities
- `controller` → imports shared, controllers, services, guards, entities, DTOs

**Frontend layers**:

- `feature` → can only import from same feature or shared
- `shared` → imports nothing but other shared

Generated files (`frontend/src/api/generated/**`, `frontend/src/types/generated/**`) are ignored by linting.

### Format & Lint Workflow

```bash
npm run format        # Auto-fix with Prettier (includes organize-imports)
npm run format:check  # Check only (CI)
npm run lint         # ESLint with max-warnings=0
```

Husky + lint-staged configured (currently no-op in root `lint-staged.config.mjs`).

## Common Patterns

### Adding a New Backend Feature

1. Create `src/features/{name}/{name}.module.ts`
2. Add controller, service, DTOs following Result pattern
3. Import module in `app.module.ts`
4. Backend auto-generates OpenAPI → frontend regenerates clients

### Adding a Protected Frontend Route

1. Create `src/routes/_authenticated/{route}/index.tsx`
2. Route automatically requires authentication (via layout)
3. Use generated API hooks from `src/api/generated/`

### Adding E2E Tests

1. Create page object in `tests/e2e/pages/{page}.page.ts`
2. Add to fixtures in `tests/e2e/fixtures.ts`
3. Write tests using fixtures pattern (see `auth/login.spec.ts`)
