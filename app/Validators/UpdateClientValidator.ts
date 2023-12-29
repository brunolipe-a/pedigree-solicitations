import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    clientId: this.ctx.params.client,
  })

  public schema = schema.create({
    fullName: schema.string.optional([rules.maxLength(255)]),
    cpf: schema.string.optional([
      rules.maxLength(255),
      rules.unique({
        column: 'cpf',
        table: 'clients',
        whereNot: { id: this.refs.clientId },
      }),
    ]),
    phone: schema.string.optional([rules.maxLength(255)]),
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
