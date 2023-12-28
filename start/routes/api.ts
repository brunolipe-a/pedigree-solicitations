import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', () => ({ message: 'OK' })).as('home')
})
  .as('v1')
  .prefix('v1')
  .middleware('auth')
