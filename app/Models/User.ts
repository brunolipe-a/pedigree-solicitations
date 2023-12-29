import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Role, { RoleId } from './Role'
import Client from './Client'
import Kennel from './Kennel'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public roleId: RoleId

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @hasOne(() => Client)
  public client: HasOne<typeof Client>

  @manyToMany(() => Kennel)
  public kennels: ManyToMany<typeof Kennel>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public getKennelId() {
    return this.kennels[0].id
  }
}
