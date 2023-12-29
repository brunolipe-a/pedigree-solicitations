import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Dog from 'App/Models/Dog'
import { RoleId } from 'App/Models/Role'

const kennelRoles = [RoleId.KENNEL_ADMIN, RoleId.KENNEL_EMPLOYEE]

export default class DogPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.roleId === RoleId.SUPER_ADMIN) {
      return true
    }
  }

  public async viewList(_user: User) {
    return true
  }

  public async view(user: User, dog: Dog) {
    if (kennelRoles.includes(user.roleId)) {
      await user.load('kennels')

      return dog.kennelId === user.getKennelId()
    }

    await user.load('client')

    return dog.clientId === user.client.id
  }
  public async create(user: User) {
    return kennelRoles.includes(user.roleId)
  }
  public async update(user: User, dog: Dog) {
    if (kennelRoles.includes(user.roleId)) {
      await user.load('kennels')

      return dog.kennelId === user.getKennelId()
    }

    await user.load('client')

    return dog.clientId === user.client.id
  }
  public async delete(user: User, dog: Dog) {
    if (!kennelRoles.includes(user.roleId)) {
      return false
    }

    await user.load('kennels')

    return dog.kennelId === user.getKennelId()
  }
}
