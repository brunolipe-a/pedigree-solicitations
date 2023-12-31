import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ModelQueryBuilderContract,
  belongsTo,
  column,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Dog from './Dog'
import User from './User'
import { RoleId } from './Role'
import Kennel from './Kennel'

type Builder = ModelQueryBuilderContract<typeof Pedigree>

export default class Pedigree extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dogId: number

  @column()
  public kennelId: number

  @column()
  public dogRegisterCode: string

  @column()
  public imagePath: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Kennel)
  public kennel: BelongsTo<typeof Kennel>

  @belongsTo(() => Dog)
  public dog: BelongsTo<typeof Dog>

  public static visibleTo = scope(async (query: Builder, user: User) => {
    switch (user.roleId) {
      case RoleId.CLIENT:
        return query.whereHas('dog', (q) => q.withScopes((s) => s.visibleTo(user)))
      case RoleId.KENNEL_EMPLOYEE:
      case RoleId.KENNEL_ADMIN:
        return query.whereHas('kennel', (q) => q.withScopes((s) => s.visibleTo(user)))
      case RoleId.SUPER_ADMIN:
        return
      default:
        throw new Error(`${user.roleId} can not see the list of dogs`)
    }
  })
}
