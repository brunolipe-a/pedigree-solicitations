import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Client from 'App/Models/Client'
import { RoleId } from 'App/Models/Role'

const kennelRoles = [RoleId.KENNEL_ADMIN, RoleId.KENNEL_EMPLOYEE]

export default class ClientPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.roleId === RoleId.SUPER_ADMIN) {
      return true
    }
  }

  public async viewList(user: User) {
    return kennelRoles.includes(user.roleId)
  }
  public async view(user: User, client: Client) {
    if (kennelRoles.includes(user.roleId)) return true

    return client.userId === user.id
  }
  public async create(user: User) {
    return kennelRoles.includes(user.roleId)
  }
  public async update(user: User, client: Client) {
    if (kennelRoles.includes(user.roleId)) return true

    return client.userId === user.id
  }
  public async delete(user: User, _client: Client) {
    return kennelRoles.includes(user.roleId)
  }
}
