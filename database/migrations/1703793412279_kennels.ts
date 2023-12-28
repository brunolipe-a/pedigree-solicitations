import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'kennels'

  public async up() {
    this.schema.raw('DROP TYPE IF EXISTS "kennel_status"')

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('register_code').notNullable()
      table
        .enu('status', ['PENDING', 'ACTIVE', 'SUSPENDED'], {
          useNative: true,
          enumName: 'kennel_status',
          existingType: false,
        })
        .defaultTo('PENDING')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "kennel_status"')
  }
}
