import { Test, TestingModule } from '@nestjs/testing'
import { TendermintService } from './tendermint.service'

describe('TendermintService', () => {
  let service: TendermintService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TendermintService],
    }).compile()

    service = module.get<TendermintService>(TendermintService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
