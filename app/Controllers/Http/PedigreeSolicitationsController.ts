import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import PedigreeSolicitation from 'App/Models/PedigreeSolicitation'
import StorePedigreeSolicitationValidator from 'App/Validators/StorePedigreeSolicitationValidator'
import UpdatePedigreeSolicitationValidator from 'App/Validators/UpdatePedigreeSolicitationValidator'

export default class PedigreeSolicitationsController {
  public async index({ bouncer, auth }: HttpContextContract) {
    await bouncer.with('PedigreeSolicitationPolicy').authorize('viewList')

    const pedigreeSolicitations = await PedigreeSolicitation.query().withScopes((s) =>
      s.visibleTo(auth.user!)
    )

    return pedigreeSolicitations
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('PedigreeSolicitationPolicy').authorize('create')

    const data = await request.validate(StorePedigreeSolicitationValidator)

    const pedigreeSolicitation = await PedigreeSolicitation.create(data)

    return response.created(pedigreeSolicitation)
  }

  @bind()
  public async show({ bouncer }: HttpContextContract, pedigreeSolicitation: PedigreeSolicitation) {
    await bouncer.with('PedigreeSolicitationPolicy').authorize('view', pedigreeSolicitation)

    return pedigreeSolicitation
  }

  @bind()
  public async update(
    { request, bouncer }: HttpContextContract,
    pedigreeSolicitation: PedigreeSolicitation
  ) {
    await bouncer.with('PedigreeSolicitationPolicy').authorize('update', pedigreeSolicitation)

    const data = await request.validate(UpdatePedigreeSolicitationValidator)

    const updatedPedigreeSolicitation = await pedigreeSolicitation.merge(data).save()

    return updatedPedigreeSolicitation
  }

  @bind()
  public async destroy(
    { response, bouncer }: HttpContextContract,
    pedigreeSolicitation: PedigreeSolicitation
  ) {
    await bouncer.with('PedigreeSolicitationPolicy').authorize('delete', pedigreeSolicitation)

    await pedigreeSolicitation.delete()

    return response.noContent()
  }
}
