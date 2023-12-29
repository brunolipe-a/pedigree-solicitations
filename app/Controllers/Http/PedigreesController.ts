import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Pedigree from 'App/Models/Pedigree'
import StorePedigreeValidator from 'App/Validators/StorePedigreeValidator'
import UpdatePedigreeValidator from 'App/Validators/UpdatePedigreeValidator'

export default class PedigreesController {
  public async index({}: HttpContextContract) {
    const pedigrees = await Pedigree.all()

    return pedigrees
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StorePedigreeValidator)

    const pedigree = await Pedigree.create({ ...data, imagePath: '' })

    return response.created(pedigree)
  }

  @bind()
  public async show({}: HttpContextContract, pedigree: Pedigree) {
    return pedigree
  }

  @bind()
  public async update({ request }: HttpContextContract, pedigree: Pedigree) {
    const data = await request.validate(UpdatePedigreeValidator)

    const updatedPedigree = await pedigree.merge(data).save()

    return updatedPedigree
  }

  @bind()
  public async destroy({ response }: HttpContextContract, pedigree: Pedigree) {
    await pedigree.delete()

    return response.noContent()
  }
}
