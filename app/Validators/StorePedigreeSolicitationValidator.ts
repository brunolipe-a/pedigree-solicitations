import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PedigreeSolicitationStatus } from 'App/Models/PedigreeSolicitation'

export default class StorePedigreeSolicitationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum(Object.values(PedigreeSolicitationStatus)),
    dogId: schema.number([rules.exists({ column: 'id', table: 'dogs' })]),
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
