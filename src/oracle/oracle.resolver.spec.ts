import { Test, TestingModule } from '@nestjs/testing'
import { OracleResolver } from './oracle.resolver'
import { OracleService } from './oracle.service'

describe('OracleResolver', () => {
  let resolver: OracleResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OracleResolver, { provide: OracleService, useValue: {} }],
    }).compile()

    resolver = module.get<OracleResolver>(OracleResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
