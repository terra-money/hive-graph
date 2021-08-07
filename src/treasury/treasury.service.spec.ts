import { Test, TestingModule } from '@nestjs/testing'
import { TreasuryService } from './treasury.service'

describe('TreasuryService', () => {
  let service: TreasuryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreasuryService],
    }).compile()

    service = module.get<TreasuryService>(TreasuryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
