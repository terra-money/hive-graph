import { Test, TestingModule } from '@nestjs/testing'
import { UtilsResolver } from './utils.resolver'

describe('UtilsResolver', () => {
  let resolver: UtilsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsResolver],
    }).compile()

    resolver = module.get<UtilsResolver>(UtilsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
