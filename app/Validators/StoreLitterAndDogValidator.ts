import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Sex } from 'App/Models/Dog'

export default class StoreLitterAndDogValidator {
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
    clientId: schema.number([rules.exists({ column: 'id', table: 'clients' })]),
    dogBreedId: schema.number([rules.exists({ column: 'id', table: 'dog_breeds' })]),
    kennelId: schema.number.optional([rules.exists({ column: 'id', table: 'kennels' })]),
    dogs: schema.array().members(
      schema.object().members({
        name: schema.string([rules.maxLength(255)]),
        sex: schema.enum(Object.values(Sex)),
        color: schema.string([rules.maxLength(255)]),
        microchipNumber: schema.string.optional([rules.maxLength(255)]),
      })
    ),
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
