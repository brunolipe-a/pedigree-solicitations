import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role, { RoleLabel } from 'App/Models/Role'

export default class extends BaseSeeder {
  public async run() {
    await Role.updateOrCreateMany('id', [
      { id: RoleLabel.SUPER_ADMIN, description: 'Super Admin' },
      { id: RoleLabel.CLIENT, description: 'Cliente' },
      { id: RoleLabel.KENNEL_ADMIN, description: 'Admin Canil' },
      { id: RoleLabel.KENNEL_EMPLOYEE, description: 'Funcionário Canil' },
    ])
  }
}
