import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PedigreeSolicitationStatus } from 'App/Models/PedigreeSolicitation'

export default class UpdatePedigreeSolicitationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status: schema.enum.optional(Object.values(PedigreeSolicitationStatus)),
    dogId: schema.number.optional([rules.exists({ column: 'id', table: 'dogs' })]),
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
