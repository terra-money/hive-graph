import { Test, TestingModule } from '@nestjs/testing'
import { BankResolver } from './bank.resolver'
import { BankService } from './bank.service'

describe('BankResolver', () => {
  let resolver: BankResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankResolver, { provide: BankService, useValue: {} }],
    }).compile()

    resolver = module.get<BankResolver>(BankResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
