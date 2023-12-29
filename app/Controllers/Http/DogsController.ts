import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Dog from 'App/Models/Dog'
import StoreDogValidator from 'App/Validators/StoreDogValidator'
import UpdateDogValidator from 'App/Validators/UpdateDogValidator'

export default class DogsController {
  public async index({ bouncer, auth }: HttpContextContract) {
    await bouncer.with('DogPolicy').authorize('viewList')

    const dogs = await Dog.query().withScopes((s) => s.visibleTo(auth.user!))

    return dogs
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('DogPolicy').authorize('create')

    const data = await request.validate(StoreDogValidator)

    const dog = await Dog.create(data)

    return response.created(dog)
  }

  @bind()
  public async show({ bouncer }: HttpContextContract, dog: Dog) {
    await bouncer.with('DogPolicy').authorize('view', dog)

    return dog
  }

  @bind()
  public async update({ request, bouncer }: HttpContextContract, dog: Dog) {
    await bouncer.with('DogPolicy').authorize('update', dog)

    const data = await request.validate(UpdateDogValidator)

    const updatedDog = await dog.merge(data).save()

    return updatedDog
  }

  @bind()
  public async destroy({ response, bouncer }: HttpContextContract, dog: Dog) {
    await bouncer.with('DogPolicy').authorize('delete', dog)

    await dog.delete()

    return response.noContent()
  }
}
