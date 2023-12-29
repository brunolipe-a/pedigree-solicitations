import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ModelQueryBuilderContract,
  belongsTo,
  column,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Kennel from './Kennel'
import Dog from './Dog'
import User from './User'
import { RoleId } from './Role'

export enum PedigreeSolicitationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REPROVED = 'REPROVED',
}

type Builder = ModelQueryBuilderContract<typeof PedigreeSolicitation>

export default class PedigreeSolicitation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dogId: number

  @column()
  public kennelId: number

  @column()
  public status: PedigreeSolicitationStatus

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
      case RoleId.KENNEL_EMPLOYEE:
      case RoleId.KENNEL_ADMIN:
        return query.whereHas('kennel', (q) => q.withScopes((s) => s.visibleTo(user)))
      case RoleId.SUPER_ADMIN:
        return
      default:
        throw new Error(`${user.roleId} can not see the list of pedigree solicitations`)
    }
  })
}
