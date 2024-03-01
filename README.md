<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD026 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

<h1 align="center">
  Finovatek Dashboard
</h1>

The latest in automated financial management.

**Behold the savings!**

## Features

### Framework

- **[Next.js](https://nextjs.org)** – A complete React framework for hybrid and server rendering

### Authentication

- **[NextAuth.js](https://next-auth.js.org/)** – Authentication for Next.js

### Data Fetching & Server State Management

- **[React Query](https://tanstack.com/query)** – Hooks for fetching, caching, and updating asynchronous data in React

### Database ORM & CRUD operations

- **[Prisma ORM](https://www.prisma.io/orm)** – Intuitive data model, automated migrations, type-safety & auto-completion
- **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)** – Asynchronous functions that are executed on the server to handle data mutations

### Form Validation

- **[Zod](https://zod.dev)** – TypeScript-first schema validation with static type inference
- **[Zod-Prisma-Types](https://www.npmjs.com/package/zod-prisma-types)** – Generates zod schemas from Prisma models with advanced validation
- **[Mantine-Form-Zod-Resolver](https://mantine.dev/form/schema-validation/#zod)** – Allows the use of Zod schemas in Mantine's forms

### Design System and Animations

- **[Mantine-UI](https://mantine.dev)** – A simple, modular, and accessible component library that gives you the building blocks to build your React applications
- **[Mantine React Table](https://v2.mantine-react-table.com/)** – Combine TanStack Table's Extensive API With Mantine's Awesome Pre-Built Components
- **[Tabler Icons](https://tabler-icons-react.vercel.app)** – A collection of popular icons to React projects
- **[PostCSS](https://postcss.org/)** – Transform CSS with the power of JavaScript

### Tests

- **[Jest](https://jestjs.io)** – A delightful JavaScript Testing Framework with a focus on simplicity
- **[Testing Library](https://testing-library.com)** – Simple and complete testing utilities that encourage good testing practices
- **[Storybook](https://storybook.js.org/)** – A frontend workshop for building UI components and pages in isolation

### Design Patterns

- **[ESLint](https://eslint.org)** – Find and fix problems in your JavaScript code
- **[Prettier](https://prettier.io)** – An opinionated code formatting tool, supporting multiple languages and code editors


## Hosting

### Next.js, Flask, and PostgreSQL

To access the following hosting resources, you must be logged into the FinovatekSolutions account

- **[Vercel Dashboard](https://vercel.com/dashboard)** – Easy and reliable hosting for frontend, backend, and databases

### Google Authentication

- **[Google Cloud Console](https://console.cloud.google.com/)** – Manage Google Credentials

## Getting Started

### Installation

- `yarn install` - Install dependencies

### Build and dev scripts

- `dev` – Start dev server
- `build` – Bundle application for production
- `analyze` – Analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – Checks TypeScript types
- `lint` – Runs ESLint
- `prettier:check` – Checks files with Prettier
- `jest` – Runs jest tests
- `jest:watch` – Starts jest watch
- `test` – Runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Database scripts

- `migrate` - Pushes the changes in the schema to the database
- `studio` - Runs prisma studio

### Other scripts

- `storybook` – Starts storybook dev server
- `storybook:build` – Build production storybook bundle to `storybook-static`
- `prettier:write` – Formats all files with Prettier
