import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kennel from 'App/Models/Kennel'
import StoreKennelValidator from 'App/Validators/StoreKennelValidator'
import UpdateKennelValidator from 'App/Validators/UpdateKennelValidator'

export default class KennelsController {
  public async index({}: HttpContextContract) {
    const kennels = await Kennel.all()

    return kennels
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, registerCode } = await request.validate(StoreKennelValidator)

    const kennel = await Kennel.create({ name, registerCode })

    return response.created(kennel)
  }

  @bind()
  public async show({}: HttpContextContract, kennel: Kennel) {
    return kennel
  }

  @bind()
  public async update({ request }: HttpContextContract, kennel: Kennel) {
    const data = await request.validate(UpdateKennelValidator)

    const updatedKennel = await kennel.merge(data).save()

    return updatedKennel
  }

  @bind()
  public async destroy({ response }: HttpContextContract, kennel: Kennel) {
    await kennel.delete()

    return response.noContent()
  }
}
