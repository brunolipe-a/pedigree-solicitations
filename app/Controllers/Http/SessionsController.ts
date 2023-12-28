import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
  public async register({ request }: HttpContextContract) {
    const { name, email, password } = await request.validate(RegisterUserValidator)

    const user = await User.create({ name, email, password })

    return user
  }
}
