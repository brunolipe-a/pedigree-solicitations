import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export enum RoleLabel {
  SUPER_ADMIN = 'super_admin',
  CLIENT = 'client',
  KENNEL_ADMIN = 'kennel_admin',
  KENNEL_EMPLOYEE = 'kennel_employee',
}

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: RoleLabel

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
