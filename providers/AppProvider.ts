import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const { ModelQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')

    ModelQueryBuilder.macro('pluck', async function (column: string) {
      const result = await this.select(column)

      return result.map((item) => item[string.camelCase(column)])
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
