import { Test, TestingModule } from '@nestjs/testing'
import { SlashingResolver } from './slashing.resolver'

describe('SlashingResolver', () => {
  let resolver: SlashingResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlashingResolver],
    }).compile()

    resolver = module.get<SlashingResolver>(SlashingResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
