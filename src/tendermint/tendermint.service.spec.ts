import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { LCD_MODULE_TOKEN } from 'src/lcd/lcd.constant'
import { TendermintService } from './tendermint.service'

describe('TendermintService', () => {
  let service: TendermintService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TendermintService,
        {
          provide: getLoggerToken(TendermintService.name),
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

    service = module.get<TendermintService>(TendermintService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
