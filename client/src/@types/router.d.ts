export {}

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}
