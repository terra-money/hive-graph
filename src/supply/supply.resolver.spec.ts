import { Test, TestingModule } from '@nestjs/testing'
import { SupplyResolver } from './supply.resolver'
import { SupplyService } from './supply.service'

describe('SupplyResolver', () => {
  let resolver: SupplyResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplyResolver, { provide: SupplyService, useValue: {} }],
    }).compile()

    resolver = module.get<SupplyResolver>(SupplyResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
