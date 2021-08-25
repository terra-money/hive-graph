import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LcdService } from 'src/lcd/lcd.service'
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
          provide: LcdService,
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
