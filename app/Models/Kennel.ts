import { DateTime } from 'luxon'
import {
  BaseModel,
  HasMany,
  ManyToMany,
  ModelQueryBuilderContract,
  column,
  hasMany,
  manyToMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Dog from './Dog'
import { RoleId } from './Role'

type Builder = ModelQueryBuilderContract<typeof Kennel>

export enum KennelStatus {
  'PENDING' = 'PENDING',
  'ACTIVE' = 'ACTIVE',
  'SUSPENDED' = 'SUSPENDED',
}

export default class Kennel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public registerCode: string

  @column()
  public status: KennelStatus

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @hasMany(() => Dog)
  public dogs: HasMany<typeof Dog>

  public static visibleTo = scope(async (query: Builder, user: User) => {
    switch (user.roleId) {
      case RoleId.KENNEL_EMPLOYEE:
      case RoleId.KENNEL_ADMIN:
        return query.whereHas('users', (q) => q.where('id', user.id))
      case RoleId.SUPER_ADMIN:
        return
      default:
        throw new Error(`${user.roleId} can not see the list of kennels`)
    }
  })
}
