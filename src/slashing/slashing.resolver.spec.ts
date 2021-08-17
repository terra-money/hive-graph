import { Test, TestingModule } from '@nestjs/testing'
import { SlashingResolver } from './slashing.resolver'
import { SlashingService } from './slashing.service'

describe('SlashingResolver', () => {
  let resolver: SlashingResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlashingResolver, { provide: SlashingService, useValue: {} }],
    }).compile()

    resolver = module.get<SlashingResolver>(SlashingResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
