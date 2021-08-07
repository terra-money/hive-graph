import { Test, TestingModule } from '@nestjs/testing'
import { MintResolver } from './mint.resolver'

describe('MintResolver', () => {
  let resolver: MintResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintResolver],
    }).compile()

    resolver = module.get<MintResolver>(MintResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
