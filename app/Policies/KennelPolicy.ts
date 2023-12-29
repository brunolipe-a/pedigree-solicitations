import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Kennel from 'App/Models/Kennel'
import { RoleId } from 'App/Models/Role'

const kennelRoles = [RoleId.KENNEL_ADMIN, RoleId.KENNEL_EMPLOYEE]

export default class KennelPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.roleId === RoleId.SUPER_ADMIN) return true
  }

  public async viewList(_user: User) {
    return false
  }
  public async view(user: User, kennel: Kennel) {
    if (!kennelRoles.includes(user.roleId)) return false

    await user.load('kennels')

    return user.getKennelId() === kennel.id
  }
  public async create(_user: User) {
    return false
  }
  public async update(user: User, kennel: Kennel) {
    if (!kennelRoles.includes(user.roleId)) return false

    await user.load('kennels')

    return user.getKennelId() === kennel.id
  }
  public async delete(_user: User, _kennel: Kennel) {
    return false
  }

  public async createUsers(user: User, kennel: Kennel) {
    await user.load('kennels')

    return user.roleId === RoleId.KENNEL_ADMIN && user.getKennelId() === kennel.id
  }
}
