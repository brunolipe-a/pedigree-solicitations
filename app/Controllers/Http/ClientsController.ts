import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Client from 'App/Models/Client'
import StoreClientValidator from 'App/Validators/StoreClientValidator'
import UpdateClientValidator from 'App/Validators/UpdateClientValidator'

export default class ClientsController {
  public async index({ bouncer }: HttpContextContract) {
    await bouncer.with('ClientPolicy').authorize('viewList')

    const clients = await Client.all()

    return clients
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.with('ClientPolicy').authorize('create')

    const { cpf, fullName, phone, userId } = await request.validate(StoreClientValidator)

    const client = await Client.create({ cpf, fullName, phone, userId })

    return response.created(client)
  }

  @bind()
  public async show({ bouncer }: HttpContextContract, client: Client) {
    await bouncer.with('ClientPolicy').authorize('view', client)

    return client
  }

  @bind()
  public async update({ request, bouncer }: HttpContextContract, client: Client) {
    await bouncer.with('ClientPolicy').authorize('update', client)

    const data = await request.validate(UpdateClientValidator)

    const updatedClient = await client.merge(data).save()

    return updatedClient
  }

  @bind()
  public async destroy({ response, bouncer }: HttpContextContract, client: Client) {
    await bouncer.with('ClientPolicy').authorize('delete', client)

    await client.delete()

    return response.noContent()
  }
}
