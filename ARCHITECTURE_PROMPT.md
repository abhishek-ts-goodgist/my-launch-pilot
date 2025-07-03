# 🚀 React Project Robust Architecture System Prompt

## Purpose
This system prompt describes a production-level, maintainable, and scalable React (+Vite+TS) architecture with the following enforced best practices:

- **Separation of concerns by domain:** API services, global state, types, custom hooks, UI, app, and routes.
- **Modern data layer:** Axios for API/services, Zustand for global state, custom hooks for state consumption.
- **Modularity for growth:** File/folder setup makes adding new domains easy and consistent.

---

## 💡 HTTP Client, Endpoints, and Env Boilerplate (GENERIC)

### ⚠️ Setup Order
- **Create your Zustand stores (e.g., for authentication) _before_ your http client.**
- Your `httpClient.ts` can import and use Zustand to access tokens or state needed for requests/interceptors.

### httpClient.ts (Generic Template)
```ts
import axios from 'axios';
import { API_BASE_URL } from './env';
// Example: import your auth store to fetch tokens for Authorization
// import { useAuthStore } from '@/stores/authStore';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

httpClient.interceptors.request.use(
  (config) => {
    // Example of adding auth header from Zustand
    // const token = useAuthStore.getState().token;
    // if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle global errors (401, etc) here
    return Promise.reject(error);
  }
);

export default httpClient;
```

### endpoints.ts (Generic Template)
```ts
import { API_BASE_URL } from './env';

export const endpoints = {
  resourceA: {
    list: () => `${API_BASE_URL}/resourceA/`,
    details: (id: string) => `${API_BASE_URL}/resourceA/${id}`,
    // ...
  },
  resourceB: {
    list: (params?: { skip?: number; limit?: number }) =>
      `${API_BASE_URL}/resourceB/?${params?.skip ? `skip=${params.skip}&` : ''}${params?.limit ? `limit=${params.limit}` : ''}`,
    details: (id: string) => `${API_BASE_URL}/resourceB/${id}`,
    // ...
  },
  // More resources as needed...
} as const;
```

### env.ts (Boilerplate Example)
```ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
export const ENVIRONMENT = import.meta.env.MODE;
```
---

## 1. Project Structure

```
src/
├── api/
│   ├── httpClient.ts          // Axios instance & interceptors
│   ├── endpoints.ts           // Endpoint definitions, one place only
│   └── env.ts                 // BaseURL and env-based config
│
├── services/
│   ├── [domain]Service.ts     // All API logic per domain (CRUD, fetch, etc)
│   └── ...
│
├── stores/
│   ├── [domain]Store.ts       // Zustand store per domain
│   └── ...
│
├── hooks/
│   └── use[Domain].ts         // Custom hooks to grab Zustand state (fetched, derived, etc)
│
├── types/
│   └── [domain].ts            // Typescript types/entities per domain
│
├── components/
│   ├── ui/                    // Shadcn/ui components only
│   └── app/                   // All domain/layout/smart app components
│
├── routes/
│   └── ...                    // Route definitions & logic separated from UI
│
└── ...                        // index.css, main.tsx, vite-env.d.ts etc.
```

## 2. Principles

- **Keep everything domain-driven (per feature/domain):** Types, service, state, hook, and UI smartly separated.
- **Keep API logic out of the UI.** UI = display and state consumption only.
- **Zustand for global state:** Each domain in its store file. Use hooks for subscription/logic.
- **Custom hooks for every store:** Standardizes state/data access for all components.
- **All Axios config (tokens, interceptors) & endpoints defined centrally.**
- **Components: `ui/` = shadcn/ui ONLY; `app/` = everything else.**
- **Routes live under `routes/.`**
- **Types go under `/types`, re-used everywhere.**

---

## 3. System Prompt (Copy-paste in every new project root for reference)

---

```
You MUST strictly follow these rules:

1. Services:
    - All HTTP/API logic per domain to reside in `src/services/[domain]Service.ts`.
    - No API call logic in components or hooks.
2. State Management:
    - All Zustand stores **must** be created in the `src/stores/` directory (one file per domain: `src/stores/[domain]Store.ts`).
    - Never place stores in any other directory.
    - Each store exposes fetch/update logic and state.
3. Custom Hooks:
    - Each store must have a matching hook in `src/hooks/use[Domain].ts` for consuming state (and effects if needed).
    - Hooks do **NOT** duplicate state logic, only encapsulate selection and side-effect behavior.
4. API Setup:
    - `src/api/httpClient.ts`: Holds axios instance + all interceptors.
    - `src/api/endpoints.ts`: String endpoints, segment by resource, NO hard-coded strings elsewhere.
    - `src/api/env.ts`: Holds all environment/base URLs.
5. Typings:
    - Every entity/domain gets a `/types/[domain].ts`.
    - All communication among service/store/hooks/components must use imported types.
6. Routing:
    - All routing logic (`ProtectedRoute`, `Routes`, etc.) lives under `src/routes/`, not in app/components.
7. Components:
    - `src/components/ui/` (shadcn) = ONLY UI primitives (Button, Sheet, Dialog, Dropdown...)
    - `src/components/app/` = app-level (layout, sidebar, header, feature blocks, etc)
8. Organization:
    - No cross-domain imports except through types/hooks.
    - File naming, imports, and exports must remain consistent.
```

---

## 🛣️ App Routes & Protected Route: Template Example

**(Place all route logic in `/src/routes/`)**

**src/routes/ProtectedRoute.tsx**
```tsx
import { Navigate, Outlet } from 'react-router-dom';
// Example: import your auth Zustand store
// import { useAuthStore } from '@/stores/authStore';

const ProtectedRoute = () => {
  // Replace below with actual Zustand store for authentication
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoggedIn = false; // <-- placeholder for demonstration

  // If user is not authenticated, redirect to login (or wherever)
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
```

**src/routes/Routes.tsx**
```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import App components, pages, and ProtectedRoute as needed
// import ProtectedRoute from './ProtectedRoute';
// import HomePage from '@/components/app/HomePage';
// import LoginPage from '@/components/app/LoginPage';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public route */}
      {/* <Route path='/login' element={<LoginPage />} /> */}

      {/* Protected route group */}
      {/* 
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<HomePage />} />
        {/* Add more protected routes here */}
      {/* </Route> */}
    </Routes>
  </Router>
);

export default AppRoutes;
```

> **Note:** Replace `isLoggedIn` and imports with your actual Zustand store and components. Always keep all routing setup in files under `src/routes/`.

---

## 4. Templated Example: Generic Domain ("User")

> **☝️ Template Usage Note:**
> The sample “user” domain below is purely for illustration and as a pattern.
> - When designing a real project or feature, always use your actual domain/entity name
>   (e.g. `product`, `article`, `todo`, `workspace`, etc),
>   do not generate `user` stores/services/types unless your domain is actually "user".
> - Code generation tools and developers should dynamically generate files based on your domain name and use case
>   (e.g. `useBlogStore`, `projectService`, `types/todo.ts`, etc).

For every new domain, you should use this **generic template**. Just replace `user`/`User` with your own domain (e.g. `product`, `project`, `article`).

**src/types/user.ts**
```ts
export interface User {
  id: string;
  name: string;
  email: string;
  // Extend as needed
}
```

**src/services/userService.ts**
```ts
import httpClient from '@/api/httpClient';
import { endpoints } from '@/api/endpoints';
import type { User } from '@/types/user';

export const getUsers = async (): Promise<User[]> => {
  const response = await httpClient.get(endpoints.users.list());
  return response.data;
};
// Add create, update, delete as needed for your domain
```

**src/stores/userStore.ts**
```ts
import { create } from 'zustand';
import type { User } from '@/types/user';
import { getUsers } from '@/services/userService';

type UserState = {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await getUsers();
      set({ users, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch users', isLoading: false });
    }
  },
}));
```

**src/hooks/useUser.ts**
```ts
import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';

export const useUser = () => {
  const { users, fetchUsers, isLoading, error } = useUserStore();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return { users, isLoading, error };
};
```

**Usage:**
```tsx
import { useUser } from '@/hooks/useUser';

const UserList = () => {
  const { users, isLoading, error } = useUser();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name} - {u.email}</li>
      ))}
    </ul>
  );
};
```

---

## 5. Summary: What this achieves

- **Growth:** Predictable file structure; easily add new domains every time.
- **Separation:** UI, data, and logic never get mixed.
- **Type safety & reuse:** Types everywhere.
- **Smart routes:** Routing code stays clear from domain/app logic.
- **UI system:** Shadcn in `ui/`, nothing else.
- **API control:** No stray axios logic anywhere - always via domain service.
- **Dev speed:** Onboard and extend easily; pattern is always clear.