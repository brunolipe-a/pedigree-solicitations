import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pedigree_solicitations'

  public async up() {
    this.schema.raw('DROP TYPE IF EXISTS "pedigree_solicitation_status"')

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('dog_id').notNullable().unsigned().references('dogs.id')
      table
        .enu('status', ['PENDING', 'APPROVED', 'REPROVED'], {
          useNative: true,
          enumName: 'pedigree_solicitation_status',
          existingType: false,
        })
        .defaultTo('PENDING')
      table.integer('kennel_id').unsigned().references('kennels.id').onDelete('SET NULL')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "pedigree_solicitation_status"')
  }
}
