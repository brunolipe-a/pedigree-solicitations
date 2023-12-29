import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Litter from 'App/Models/Litter'
import StoreLitterValidator from 'App/Validators/StoreLitterValidator'
import UpdateLitterValidator from 'App/Validators/UpdateLitterValidator'

export default class LittersController {
  public async index({ bouncer, auth }: HttpContextContract) {
    await bouncer.with('LitterPolicy').authorize('viewList')

    const litters = await Litter.query().withScopes((s) => s.visibleTo(auth.user!))

    return litters
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LitterPolicy').authorize('create')

    const data = await request.validate(StoreLitterValidator)

    const litter = await Litter.create(data)

    return response.created(litter)
  }

  @bind()
  public async show({ bouncer }: HttpContextContract, litter: Litter) {
    await bouncer.with('LitterPolicy').authorize('view', litter)

    return litter
  }

  @bind()
  public async update({ request, bouncer }: HttpContextContract, litter: Litter) {
    await bouncer.with('LitterPolicy').authorize('update', litter)

    const data = await request.validate(UpdateLitterValidator)

    const updatedLitter = await litter.merge(data).save()

    return updatedLitter
  }

  @bind()
  public async destroy({ response, bouncer }: HttpContextContract, litter: Litter) {
    await bouncer.with('LitterPolicy').authorize('delete', litter)

    await litter.delete()

    return response.noContent()
  }
}
