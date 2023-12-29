import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullName: schema.string([rules.maxLength(255)]),
    cpf: schema.string([rules.maxLength(255), rules.unique({ column: 'cpf', table: 'clients' })]),
    phone: schema.string([rules.maxLength(255)]),
    userId: schema.number([
      rules.exists({ column: 'id', table: 'users' }),
      rules.unique({ column: 'user_id', table: 'clients' }),
    ]),
    kennelId: schema.number.optional([rules.exists({ column: 'id', table: 'kennels' })]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
