import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import PedigreeSolicitation, { PedigreeSolicitationStatus } from 'App/Models/PedigreeSolicitation'
import { RoleId } from 'App/Models/Role'

const kennelRoles = [RoleId.KENNEL_ADMIN, RoleId.KENNEL_EMPLOYEE]

export default class PedigreeSolicitationPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.roleId === RoleId.SUPER_ADMIN) return true
  }

  public async viewList(user: User) {
    return kennelRoles.includes(user.roleId)
  }

  public async view(user: User, pedigreeSolicitation: PedigreeSolicitation) {
    if (!kennelRoles.includes(user.roleId)) {
      return false
    }

    await user.load('kennels')

    return user.getKennelId() === pedigreeSolicitation.kennelId
  }

  public async create(user: User) {
    return kennelRoles.includes(user.roleId)
  }

  public async update(_user: User, _pedigreeSolicitation: PedigreeSolicitation) {
    return false
  }

  public async delete(user: User, pedigreeSolicitation: PedigreeSolicitation) {
    if (pedigreeSolicitation.status !== PedigreeSolicitationStatus.PENDING) {
      return false
    }

    return kennelRoles.includes(user.roleId)
  }
}
