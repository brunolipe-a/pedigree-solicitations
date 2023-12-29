import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Litter from 'App/Models/Litter'
import { RoleId } from 'App/Models/Role'
import Dog from 'App/Models/Dog'

const kennelRoles = [RoleId.KENNEL_ADMIN, RoleId.KENNEL_EMPLOYEE]

export default class LitterPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.roleId === RoleId.SUPER_ADMIN) return true
  }

  public async viewList(_user: User) {
    return false
  }
  public async view(user: User, litter: Litter) {
    await litter.load('father')
    await litter.load('mother')

    if (user.roleId === RoleId.CLIENT) {
      await user.load('client')

      const clientIds = await Dog.query().where('litter_id', litter.id).pluck<number>('client_id')

      const includesClintId = clientIds.includes(user.client.id)

      return (
        litter.mother.clientId === user.client.id ||
        litter.father.clientId === user.client.id ||
        includesClintId
      )
    }

    await user.load('kennels')

    const kennelIds = await Dog.query().where('litter_id', litter.id).pluck<number>('kennel_id')

    const userKennelId = user.kennels[0].id

    const includesUserKennelId = kennelIds.includes(userKennelId)

    return (
      litter.mother.kennelId === userKennelId ||
      litter.father.kennelId === userKennelId ||
      includesUserKennelId
    )
  }
  public async create(user: User) {
    return kennelRoles.includes(user.roleId)
  }
  public async update(_user: User, _litter: Litter) {
    return false
  }
  public async delete(_user: User, _litter: Litter) {
    return false
  }
}
