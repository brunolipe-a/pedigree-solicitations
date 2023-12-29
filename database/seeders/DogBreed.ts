import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import DogBreed from 'App/Models/DogBreed'

export default class extends BaseSeeder {
  public async run() {
    await DogBreed.updateOrCreateMany('name', [{ name: 'Vira-Lata' }])
  }
}
