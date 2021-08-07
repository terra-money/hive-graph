import { Test, TestingModule } from '@nestjs/testing'
import { TendermintResolver } from './tendermint.resolver'

describe('TendermintResolver', () => {
  let resolver: TendermintResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TendermintResolver],
    }).compile()

    resolver = module.get<TendermintResolver>(TendermintResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
