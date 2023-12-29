import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateLitterAndDogsService } from 'App/Services/CreateLitterAndDogsService'
import StoreLitterAndDogValidator from 'App/Validators/StoreLitterAndDogValidator'

@inject()
export default class CreateLitterAndDogsController {
  constructor(protected createLitterAndDogsService: CreateLitterAndDogsService) {}

  public async handle({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('LitterPolicy').authorize('create')

    const data = await request.validate(StoreLitterAndDogValidator)

    const result = await this.createLitterAndDogsService.handle(data)

    return response.created(result)
  }
}
