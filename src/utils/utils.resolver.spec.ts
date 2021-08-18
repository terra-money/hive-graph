import { Test, TestingModule } from '@nestjs/testing'
import { UtilsResolver } from './utils.resolver'
import { UtilsService } from './utils.service'

describe('UtilsResolver', () => {
  let resolver: UtilsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsResolver, { provide: UtilsService, useValue: {} }],
    }).compile()

    resolver = module.get<UtilsResolver>(UtilsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
