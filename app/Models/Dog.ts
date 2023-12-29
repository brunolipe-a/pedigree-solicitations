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
import DogBreed from './DogBreed'
import Client from './Client'
import Litter from './Litter'
import { RoleId } from './Role'
import User from './User'

type Builder = ModelQueryBuilderContract<typeof Dog>

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export default class Dog extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public color: string

  @column()
  public sex: Sex

  @column.dateTime()
  public birthAt: DateTime

  @column()
  public microchipNumber: string | null

  @column()
  public motherId: number | null

  @column()
  public fatherId: number | null

  @column()
  public litterId: number | null

  @column()
  public clientId: number

  @column()
  public kennelId: number | null

  @column()
  public dogBreedId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Kennel)
  public kennel: BelongsTo<typeof Kennel>

  @belongsTo(() => DogBreed)
  public dogBreed: BelongsTo<typeof DogBreed>

  @belongsTo(() => Dog, { foreignKey: 'mother_id' })
  public mother: BelongsTo<typeof Dog>

  @belongsTo(() => Dog, { foreignKey: 'father_id' })
  public father: BelongsTo<typeof Dog>

  @belongsTo(() => Litter)
  public litter: BelongsTo<typeof Litter>

  public static visibleTo = scope(async (query: Builder, user: User) => {
    switch (user.roleId) {
      case RoleId.CLIENT:
        return query.whereHas('client', (q) => q.where('user_id', user.id))
      case RoleId.KENNEL_EMPLOYEE:
      case RoleId.KENNEL_ADMIN:
        return query.whereHas('kennel', (q) => q.whereHas('users', (q) => q.where('id', user.id)))
      case RoleId.SUPER_ADMIN:
        return
      default:
        throw new Error(`${user.roleId} can not see the list of dogs`)
    }
  })
}
