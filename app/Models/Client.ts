import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ModelQueryBuilderContract,
  belongsTo,
  column,
  hasMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Dog from './Dog'
import { RoleId } from './Role'
import Kennel from './Kennel'

type Builder = ModelQueryBuilderContract<typeof Client>

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public kennelId: number

  @column()
  public fullName: string

  @column()
  public cpf: string

  @column()
  public phone: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Kennel)
  public kennel: BelongsTo<typeof Kennel>

  @hasMany(() => Dog)
  public dogs: HasMany<typeof Dog>

  public static visibleTo = scope(async (query: Builder, user: User) => {
    switch (user.roleId) {
      case RoleId.KENNEL_EMPLOYEE:
      case RoleId.KENNEL_ADMIN:
        return query.whereHas('kennel', (q) => q.withScopes((s) => s.visibleTo(user)))
      case RoleId.SUPER_ADMIN:
        return
      default:
        throw new Error(`${user.roleId} can not see the list of clients`)
    }
  })
}
