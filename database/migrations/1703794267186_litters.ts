import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'litters'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('mother_id').unsigned().references('dogs.id')
      table.integer('father_id').unsigned().references('dogs.id')
      table.text('description')
      table.timestamp('birth_at', { useTz: true }).notNullable()
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
  }
}
