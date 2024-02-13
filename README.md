# Finovatek's Dashboard

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

### Tech stack
 - NextJS
 - Mantine
 - Mantine React Table
 - React Query or Server Actions?
 - Prisma
 - Next Auth
 - Vercel for Hosting

### Vercel Hosting
To manage Vercel's hosting of the capstone's project, you will need to access the [Vercel Dashboard](https://vercel.com/dashboard). You will need to use the Finovatek Solutions' google account to access the dashboard.

### Google credentials
To manage the Google Credentials, you will need to access the [Google Cloud Console](https://console.cloud.google.com/). You will need to use the Finovatek Solutions' google account to access the console.

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Database scripts

- `migrate` - pushes the changes in the schema to the database
- `studio` - runs prisma studio

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

### Color palette
[color palette generator](https://mycolor.space/?hex=%23445963&sub=1)