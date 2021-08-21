import { Test, TestingModule } from '@nestjs/testing'
import { TxResolver } from './tx.resolver'
import { TxService } from './tx.service'

describe('TxResolver', () => {
  let resolver: TxResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxResolver, { provide: TxService, useValue: {} }],
    }).compile()

    resolver = module.get<TxResolver>(TxResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
