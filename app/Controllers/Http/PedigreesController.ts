import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Pedigree from 'App/Models/Pedigree'
import StorePedigreeValidator from 'App/Validators/StorePedigreeValidator'
import UpdatePedigreeValidator from 'App/Validators/UpdatePedigreeValidator'

export default class PedigreesController {
  public async index({ bouncer, auth }: HttpContextContract) {
    await bouncer.with('PedigreePolicy').authorize('viewList')

    const pedigrees = await Pedigree.query().withScopes((s) => s.visibleTo(auth.user!))

    return pedigrees
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('PedigreePolicy').authorize('create')

    const data = await request.validate(StorePedigreeValidator)

    const pedigree = await Pedigree.create({ ...data, imagePath: '' })

    return response.created(pedigree)
  }

  @bind()
  public async show({ bouncer }: HttpContextContract, pedigree: Pedigree) {
    await bouncer.with('PedigreePolicy').authorize('view', pedigree)

    return pedigree
  }

  @bind()
  public async update({ request, bouncer }: HttpContextContract, pedigree: Pedigree) {
    await bouncer.with('PedigreePolicy').authorize('update', pedigree)

    const data = await request.validate(UpdatePedigreeValidator)

    const updatedPedigree = await pedigree.merge(data).save()

    return updatedPedigree
  }

  @bind()
  public async destroy({ response, bouncer }: HttpContextContract, pedigree: Pedigree) {
    await bouncer.with('PedigreePolicy').authorize('delete', pedigree)

    await pedigree.delete()

    return response.noContent()
  }
}
