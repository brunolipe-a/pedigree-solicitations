import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Dog from 'App/Models/Dog'
import StoreDogValidator from 'App/Validators/StoreDogValidator'
import UpdateDogValidator from 'App/Validators/UpdateDogValidator'

export default class DogsController {
  public async index({}: HttpContextContract) {
    const dogs = await Dog.all()

    return dogs
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreDogValidator)

    const dog = await Dog.create(data)

    return response.created(dog)
  }

  @bind()
  public async show({}: HttpContextContract, dog: Dog) {
    return dog
  }

  @bind()
  public async update({ request }: HttpContextContract, dog: Dog) {
    const data = await request.validate(UpdateDogValidator)

    const updatedDog = await dog.merge(data).save()

    return updatedDog
  }

  @bind()
  public async destroy({ response }: HttpContextContract, dog: Dog) {
    await dog.delete()

    return response.noContent()
  }
}
