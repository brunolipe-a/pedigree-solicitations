import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { KennelStatus } from 'App/Models/Kennel'

export default class UpdateKennelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    kennelId: this.ctx.params.kennel,
  })

  public schema = schema.create({
    name: schema.string.optional([rules.maxLength(255)]),
    registerCode: schema.string.optional([
      rules.maxLength(255),
      rules.unique({
        column: 'register_code',
        table: 'kennels',
        whereNot: { id: this.refs.kennelId },
      }),
    ]),
    status: schema.enum.optional(Object.values(KennelStatus)),
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
