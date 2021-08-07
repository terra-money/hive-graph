import { Test, TestingModule } from '@nestjs/testing'
import { MarketService } from './market.service'

describe('MarketService', () => {
  let service: MarketService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketService],
    }).compile()

    service = module.get<MarketService>(MarketService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
