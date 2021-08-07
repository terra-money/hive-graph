import { Test, TestingModule } from '@nestjs/testing'
import { OracleResolver } from './oracle.resolver'

describe('OracleResolver', () => {
  let resolver: OracleResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OracleResolver],
    }).compile()

    resolver = module.get<OracleResolver>(OracleResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
