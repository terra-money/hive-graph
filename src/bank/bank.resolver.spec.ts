import { Test, TestingModule } from '@nestjs/testing'
import { parseSpecData } from '../../test/parse-spec'
import { AppModule } from '../app.module'
import { BankResolver } from './bank.resolver'
import { BankService } from './bank.service'

describe('BankResolver', () => {
  let resolver: BankResolver
  let data: SpecData

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [BankResolver, { provide: BankService, useValue: {} }],
    }).compile()

    resolver = module.get<BankResolver>(BankResolver)

    data = parseSpecData(__dirname + '/bank.resolver.spec.data.json')
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should resolve balance', async () => {
    const result = resolver.balance(data.balance.params)
    await expect(result).resolves.toEqual(data.balance.result)
  })

  it('should resolve total', async () => {
    const result = resolver.total(data.total.params)
    await expect(result).resolves.toEqual(data.total.result)
  })
})
