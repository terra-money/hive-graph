import { Test, TestingModule } from '@nestjs/testing'
import { MintResolver } from './mint.resolver'
import { MintService } from './mint.service'

describe('MintResolver', () => {
  let resolver: MintResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintResolver, { provide: MintService, useValue: {} }],
    }).compile()

    resolver = module.get<MintResolver>(MintResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
