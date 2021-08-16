import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { MarketService } from './market.service'

describe('MarketService', () => {
  let service: MarketService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketService,
        {
          provide: getLoggerToken(MarketService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getTerraToken(),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<MarketService>(MarketService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
