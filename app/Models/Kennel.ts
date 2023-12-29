import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Dog from './Dog'

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
}
