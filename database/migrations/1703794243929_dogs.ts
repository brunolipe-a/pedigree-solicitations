import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dogs'

  public async up() {
    this.schema.raw('DROP TYPE IF EXISTS "sex"')

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('color').notNullable()
      table
        .enu('sex', ['MALE', 'FEMALE'], {
          useNative: true,
          enumName: 'sex',
          existingType: false,
        })
        .notNullable()
      table.timestamp('birth_at', { useTz: true }).notNullable()

      table.string('microchip_number')

      table.integer('kennel_id').unsigned().references('kennels.id').onDelete('SET NULL')
      table.integer('dog_breed_id').notNullable().unsigned().references('dog_breeds.id')
      table
        .integer('client_id')
        .notNullable()
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "sex"')
  }
}
