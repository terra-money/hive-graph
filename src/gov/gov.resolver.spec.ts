import { Test, TestingModule } from '@nestjs/testing'
import { GovResolver } from './gov.resolver'

describe('GovResolver', () => {
  let resolver: GovResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GovResolver],
    }).compile()

    resolver = module.get<GovResolver>(GovResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
