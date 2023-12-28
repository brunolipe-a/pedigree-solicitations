import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
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
  public birth_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Dog)
  public mother: BelongsTo<typeof Dog>

  @belongsTo(() => Dog)
  public father: BelongsTo<typeof Dog>
}
