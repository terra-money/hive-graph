import { Test, TestingModule } from '@nestjs/testing'
import { BankResolver } from './bank.resolver'

describe('BankResolver', () => {
  let resolver: BankResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankResolver],
    }).compile()

    resolver = module.get<BankResolver>(BankResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
