import { Test, TestingModule } from '@nestjs/testing'
import { TxResolver } from './tx.resolver'

describe('TxResolver', () => {
  let resolver: TxResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxResolver],
    }).compile()

    resolver = module.get<TxResolver>(TxResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
