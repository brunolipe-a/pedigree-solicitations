import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { RoleId } from 'App/Models/Role'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class SessionsController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '7d' })

      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async register({ request, response }: HttpContextContract) {
    const { name, email, password, roleId, ...rest } = await request.validate(RegisterUserValidator)

    const user = await User.create({ name, email, password, roleId })

    let client: Client | undefined

    if (roleId === RoleId.CLIENT) {
      client = await user.related('client').create({ ...rest, fullName: name })
    }

    return response.created({ user, client })
  }

  public async me({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load('client')

    return user
  }
}
