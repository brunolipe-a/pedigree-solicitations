import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreLitterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    motherId: this.ctx.request.body().motherId,
    fatherId: this.ctx.request.body().fatherId,
  })

  public schema = schema.create({
    description: schema.string.optional(),
    birthAt: schema.date(),
    motherId: schema.number([
      rules.exists({ column: 'id', table: 'dogs' }),
      rules.notIn([this.refs.fatherId.value]),
    ]),
    fatherId: schema.number([
      rules.exists({ column: 'id', table: 'dogs' }),
      rules.notIn([this.refs.motherId.value]),
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
