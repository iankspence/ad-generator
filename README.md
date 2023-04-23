# Monorepo

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Naming Conventions](#naming-conventions)
4. [Development](#development) (TBD)
5. [Deployment](#deployment) (TBD)

## Overview

This is a monorepo for a Next.js frontend and a Nest backend.

## Getting Started

1. Install dependencies: `yarn`
2. Serve the frontend and backend: `yarn nx serve frontend` and `yarn nx serve backend`
3. Navigate to `http://localhost:4200/` to view the frontend.

# Naming conventions
- camelCase
- PascalCase
- kebab-case

## General Rule
- Directories in any location should use kebab-case

## Nx apps and libs
Nx apps and libs use kebab-case (e.g. `nx g @nrwl/react:app my-app`).

## Frontend
The frontend is a Next.js app named `frontend`.

### Next Pages
Next pages are located in the `pages` directory. Next page file names use kebab-case (e.g. `pages/forgot-password.tsx`).

The `pages` directory is a special directory in Next.js. Any React component files inside it are treated as Next.js pages automatically.

The export from the pages uses PascalCase and includes the `Page` suffix (e.g. `ForgotPasswordPage`).

### React Components
React components are located in the `components` directory and use PascalCase (e.g. `components/MyComponent.tsx`).

### React Contexts
React contexts are located in the `contexts` directory and use PascalCase (e.g. `contexts/MyContext.tsx`).

### React Hooks
React hooks are located in the `hooks` directory and use camelCase (e.g. `hooks/useMyHook.ts`).

### React Utils
React utils are located in the `utils` directory and use camelCase (e.g. `utils/myUtil.ts`).

## Backend
The majority of the Nest backend code is located in the `backend-core` lib.

### Backend Modules
Backend modules are located in the `lib/modules` directory and use kebab-case (e.g. `modules/my-module`).

### Backend Controllers
Backend controllers are located in the `lib/modules` directory and use kebab-case (e.g. `modules/my-module/my-controller.controller.ts`).

### Backend Services
Backend services are located in the `lib/modules` directory and use kebab-case (e.g. `modules/my-module/my-service.service.ts`).

### Backend Utils
Backend utils are located in the `lib/utils` directory and use camelCase (e.g. `utils/myUtil.ts`).

## Type
Type files are located in the `type` lib.  This can be accessed anywhere via `@monorepo/type`.

DTO, interface, schema, and enum files use kebab-case (e.g. `dto/my-dto.ts`) and are exported in PascalCase (e.g. `MyDto`).






