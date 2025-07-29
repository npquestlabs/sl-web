# Turborepo + Ract Router v7

This project is a boilerplate/template for turborepo with React Router v7 and
other common packages.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [React Router v7](https://reactrouter.com/) app
- `@repo/ui`: React component library used by `web` and powered by [shadcn/ui](https://ui.shadcn.com/)
- `@repo/auth`: authentication package powered by [Better Auth](http://better-auth.com/)
- `@repo/database`: Database package powered by [Drizzle ORM](https://orm.drizzle.team/)
- `@repo/eslint-config`: `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
