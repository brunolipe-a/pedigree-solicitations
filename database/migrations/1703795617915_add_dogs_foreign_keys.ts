import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dogs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('mother_id').unsigned().references('dogs.id')
      table.integer('father_id').unsigned().references('dogs.id')
      table.integer('litter_id').unsigned().references('litters.id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('mother_id', 'father_id', 'litter_id')
    })
  }
}
