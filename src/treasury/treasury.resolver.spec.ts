import { Test, TestingModule } from '@nestjs/testing'
import { TreasuryResolver } from './treasury.resolver'

describe('TreasuryResolver', () => {
  let resolver: TreasuryResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreasuryResolver],
    }).compile()

    resolver = module.get<TreasuryResolver>(TreasuryResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
