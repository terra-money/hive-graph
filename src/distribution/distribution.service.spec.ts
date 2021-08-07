import { Test, TestingModule } from '@nestjs/testing'
import { DistributionService } from './distribution.service'

describe('DistributionService', () => {
  let service: DistributionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributionService],
    }).compile()

    service = module.get<DistributionService>(DistributionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
