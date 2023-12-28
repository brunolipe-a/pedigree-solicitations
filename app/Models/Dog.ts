import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Kennel from './Kennel'
import DogBreed from './DogBreed'
import Client from './Client'
import Litter from './Litter'

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
}
