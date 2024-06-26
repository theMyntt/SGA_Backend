import { IUseCaseContract } from '@shared/contracts/usecase.contract'
import { SchoolInformationDTO } from '../dto/school.dto'
import { Inject } from '@nestjs/common'
import { SchoolService } from '../services/school.service'
import {
  generateIntegerToken,
  generateStringToken,
} from '@shared/utils/generate.util'

export class RegisterUseCase implements IUseCaseContract<SchoolInformationDTO> {
  public constructor(
    @Inject('S_SCHOOL_SERVICE')
    private readonly repo: SchoolService<SchoolInformationDTO>,
  ) {}

  public async run(dto: SchoolInformationDTO) {
    const requiredKeys = ['name', 'address']

    const errorMessage: Array<string> = []

    requiredKeys.forEach((key) => {
      if (!dto[key]) errorMessage.push(`${key} não pode ser nulo.`)
    })

    if (errorMessage[0])
      return JSON.stringify({
        message: errorMessage,
      })

    dto._id = generateIntegerToken().toString()
    dto.createdAt = new Date()
    dto.updatedAt = new Date()

    try {
      const result = await this.repo.create(dto)
      return JSON.stringify({
        message: result
          ? 'Escola cadastrado com sucesso.'
          : 'Não foi possível cadastrar a escola.',
      })
    } catch {
      return JSON.stringify({
        message: 'Erro interno.',
      })
    }
  }
}
