import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Dog from './Dog'

export default class Litter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public motherId: number

  @column()
  public fatherId: number

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

  @hasMany(() => Dog)
  public dogs: HasMany<typeof Dog>
}
