import { Test, TestingModule } from '@nestjs/testing'
import { DistributionResolver } from './distribution.resolver'
import { DistributionService } from './distribution.service'

describe('DistributionResolver', () => {
  let resolver: DistributionResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistributionResolver, { provide: DistributionService, useValue: {} }],
    }).compile()

    resolver = module.get<DistributionResolver>(DistributionResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
