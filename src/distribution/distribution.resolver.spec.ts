import { Test, TestingModule } from '@nestjs/testing'
import { DistributionResolver } from './distribution.resolver'

describe('DistributionResolver', () => {
  let resolver: DistributionResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributionResolver],
    }).compile()

    resolver = module.get<DistributionResolver>(DistributionResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
