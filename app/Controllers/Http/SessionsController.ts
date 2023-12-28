import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '7d' })
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
