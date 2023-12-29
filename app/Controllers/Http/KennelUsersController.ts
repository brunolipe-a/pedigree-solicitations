import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kennel from 'App/Models/Kennel'
import StoreKennelUserValidator from 'App/Validators/StoreKennelUserValidator'

export default class KennelUsersController {
  @bind()
  public async store({ request, response }: HttpContextContract, kennel: Kennel) {
    const { email, name, password, roleId } = await request.validate(StoreKennelUserValidator)

    const user = await kennel.related('users').create({ email, name, password, roleId })

    return response.created(user)
  }
}
