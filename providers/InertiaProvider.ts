import { IocContract } from '@adonisjs/fold'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { InertiaResponse } from '../src/InertiaResponse'

export default class InertiaProvider {
  constructor (protected $container: IocContract) {}

  public boot () {
    this.$container.with(['Adonis/Core/Response'], (Response: ResponseContract) => {
      Response.macro('inertia', function (componentPath: string, props: unknown[] = []) {
        const inertiaResponse = new InertiaResponse(componentPath, props, this.ctx!)

        return inertiaResponse.toResponse()
      })
    })
  }
}
