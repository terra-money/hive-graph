import { Test, TestingModule } from '@nestjs/testing'
import { StakingResolver } from './staking.resolver'
import { StakingService } from './staking.service'

describe('StakingResolver', () => {
  let resolver: StakingResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StakingResolver, { provide: StakingService, useValue: {} }],
    }).compile()

    resolver = module.get<StakingResolver>(StakingResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
