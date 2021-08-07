import { Test, TestingModule } from '@nestjs/testing'
import { StakingService } from './staking.service'

describe('StakingService', () => {
  let service: StakingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StakingService],
    }).compile()

    service = module.get<StakingService>(StakingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
