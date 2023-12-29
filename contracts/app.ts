declare module '@ioc:Adonis/Lucid/Orm' {
  interface ModelQueryBuilderContract<Model extends LucidModel, Result = InstanceType<Model>> {
    pluck<T = string>(column: string): Promise<T[]>
  }
}
