import { Test, TestingModule } from '@nestjs/testing'
import { IbcResolver } from './ibc.resolver'
import { IbcService } from './ibc.service'

describe('IbcResolver', () => {
  let resolver: IbcResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IbcResolver, { provide: IbcService, useValue: {} }],
    }).compile()

    resolver = module.get<IbcResolver>(IbcResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
