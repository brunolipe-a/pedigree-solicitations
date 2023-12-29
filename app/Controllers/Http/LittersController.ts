import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Litter from 'App/Models/Litter'
import StoreLitterValidator from 'App/Validators/StoreLitterValidator'
import UpdateLitterValidator from 'App/Validators/UpdateLitterValidator'

export default class LittersController {
  public async index({}: HttpContextContract) {
    const litters = await Litter.all()

    return litters
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreLitterValidator)

    const litter = await Litter.create(data)

    return response.created(litter)
  }

  @bind()
  public async show({}: HttpContextContract, litter: Litter) {
    return litter
  }

  @bind()
  public async update({ request }: HttpContextContract, litter: Litter) {
    const data = await request.validate(UpdateLitterValidator)

    const updatedLitter = await litter.merge(data).save()

    return updatedLitter
  }

  @bind()
  public async destroy({ response }: HttpContextContract, litter: Litter) {
    await litter.delete()

    return response.noContent()
  }
}
