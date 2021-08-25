import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LcdService } from 'src/lcd/lcd.service'
import { SupplyService } from './supply.service'

describe('SupplyService', () => {
  let service: SupplyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplyService,
        {
          provide: getLoggerToken(SupplyService.name),
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

    service = module.get<SupplyService>(SupplyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
