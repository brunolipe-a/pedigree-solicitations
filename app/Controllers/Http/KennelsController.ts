import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kennel from 'App/Models/Kennel'
import StoreKennelValidator from 'App/Validators/StoreKennelValidator'
import UpdateKennelValidator from 'App/Validators/UpdateKennelValidator'

export default class KennelsController {
  public async index({ bouncer, auth }: HttpContextContract) {
    await bouncer.with('KennelPolicy').authorize('viewList')

    const kennels = await Kennel.query().withScopes((s) => s.visibleTo(auth.user!))

    return kennels
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('KennelPolicy').authorize('create')

    const { name, registerCode } = await request.validate(StoreKennelValidator)

    const kennel = await Kennel.create({ name, registerCode })

    return response.created(kennel)
  }

  @bind()
  public async show({ bouncer }: HttpContextContract, kennel: Kennel) {
    await bouncer.with('KennelPolicy').authorize('view', kennel)

    return kennel
  }

  @bind()
  public async update({ request, bouncer }: HttpContextContract, kennel: Kennel) {
    await bouncer.with('KennelPolicy').authorize('update', kennel)

    const data = await request.validate(UpdateKennelValidator)

    const updatedKennel = await kennel.merge(data).save()

    return updatedKennel
  }

  @bind()
  public async destroy({ response, bouncer }: HttpContextContract, kennel: Kennel) {
    await bouncer.with('KennelPolicy').authorize('delete', kennel)

    await kennel.delete()

    return response.noContent()
  }
}
