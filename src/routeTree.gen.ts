/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/_auth'
import { Route as AppImport } from './routes/_app'
import { Route as AuthIndexImport } from './routes/_auth.index'
import { Route as AuthSignupImport } from './routes/_auth.signup'
import { Route as AuthLoginImport } from './routes/_auth.login'
import { Route as AppProgressImport } from './routes/_app.progress'
import { Route as AppProfileImport } from './routes/_app.profile'
import { Route as AppDashboardImport } from './routes/_app.dashboard'
import { Route as AppGameWhoWasItImport } from './routes/_app.game.who-was-it'
import { Route as AppGameSynAntImport } from './routes/_app.game.syn-ant'
import { Route as AppGameReadAndConcludeImport } from './routes/_app.game.read-and-conclude'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AppProgressRoute = AppProgressImport.update({
  id: '/progress',
  path: '/progress',
  getParentRoute: () => AppRoute,
} as any)

const AppProfileRoute = AppProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AppRoute,
} as any)

const AppDashboardRoute = AppDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AppRoute,
} as any)

const AppGameWhoWasItRoute = AppGameWhoWasItImport.update({
  id: '/game/who-was-it',
  path: '/game/who-was-it',
  getParentRoute: () => AppRoute,
} as any)

const AppGameSynAntRoute = AppGameSynAntImport.update({
  id: '/game/syn-ant',
  path: '/game/syn-ant',
  getParentRoute: () => AppRoute,
} as any)

const AppGameReadAndConcludeRoute = AppGameReadAndConcludeImport.update({
  id: '/game/read-and-conclude',
  path: '/game/read-and-conclude',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_app/dashboard': {
      id: '/_app/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AppDashboardImport
      parentRoute: typeof AppImport
    }
    '/_app/profile': {
      id: '/_app/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AppProfileImport
      parentRoute: typeof AppImport
    }
    '/_app/progress': {
      id: '/_app/progress'
      path: '/progress'
      fullPath: '/progress'
      preLoaderRoute: typeof AppProgressImport
      parentRoute: typeof AppImport
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/_auth/': {
      id: '/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthImport
    }
    '/_app/game/read-and-conclude': {
      id: '/_app/game/read-and-conclude'
      path: '/game/read-and-conclude'
      fullPath: '/game/read-and-conclude'
      preLoaderRoute: typeof AppGameReadAndConcludeImport
      parentRoute: typeof AppImport
    }
    '/_app/game/syn-ant': {
      id: '/_app/game/syn-ant'
      path: '/game/syn-ant'
      fullPath: '/game/syn-ant'
      preLoaderRoute: typeof AppGameSynAntImport
      parentRoute: typeof AppImport
    }
    '/_app/game/who-was-it': {
      id: '/_app/game/who-was-it'
      path: '/game/who-was-it'
      fullPath: '/game/who-was-it'
      preLoaderRoute: typeof AppGameWhoWasItImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

interface AppRouteChildren {
  AppDashboardRoute: typeof AppDashboardRoute
  AppProfileRoute: typeof AppProfileRoute
  AppProgressRoute: typeof AppProgressRoute
  AppGameReadAndConcludeRoute: typeof AppGameReadAndConcludeRoute
  AppGameSynAntRoute: typeof AppGameSynAntRoute
  AppGameWhoWasItRoute: typeof AppGameWhoWasItRoute
}

const AppRouteChildren: AppRouteChildren = {
  AppDashboardRoute: AppDashboardRoute,
  AppProfileRoute: AppProfileRoute,
  AppProgressRoute: AppProgressRoute,
  AppGameReadAndConcludeRoute: AppGameReadAndConcludeRoute,
  AppGameSynAntRoute: AppGameSynAntRoute,
  AppGameWhoWasItRoute: AppGameWhoWasItRoute,
}

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren)

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthSignupRoute: typeof AuthSignupRoute
  AuthIndexRoute: typeof AuthIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthSignupRoute: AuthSignupRoute,
  AuthIndexRoute: AuthIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren
  '/dashboard': typeof AppDashboardRoute
  '/profile': typeof AppProfileRoute
  '/progress': typeof AppProgressRoute
  '/login': typeof AuthLoginRoute
  '/signup': typeof AuthSignupRoute
  '/': typeof AuthIndexRoute
  '/game/read-and-conclude': typeof AppGameReadAndConcludeRoute
  '/game/syn-ant': typeof AppGameSynAntRoute
  '/game/who-was-it': typeof AppGameWhoWasItRoute
}

export interface FileRoutesByTo {
  '': typeof AppRouteWithChildren
  '/dashboard': typeof AppDashboardRoute
  '/profile': typeof AppProfileRoute
  '/progress': typeof AppProgressRoute
  '/login': typeof AuthLoginRoute
  '/signup': typeof AuthSignupRoute
  '/': typeof AuthIndexRoute
  '/game/read-and-conclude': typeof AppGameReadAndConcludeRoute
  '/game/syn-ant': typeof AppGameSynAntRoute
  '/game/who-was-it': typeof AppGameWhoWasItRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteWithChildren
  '/_auth': typeof AuthRouteWithChildren
  '/_app/dashboard': typeof AppDashboardRoute
  '/_app/profile': typeof AppProfileRoute
  '/_app/progress': typeof AppProgressRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/signup': typeof AuthSignupRoute
  '/_auth/': typeof AuthIndexRoute
  '/_app/game/read-and-conclude': typeof AppGameReadAndConcludeRoute
  '/_app/game/syn-ant': typeof AppGameSynAntRoute
  '/_app/game/who-was-it': typeof AppGameWhoWasItRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/dashboard'
    | '/profile'
    | '/progress'
    | '/login'
    | '/signup'
    | '/'
    | '/game/read-and-conclude'
    | '/game/syn-ant'
    | '/game/who-was-it'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/dashboard'
    | '/profile'
    | '/progress'
    | '/login'
    | '/signup'
    | '/'
    | '/game/read-and-conclude'
    | '/game/syn-ant'
    | '/game/who-was-it'
  id:
    | '__root__'
    | '/_app'
    | '/_auth'
    | '/_app/dashboard'
    | '/_app/profile'
    | '/_app/progress'
    | '/_auth/login'
    | '/_auth/signup'
    | '/_auth/'
    | '/_app/game/read-and-conclude'
    | '/_app/game/syn-ant'
    | '/_app/game/who-was-it'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRoute: typeof AppRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AppRoute: AppRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/_auth"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/dashboard",
        "/_app/profile",
        "/_app/progress",
        "/_app/game/read-and-conclude",
        "/_app/game/syn-ant",
        "/_app/game/who-was-it"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/signup",
        "/_auth/"
      ]
    },
    "/_app/dashboard": {
      "filePath": "_app.dashboard.tsx",
      "parent": "/_app"
    },
    "/_app/profile": {
      "filePath": "_app.profile.tsx",
      "parent": "/_app"
    },
    "/_app/progress": {
      "filePath": "_app.progress.tsx",
      "parent": "/_app"
    },
    "/_auth/login": {
      "filePath": "_auth.login.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth.signup.tsx",
      "parent": "/_auth"
    },
    "/_auth/": {
      "filePath": "_auth.index.tsx",
      "parent": "/_auth"
    },
    "/_app/game/read-and-conclude": {
      "filePath": "_app.game.read-and-conclude.tsx",
      "parent": "/_app"
    },
    "/_app/game/syn-ant": {
      "filePath": "_app.game.syn-ant.tsx",
      "parent": "/_app"
    },
    "/_app/game/who-was-it": {
      "filePath": "_app.game.who-was-it.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
