import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LCD_MODULE_TOKEN } from 'src/lcd/lcd.constant'
import { DistributionService } from './distribution.service'

describe('DistributionService', () => {
  let service: DistributionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistributionService,
        {
          provide: getLoggerToken(DistributionService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: LCD_MODULE_TOKEN,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<DistributionService>(DistributionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
