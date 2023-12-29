import { Sex } from 'App/Models/Dog'
import Litter from 'App/Models/Litter'
import { DateTime } from 'luxon'

type CreateLitterAndDogsDTO = {
  birthAt: DateTime
  clientId: number
  description?: string
  dogBreedId: number
  dogs: {
    name: string
    sex: Sex
    color: string
    microchipNumber?: string
  }[]
  fatherId: number
  kennelId?: number
  motherId: number
}

export class CreateLitterAndDogsService {
  public async handle(dto: CreateLitterAndDogsDTO) {
    const { description, dogs: dogsData, ...rest } = dto

    const { birthAt, fatherId, motherId } = rest

    const litter = await Litter.create({ description, birthAt, fatherId, motherId })

    const dogsValues = dogsData.map((dog) => ({
      ...dog,
      ...rest,
    }))

    const dogs = await litter.related('dogs').createMany(dogsValues)

    return { litter, dogs }
  }
}
