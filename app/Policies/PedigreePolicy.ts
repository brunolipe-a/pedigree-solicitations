import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Pedigree from 'App/Models/Pedigree'
import { RoleId } from 'App/Models/Role'

export default class PedigreePolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.roleId === RoleId.SUPER_ADMIN) return true
  }

  public async viewList(_user: User) {
    return true
  }

  public async view(user: User, pedigree: Pedigree) {
    if (user.roleId === RoleId.CLIENT) {
      await user.load('client')

      await pedigree.load('dog')

      return pedigree.dog.clientId === user.client.id
    }

    await user.load('kennels')

    return pedigree.kennelId === user.getKennelId()
  }

  public async create(_user: User) {
    return false
  }

  public async update(_user: User, _pedigree: Pedigree) {
    return false
  }

  public async delete(_user: User, _pedigree: Pedigree) {
    return false
  }
}
