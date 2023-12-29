import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Sex } from 'App/Models/Dog'

export default class UpdateDogValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    dogId: this.ctx.params.dog,
    motherId: this.ctx.request.body().motherId,
    fatherId: this.ctx.request.body().fatherId,
  })

  public schema = schema.create({
    name: schema.string.optional([rules.maxLength(255)]),
    sex: schema.enum.optional(Object.values(Sex)),
    color: schema.string.optional([rules.maxLength(255)]),
    microchipNumber: schema.string.optional([rules.maxLength(255)]),
    birthAt: schema.date.optional(),
    clientId: schema.number.optional([rules.exists({ column: 'id', table: 'clients' })]),
    dogBreedId: schema.number.optional([rules.exists({ column: 'id', table: 'dog_breeds' })]),
    kennelId: schema.number.optional([rules.exists({ column: 'id', table: 'kennels' })]),
    motherId: schema.number.optional([
      rules.exists({ column: 'id', table: 'dogs', whereNot: { id: this.refs.dogId } }),
      rules.notIn([this.refs.fatherId.value]),
    ]),
    fatherId: schema.number.optional([
      rules.exists({ column: 'id', table: 'dogs', whereNot: { id: this.refs.dogId } }),
      rules.notIn([this.refs.motherId.value]),
    ]),
    litterId: schema.number.optional([rules.exists({ column: 'id', table: 'litters' })]),
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
