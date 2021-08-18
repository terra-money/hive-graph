import { Test, TestingModule } from '@nestjs/testing'
import { TendermintResolver } from './tendermint.resolver'
import { TendermintService } from './tendermint.service'

describe('TendermintResolver', () => {
  let resolver: TendermintResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TendermintResolver, { provide: TendermintService, useValue: {} }],
    }).compile()

    resolver = module.get<TendermintResolver>(TendermintResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
