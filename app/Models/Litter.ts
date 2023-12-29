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
import Dog from './Dog'
import User from './User'
import { RoleId } from './Role'
import Kennel from './Kennel'

type Builder = ModelQueryBuilderContract<typeof Litter>

export default class Litter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public motherId: number

  @column()
  public fatherId: number

  @column()
  public kennelId: number

  @column()
  public description: string | null

  @column.dateTime()
  public birthAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Dog, { foreignKey: 'mother_id' })
  public mother: BelongsTo<typeof Dog>

  @belongsTo(() => Dog, { foreignKey: 'father_id' })
  public father: BelongsTo<typeof Dog>

  @belongsTo(() => Kennel)
  public kennel: BelongsTo<typeof Kennel>

  @hasMany(() => Dog)
  public dogs: HasMany<typeof Dog>

  public static visibleTo = scope(async (_query: Builder, user: User) => {
    switch (user.roleId) {
      case RoleId.SUPER_ADMIN:
        return
      default:
        throw new Error(`${user.roleId} can not see the list of litters`)
    }
  })
}
