import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Client from 'App/Models/Client'
import StoreClientValidator from 'App/Validators/StoreClientValidator'
import UpdateClientValidator from 'App/Validators/UpdateClientValidator'

export default class ClientsController {
  public async index({}: HttpContextContract) {
    const clients = await Client.all()

    return clients
  }

  public async store({ request, response }: HttpContextContract) {
    const { cpf, fullName, phone, userId } = await request.validate(StoreClientValidator)

    const client = await Client.create({ cpf, fullName, phone, userId })

    return response.created(client)
  }

  @bind()
  public async show({}: HttpContextContract, client: Client) {
    return client
  }

  @bind()
  public async update({ request }: HttpContextContract, client: Client) {
    const data = await request.validate(UpdateClientValidator)

    const updatedClient = await client.merge(data).save()

    return updatedClient
  }

  @bind()
  public async destroy({ response }: HttpContextContract, client: Client) {
    await client.delete()

    return response.noContent()
  }
}
