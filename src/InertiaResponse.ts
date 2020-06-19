import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class InertiaResponse {
  constructor (private componentPath: string, private props: unknown[], private ctx: HttpContextContract) {}

  public toResponse () {
    // TODO:
    // Handle partial update with X-Inertia-Partial-Component and X-Inertia-Partial-Data
    // See: https://inertiajs.com/the-protocol#partial-reloads

    const page = {
      component: this.componentPath,
      props: this.props,
      url: this.ctx.request.url(),
      version: null,
    }

    if (this.ctx.request.header('X-Inertia')) {
      this.ctx.response.header('Vary', 'Accept')
      this.ctx.response.header('X-Inertia', true)

      return this.ctx.response.json({ ...page })
    }

    return this.ctx.view.render('app', { page })
  }
}
