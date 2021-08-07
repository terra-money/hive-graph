import { Test, TestingModule } from '@nestjs/testing'
import { SlashingService } from './slashing.service'

describe('SlashingService', () => {
  let service: SlashingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlashingService],
    }).compile()

    service = module.get<SlashingService>(SlashingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
