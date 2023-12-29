import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', () => ({ message: 'OK' })).as('home')
  Route.resource('kennels', 'KennelsController').apiOnly().paramFor('kennels', 'kennel')
  Route.resource('kennels.users', 'KennelUsersController')
    .only(['store'])
    .paramFor('kennels', 'kennel')

  Route.resource('clients', 'ClientsController').apiOnly().paramFor('clients', 'client')

  Route.resource('dogs', 'DogsController').apiOnly().paramFor('dogs', 'dog')

  Route.resource('litters', 'LittersController').apiOnly().paramFor('litters', 'litter')
  Route.post('litters/with-dogs', 'CreateLitterAndDogsController.handle').as('litters.with-dogs')

  Route.resource('pedigrees', 'PedigreesController').apiOnly().paramFor('pedigrees', 'pedigree')
})
  .as('v1')
  .prefix('v1')
  .middleware('auth')
