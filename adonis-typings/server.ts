declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    inertia (componentPath: string, props?: any)
  }
}
