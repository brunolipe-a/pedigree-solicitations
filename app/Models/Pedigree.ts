import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Dog from './Dog'

export default class Pedigree extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dogId: number

  @column()
  public dogRegisterCode: string

  @column()
  public imagePath: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Dog)
  public dog: BelongsTo<typeof Dog>
}
